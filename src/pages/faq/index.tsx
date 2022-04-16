import React, { useState } from "react";
import faqList from "./faq";
import Dropdown from "../../components/dropdown/dropdown";
import wave from "../../assets/pictures/wave-green2.svg";
import "./faq.scss";
const Faq = () => {
  const [open, setOpen] = useState<false | number>(0);
  return (
    <section id="faq" className="faq-container">
      <img src={wave} className="faq-divider" />
      <div className="faq-list">
        <header className="faq-header">FAQ</header>
        {faqList.map((faq, index) => {
          return (
            <Dropdown
              index={index}
              open={open}
              setOpen={setOpen}
              answer={faq.answer}
              question={faq.question}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
