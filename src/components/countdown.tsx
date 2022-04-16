import React, { useState, useEffect } from "react";

import "./common.scss";
interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const Countdown = () => {
  const calculateTimeLeft = () => {
    let start = new Date("March 6, 2022, 18:00:00 UTC").getTime();
    let now = new Date().getTime();
    const difference = start - now;
    // console.log(difference, "....", start, now);
    let timeLeft: Timer = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState<Timer>(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents: JSX.Element[] = [];
  timerComponents.push(
    <div className="countdown-number-container">
      <span className="countdown-number">
        {`${timeLeft.days < 10 ? "0" : ""}${timeLeft.days}`}:
      </span>
      <span className="countdown-unit">DAYS</span>
    </div>
  );
  timerComponents.push(
    <div className="countdown-number-container">
      <span className="countdown-number">
        {`${timeLeft.hours < 10 ? "0" : ""}${timeLeft.hours}`}:
      </span>
      <span className="countdown-unit">HRS</span>
    </div>
  );
  timerComponents.push(
    <div className="countdown-number-container">
      <span className="countdown-number">
        {`${timeLeft.minutes < 10 ? "0" : ""}${timeLeft.minutes}`}:
      </span>
      <span className="countdown-unit">MINS</span>
    </div>
  );
  timerComponents.push(
    <div className="countdown-number-container">
      <span className="countdown-number">{`${timeLeft.seconds < 10 ? "0" : ""}${
        timeLeft.seconds
      }`}</span>{" "}
      <span className="countdown-unit"> SECS</span>
    </div>
  );

  return (
    <div className="countdown-container">
      <span className="countdown-title">Ready for the Metastreets?</span>
      {/* <span>To be announced!</span> */}
      {/* <span className="countdown-title">Mint Yours.</span> */}
      <div
        style={{
          display: "flex",
          maxWidth: "95%",
          justifyContent: "center",
          maxHeight: "95%",
        }}
      >
       
      </div>
    </div>
  );
};

export default Countdown;
