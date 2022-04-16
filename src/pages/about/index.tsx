import React, { FC } from "react";
import wave from "../../assets/pictures/wave-pink.png";
import TakeMeTo from "../../components/takeme/takeme";
import Countdown from "../../components/countdown";
import "./about.scss";

interface AboutProps {
  pointsTo?: string;
}

const About: FC<AboutProps> = ({ pointsTo }) => {
  return (
    <section className="about-container">
      <img src="/highresbounce.gif" className="about-visual" />
      <div className="about-mint-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TakeMeTo title={"Connect Wallet"} to={`/mint-now`} />
          
        </div>
        <Countdown />
      </div>
      <img className="about-transition" src={wave} />
    </section>
  );
};

export default About;
