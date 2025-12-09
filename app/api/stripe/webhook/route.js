import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  const body = await req.text()
  const signature = headers().get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata.userId

        // Update user's subscription
        await prisma.subscription.update({
          where: { userId },
          data: {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            status: 'trialing',
          }
        })
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object

        const user = await prisma.user.findFirst({
          where: {
            subscription: {
              stripeCustomerId: subscription.customer
            }
          }
        })

        if (user) {
          await prisma.subscription.update({
            where: { userId: user.id },
            data: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
              status: subscription.status,
            }
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        const user = await prisma.user.findFirst({
          where: {
            subscription: {
              stripeSubscriptionId: subscription.id
            }
          }
        })

        if (user) {
          await prisma.subscription.update({
            where: { userId: user.id },
            data: {
              status: 'canceled',
            }
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription)

        const user = await prisma.user.findFirst({
          where: {
            subscription: {
              stripeSubscriptionId: invoice.subscription
            }
          }
        })

        if (user) {
          await prisma.subscription.update({
            where: { userId: user.id },
            data: {
              status: subscription.status,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            }
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object

        const user = await prisma.user.findFirst({
          where: {
            subscription: {
              stripeSubscriptionId: invoice.subscription
            }
          }
        })

        if (user) {
          await prisma.subscription.update({
            where: { userId: user.id },
            data: {
              status: 'past_due',
            }
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
