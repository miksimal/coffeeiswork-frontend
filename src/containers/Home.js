import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>CoffeeIsWork</h1>
        <p></p>
        <p>Help remote new-joiners feel welcome through coffee ☕️</p>
        <h3>It's difficult to make remote new-joiners feel warmly welcomed and prevent silos</h3>
        <p>Onboarding new-joiners remotely (whether by choice or by necessity) requires you to think carefully
          about creating a warm and welcoming experience and ensuring the new-joiner meets colleagues from across the company.
        </p>
        <p>It can be daunting for a new-joiner to reach out to busy, anonymous colleagues from other teams. And those colleagues from other teams are busy and may not think to reach out to the new-joiner unless prompted.
        </p>
        <h3>Every new-joiner should drink virtual coffee with colleagues from across the company</h3>
        <p>CoffeeIsWork makes it easy to ensure that every single new-joiner has a warm and welcoming experience. They'll receive friendly emails from colleagues across the company and enjoy lots of virtual coffee for their first weeks.
        </p>
        <h3>How it works: add the new-joiner's email and relax 🎉</h3>
        <p>Add the new-joiner and their email and CoffeeIsWork will suggest a colleague
          from each team that should reach out to the new-joiner for a virtual coffee.
          Edit or accept the <i>chosen ones</i> and CoffeeIsWork will email them and prompt them to reach out.
        </p>
      </div>
    </div>
  );
}