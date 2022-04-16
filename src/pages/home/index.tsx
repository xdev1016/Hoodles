import { AnimatePresence } from "framer-motion";
import React, { useState, FC } from "react";
import Welcome from "../../components/welcome/welcome";
import Faq from "../faq";
import Roadmap from "../roadmap";
import Team from "../team";
import About from "../../pages/about";
import Modal from "../../components/welcome/modal";
import exit from "../../assets/icons/close.svg";
import caret from "../../assets/icons/caret-white.svg";
import sniper from "../../assets/pictures/logo2-white.png";
interface HomePageProps {
  disc: string;
  pointsTo: string;
}

const HomePage: FC<HomePageProps> = ({ disc, pointsTo }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const modalContent = [
    <div style={{ display: "flex", flexDirection: "column" }}>
      <b
        style={{
          fontSize: "1.2em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        HOW IT ALL HAPPENED
        <img
          src={exit}
          className="exit-button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        />
      </b>{" "}
      <br /> Everybody's heard of Doodles. Everybody knows Doodles. All the
      beautiful people, like San Francisco meets Mardi Gras personified, you get
      what I'm saying? <br />
      <br /> You got the rainbow vomit guy, a staple of the community, real
      funny guy, invited him to my wedding, big mistake, but we're still
      friends. You got the monkey one, everybody loves the monkey one. Blue
      mohawk and pink heart eyed guy - come on, great guys, great kids. These
      are folks you'd bring home to see your mom and pop, people you want to
      meet and get to know better. <br />
      <br />
      <div className="modal-dot-container">
        <img
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
          src={caret}
        />
        <div className="modal-dot filled"></div>
        <div className="modal-dot"></div>
        <img
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
          src={caret}
        />
      </div>
    </div>,
    <div style={{ display: "flex", flexDirection: "column" }}>
      <em
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        But what happens when a Doodle turns bad?
        <img
          src={exit}
          className="exit-button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        />
      </em>
      <br />
      Nobody talks about it. But like a bathroom aftermath of too much chipotle
      sauce, it happens. Happens more than you'd care to think. Ever had some
      pink or blue guy give you the stink eye with a rocket launcher on his
      back? That's a Hoodle. And you're in the Hood now. <br />
      <br /> Seen the FBI's Top 10 Most Wanted list lately? It's mostly Hoodles.
      They smoke the wrong things, sell the wrong things, do the wrong things.
      They're bad, scary folk. They'll look at you wrong and you'd best not look
      back. <br />
      <br /> I've seen the blue koala bear Hoodle take a baseball bat to six
      Doodles just for being at the wrong place at the wrong time. He took 'em
      apart like Kinder Surprise egg toys. They never had a chance. You never
      want to blame the victim, but it was kind of on them. They were in the
      wrong neighborhood. Should have stayed out of the Hood.
      <div className="modal-dot-container">
        <img
          src={caret}
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
        />{" "}
        <div className="modal-dot"></div>
        <div className="modal-dot filled"></div>
        <img
          className="modal-caret"
          onClick={(e) => {
            e.stopPropagation();
            page === 1 ? setPage(0) : setPage(1);
          }}
          src={caret}
        />
      </div>
    </div>,
  ];
  return (
    <AnimatePresence>
      <section
        id="about"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          transition: "ease 0.2s",
          zIndex: 0,
          position: "relative",
        }}
      >
        <About pointsTo={pointsTo} />
        <Welcome disc={disc} open={open} setOpen={setOpen} />
        <Roadmap />
        <Team />
        <Faq />
        <div>
          <a className="" href="https://raritysniper.com/">
            <img style={{ height: "100px", width: "250px" }} src={sniper} />
          </a>
        </div>
        <Modal
          page={page}
          content={modalContent}
          setPage={setPage}
          open={open}
          setOpen={setOpen}
        />
      </section>
    </AnimatePresence>
  );
};

export default HomePage;
