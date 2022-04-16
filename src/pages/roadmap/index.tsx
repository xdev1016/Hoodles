import React, { useEffect, useState } from "react";
import RoadmapList from "./roadmap";
import "./roadmap.scss";
import { AnimatePresence, motion } from "framer-motion";
import otherSample from "../../assets/pictures/chb.png";
import sample from "../../assets/pictures/bpkoala.png";
import wave from "../../assets/pictures/wave-pink.png";
import BulletPoint from "../../components/bullet";
import send from "../../assets/icons/send.svg";
import check from "../../assets/icons/check.svg";
const Roadmap = () => {
  const [launched, setLaunched] = useState<boolean>(false);
  const [msgBox, setMsgBox] = useState<JSX.Element>(
    <span
      style={{
        display: " flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      HOODLES DAO - EXPLAINED <br />
      ...
      <br />
      Hit send to find out more 👉
    </span>
  );
  const phase2 = {
    title: "HOODLES DAO EXPLAINED:",
    description: [
      "A DAO (Decentralized Autonomous Organization) is an organization run by a group of people (AKA you, the Hoodles Community), with no typical hierarchy which makes decisions based on the smart contracts on the ERC-271 blockchain. The purpose of the DAO is to reward the holders and it is a testament to our commitment in maintaining the Hoodles brand through proper investments. ",
      "The Hoodles DAO will be managed by the community and funded with 15 ETH and 40% royalties from secondary sales. ",
      "Investment decisions made through the DAO will be voted on by Hoodle owners. In fact, 1 Hoodle will count towards 1 vote in the DAO. The more Hoodles owned by the holder, the more voting power the holder has when investment decisions are made with the funds from the DAO. Investment decisions include, but are not limited to: purchasing blue chip NFT projects with the option of fractionalizing them to Hoodle owners, holding land in Decentraland, and more.",
      "Additionally, the DAO will be used to develop Play To Earn (PTE) mini games exclusively for Hoodle owners.",
    ],
  };
  const launchPhase = () => {
    setLaunched(true);
    setMsgBox(
      <span
        style={{
          color: "lightgray",
          display: " flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        Message #ROADMAP...
      </span>
    );
  };
  const timeFinder = () => {
    let d = new Date();
    let hours = d.getHours();
    let correctHours = ((hours + 11) % 12) + 1;
    let minutes = d.getMinutes();
    let time = `${correctHours}:${minutes < 10 ? "0" + minutes : minutes} ${
      hours > 12 ? "PM" : "AM"
    }`;
    // console.log(correctHours, minutes);
    return time;
  };
  return (
    <section className="roadmap-container" id="roadmap">
      <img src={wave} className="pink-wave-transition" />
      <div className="roadmap-list-container">
        <header className="roadmap-header">ROADMAP</header>
        {RoadmapList.map((item, index) => {
          return (
            <AnimatePresence key={index}>
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  type: "ease",
                  staggerChildren: 0.5,
                }}
                className="roadmap-item"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: index % 2 > 0 ? 200 : -200,
                    scaleX: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    type: "ease",
                    staggerChildren: 0.5,
                  }}
                  className="roadmap-info"
                >
                  <div className="roadmap-pointer"></div>
                  <div className="domino-text">
                    <span className="roadmap-item-title">{item.title}</span>
                    {item.description.map((line, index) => (
                      <p key={index} className="roadmap-item-desc">
                        <BulletPoint />
                        <span> {line}</span>
                      </p>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, type: "ease" }}
                  className="roadmap-avatar"
                >
                  <img
                    style={{ transform: index % 2 > 0 ? "scaleX(-1)" : "" }}
                    src={index % 2 > 0 ? sample : otherSample}
                    className="roadmap-visual"
                  />
                  <span>
                    {index % 2 ? "Bulletproof Koala" : "Certified Hoodle Boy"}
                  </span>
                  <span> {`Today at 2:3${1 + index} am`}</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          );
        })}
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
            }}
            variants={{
              visible: {
                display: "flex",
                opacity: 1,
              },
              hidden: {
                display: "none",
                opacity: 0,
              },
            }}
            whileInView={{ opacity: 1 }}
            animate={launched ? "visible" : "hidden"}
            transition={{
              duration: 0.5,
              type: "ease",
              staggerChildren: 0.5,
            }}
            className="roadmap-item"
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -200,
                scaleX: 0,
              }}
              whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
              transition={{
                duration: 0.5,
                type: "ease",
                staggerChildren: 0.5,
              }}
              className="roadmap-info"
            >
              <div className="roadmap-pointer"></div>
              <div className="domino-text">
                <span className="roadmap-item-title">{phase2.title}</span>
                {phase2.description.map((line, index) => (
                  <p key={index} className="roadmap-item-desc">
                    <BulletPoint />
                    <span> {line}</span>
                  </p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, type: "ease" }}
              className="roadmap-avatar"
            >
              <img src={otherSample} className="roadmap-visual" />
              <span>
                <em>{"Certified Hoodle Boy"}</em>
              </span>
              <span> {`Today at ${timeFinder()}`}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {launched ? (
          <span className="roadmap-seen">
            Seen at {timeFinder()} <img src={check} className="seen-check" />
          </span>
        ) : null}

        <div className="roadmap-phase2">
          <img className="phase2-caret" />
          <div className="roadmap-phase2-text">{msgBox}</div>
          <img
            onClick={() => launchPhase()}
            src={send}
            className="phase2-send"
          />
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
