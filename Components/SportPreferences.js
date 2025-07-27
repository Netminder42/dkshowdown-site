// components/SportPreferences.js

export default function SportPreferences() {
  return (
    <section className="sport-preferences">
      <h2>Your Sports Preferences</h2>
      <p>Select your favorite formats and leagues:</p>
      <form>
        <label>
          Default Platform:
          <select>
            <option>DraftKings</option>
            <option>FanDuel</option>
          </select>
        </label>
        <br />
        <label>
          Formats:
          <select multiple>
            <option>Classic</option>
            <option>Showdown</option>
            <option>Tiers</option>
          </select>
        </label>
        <br />
        <label>
          Favorite Leagues:
          <select multiple>
            <option>NBA</option>
            <option>MLB</option>
            <option>NFL</option>
            <option>NHL</option>
            <option>Premier League</option>
          </select>
        </label>
      </form>
    </section>
  );
}
