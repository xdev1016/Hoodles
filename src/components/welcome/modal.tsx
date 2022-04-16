import React, { FC, useState } from "react";
import AnimatePresence, { motion } from "framer-motion";
import exit from "../../assets/icons/close.svg";
import caret from "../../assets/icons/caret-white.svg";

interface ModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  page: number;
  setPage: (arg: number) => void;
  content: JSX.Element[];
}
const Modal: FC<ModalProps> = ({ open, setOpen, content, page, setPage }) => {
  const variants = {
    visible: {
      opacity: 1,

      visible: "visible",
      display: "flex",
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 1.05,
      transitionEnd: {
        visible: "hidden",
        display: "none",
      },
    },
  };

  return (
    <motion.section
      initial={false}
      variants={variants}
      animate={open ? "visible" : "hidden"}
      className="welcome-modal"
      onClick={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
          page === 1 ? setPage(0) : setPage(1);
        }}
        className={`modal-box ${page === 1 ? "reverse" : ""}`}
      >
        {content[page]}{" "}
      </span>
    </motion.section>
  );
};

export default Modal;
