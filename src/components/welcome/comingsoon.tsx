import React from "react";
import "./welcome.scss";
import { AnimatePresence, motion } from "framer-motion";
import Discord from "../../assets/icons/discord.svg";
import Twitter from "../../assets/icons/twitter.svg";
import Instagram from "../../assets/icons/instagram.svg";
import Sea from "../../assets/icons/opensea.svg";
import Tiktok from "../../assets/icons/tiktok-round.svg";
import "../navbar/navbar.scss";
const ComingSoon = () => {
  return (
    <section
      key="about"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      className="super-welcome-container"
    >
      <section
        style={{ height: "100%", flexDirection: "column" }}
        className="welcome-container"
      >
        {/* <img className="welcome-sample" src={sample} /> */}
        <AnimatePresence>
          <header className="welcome-header" style={{ color: "white" }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.5, type: "ease" }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              WHERE THE HOOD,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 1.2, type: "ease" }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              WHERE THE HOOD,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 1.9, type: "ease" }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              WHERE THE
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 2.3, type: "ease" }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="emphasis"
              style={{ margin: "0em 1em" }}
            >
              HOODLES
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 2.3, type: "ease" }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              {" "}
              AT?
            </motion.span>
          </header>
        </AnimatePresence>
        <AnimatePresence>
          <motion.header
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,

              transition: {
                staggerChildren: 0.5,
                delay: 0.2,
                duration: 1,
              },
            }}
            style={{ marginTop: "1em" }}
            className="coming-soon"
          >
            Coming to a hood near you.
          </motion.header>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -150 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                staggerChildren: 0.5,
                delay: 0.2,
              },
            }}
            transition={{ duration: 0.5, type: "ease" }}
            className="navbar-socials"
          >
            <motion.a
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: "ease",
                staggerChildren: 0.5,
                delay: 0.1,
              }}
              target="_blank"
              href="https://discord.gg/hoodles"
            >
              <img className="icon" src={Discord} />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: "ease",
                staggerChildren: 0.5,
                delay: 0.2,
              }}
              target="_blank"
              href="https://opensea.io/collection/hoodles-official/"
            >
              <img className="icon" src={Sea} />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: "ease",
                staggerChildren: 0.5,
                delay: 0.3,
              }}
              target="_blank"
              href="https://www.tiktok.com/@thehoodlesnft/"
            >
              <img className="icon" src={Tiktok} />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: "ease",
                staggerChildren: 0.5,
                delay: 0.4,
              }}
              target="_blank"
              href="https://www.instagram.com/thehoodlesnft/"
            >
              <img className="icon" src={Instagram} />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: "ease",
                staggerChildren: 0.5,
                delay: 0.5,
              }}
              target="_blank"
              href="https://twitter.com/thehoodlesNFT"
            >
              <img className="icon" src={Twitter} />
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </section>
    </section>
  );
};

export default ComingSoon;
