import React, { useState, useEffect, FC } from "react";
import { useLocation } from "react-router";
import NavBtn from "./navbtn";
// import ConnectButton from "../connect/button";
import { Link } from "react-router-dom";
import { Link as Scroller, scroller } from "react-scroll";
import { AnimatePresence, motion } from "framer-motion";
import Discord from "../../assets/icons/discord.svg";
import Twitter from "../../assets/icons/twitter.svg";
import Instagram from "../../assets/icons/instagram.svg";
import Sea from "../../assets/icons/opensea.svg";
import Tiktok from "../../assets/icons/tiktok-round.svg";

import "./navbar.scss";

const navOptions = [
  {
    title: "About",
    to: "about",
  },
  {
    title: "Roadmap",
    to: "roadmap",
  },
  {
    title: "Team",
    to: "team",
  },
  {
    title: "FAQ",
    to: "faq",
  },
];

const variants = {
  locked: {
    transform: "rotate(0deg)",
  },
  unlocked: {
    transform: "rotate(90deg)",
  },
};
const drawerVariants = {
  locked: {
    opacity: 0,
    y: -20,
    staggerChildren: 0.1,
    staggerDirection: -1,
    transitionEnd: {
      display: "none",
    },
  },
  unlocked: {
    opacity: 1,
    y: 0,
    display: "flex",

    staggerChildren: 0.1,
    staggerDirection: 1,
  },
};
const hbarVariants = {
  rest1: {
    rotate: "0deg",
    x: 0,
    y: 0,
    scaleX: 1,
  },
  open1: {
    rotate: "90deg",
    x: -10,
    y: 10,
    scaleX: 2,
  },
  rest2: {
    scaleY: 1,
    scaleX: 1,
    rotate: "0deg",
  },
  open2: {
    rotate: "-180deg",
    scaleY: 2,
    scaleX: 0.8,
  },
  rest3: {
    rotate: "0deg",
    x: 0,
    y: 0,
    scaleX: 1,
  },
  open3: {
    rotate: "90deg",
    x: 10,
    y: -10,
    scaleX: 2,
  },
};

interface NavbarProps {
  pointsTo: string;
  discs: string[];
}

const Navbar: FC<NavbarProps> = ({ pointsTo, discs }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  // const [correctDisc, setCorrectDisc] = useState("")
  useEffect(() => {
    const handler = () => {
      setIsShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        ) {
          return true;
        }
        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return isShrunk;
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      <div
        style={{
          display:
            location.pathname.includes("hoordle") ||
            location.pathname.includes("mint-now") ||
            location.pathname.includes("giveaway")
              ? "none"
              : "flex",
        }}
        className="super-container"
      >
        <div className={`navbar-container ${isShrunk ? "shrunk" : ""}`}>
          <div className="mobile-nav">
            <Link
              to={pointsTo}
              onClick={() => {
                setOpen(false);
                scroller.scrollTo("about", {
                  duration: 500,
                  smooth: "ease",
                });
              }}
              className="logo-container"
            >
              HOODLES
            </Link>
            <AnimatePresence>
              <div
                onClick={() => {
                  setOpen(!open);
                }}
                className={`navbar-hamburger ${isShrunk ? "reduced" : ""}`}
              >
                <motion.div
                  animate={open ? "open1" : "rest1"}
                  variants={hbarVariants}
                  transition={{ duration: 0.2 }}
                  className="hbar"
                />
                <motion.div
                  animate={open ? "open2" : "rest2"}
                  variants={hbarVariants}
                  transition={{ duration: 0.2 }}
                  className="hbar"
                />
                <motion.div
                  animate={open ? "open3" : "rest3"}
                  variants={hbarVariants}
                  transition={{ duration: 0.2 }}
                  className="hbar"
                />
              </div>
            </AnimatePresence>
          </div>
          <div className="navbar-desktop-options">
            <div></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {navOptions.map((btn) => (
                <NavBtn
                  key={btn.title}
                  to={btn.to}
                  title={btn.title}
                  fullSend={() => {
                    setOpen(false);
                    scroller.scrollTo(btn.to, {
                      duration: 1000,
                      smooth: "ease",
                    });
                  }}
                />
              ))}
            </div>
            <div className="navbar-socials">
              <a target="_blank" href={discs[Number(pointsTo.charAt(1))]}>
                <img className="icon" src={Discord} />
              </a>
              <a
                target="_blank"
                href="https://opensea.io/collection/hoodles-official/"
              >
                <img className="icon" src={Sea} />
              </a>
              <a target="_blank" href="https://www.tiktok.com/@thehoodlesnft/">
                <img className="icon" src={Tiktok} />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/thehoodlesnft/"
              >
                <img className="icon" src={Instagram} />
              </a>
              <a target="_blank" href="https://twitter.com/thehoodlesNFT">
                <img className="icon" src={Twitter} />
              </a>

              {/* <ConnectButton /> */}
            </div>
          </div>
          <AnimatePresence presenceAffectsLayout={false}>
            <motion.section
              animate={open ? "unlocked" : "locked"}
              variants={drawerVariants}
              transition={{ duration: 0.2 }}
              className={`navbar-mobile-options ${
                open ? "unlocked" : "locked"
              }`}
            >
              {navOptions.map((btn) => (
                <NavBtn
                  key={btn.title}
                  to={btn.to}
                  title={btn.title}
                  fullSend={() => {
                    setOpen(false);
                    scroller.scrollTo(btn.to, {
                      duration: 1000,
                      smooth: "ease",
                    });
                  }}
                />
              ))}
              <div className="navbar-socials">
                <a target="_blank" href={discs[Number(pointsTo.charAt(1))]}>
                  <img className="icon" src={Discord} />
                </a>
                <a
                  target="_blank"
                  href="https://opensea.io/collection/hoodles-official/"
                >
                  <img className="icon" src={Sea} />
                </a>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@thehoodlesnft/"
                >
                  <img className="icon" src={Tiktok} />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/thehoodlesnft/"
                >
                  <img className="icon" src={Instagram} />
                </a>
                <a target="_blank" href="https://twitter.com/thehoodlesNFT">
                  <img className="icon" src={Twitter} />
                </a>
              </div>
              {/* <ConnectButton /> */}
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Navbar;
