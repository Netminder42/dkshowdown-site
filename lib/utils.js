import clsx from 'clsx'

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date) {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((then - now) / 1000)

  if (diffInSeconds < 0) return 'Expired'
  if (diffInSeconds < 60) return `${diffInSeconds}s`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
  return `${Math.floor(diffInSeconds / 86400)}d`
}

export function getTrialDaysLeft(trialEndsAt) {
  if (!trialEndsAt) return 0
  const now = new Date()
  const endsAt = new Date(trialEndsAt)
  const diffInDays = Math.ceil((endsAt - now) / (1000 * 60 * 60 * 24))
  return Math.max(0, diffInDays)
}
