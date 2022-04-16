import React, { useEffect, useState, FC } from "react";
import "./welcome.scss";
import { AnimatePresence } from "framer-motion";
import BulletPoint from "../bullet";
import Discord from "../../assets/icons/discord.svg";
// import character from "../../assets/pictures/character.mp4";
import caret from "../../assets/icons/caret.svg";
import MINT_NOW from "../../pages/mintnow/index"


interface WelcomeProps {
  disc: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const mintNow = async () => {
  alert("MintNow")
}

const Welcome: FC<WelcomeProps> = ({ open, setOpen, disc }) => {
  return (
    <AnimatePresence>
      <section
        key="about"
        style={{ padding: "2em 0em" }}
        className="super-welcome-container"
      >
        <header className="where-the-hood">
          <span>WHERE THE HOOD, &nbsp;</span>
          <span>WHERE THE HOOD, &nbsp;</span>
          <span>WHERE THE &nbsp;</span>
          <span style={{ display: "flex", alignItems: "center" }}>
            <span className="pink">HOODLES</span>&nbsp;
          </span>
          <span>AT?</span>
        </header>
        <section className="welcome-container">
          <header className="welcome-header">
            <img
              // autoPlay
              // muted
              // loop
              src="/cooldude.png"
              style={{ width: "300px" }}
            />
            <span className="welcome-join">Metastreet Certified.</span>
            
              <button 
                className="discord-btn"
                onClick={mintNow}>
                &nbsp; Mint Now{" "}
              </button>
              
            
          </header>
          <div className="welcome-content" onClick={() => setOpen(true)}>
            <p className="welcome-description">
              <span style={{ display: "flex" }}>
                <BulletPoint />
                3,333 collectible Hoodles randomly generated on the ETH Blockchain are ready to take over the Metastreets.
              </span>
              <br />
              <span style={{ display: "flex" }}>
                <BulletPoint />
                150+ hand-drawn traits, the combinations are endless. Each Hoodle is completely unique and cannot be duplicated.
              </span>
              <br />

              <span style={{ display: "flex" }}>
                <BulletPoint />
                Ready to become a certified Hoodle and take over the Metastreets? Mint a Hoodle and become part of the movement today!
              </span>
              <div
                style={{
                  display: "flex",
                  marginTop: "1em",
                  flexGrow: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                
              </div>
            </p>
          </div>
        </section>
      </section>
    </AnimatePresence>
  );
};

export default Welcome;
