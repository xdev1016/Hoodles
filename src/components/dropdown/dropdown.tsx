import React, { FC } from "react";
import "./dropdown.scss";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  question: string;
  answer: string;
  open: number | false;
  setOpen: (arg: number | false) => void;
  index: number;
}

const Dropdown: FC<DropdownProps> = ({
  answer,
  question,
  open,
  setOpen,
  index,
}) => {
  const isOpen = index === open;
  return (
    <motion.div
      key={index}
      className={`dropdown-container ${isOpen ? "dropped" : ""}`}
      onClick={() => setOpen(isOpen ? false : index)}
    >
      <motion.div className="dropdown-title" initial={false}>
        {question}
        <div className={`circle ${isOpen ? "checked" : ""}`} />
      </motion.div>
      <AnimatePresence presenceAffectsLayout={false} initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className="dropdown-text"
            variants={{
              open: { opacity: 1, height: "auto", padding: "2em" },
              collapsed: { opacity: 0, height: 0, padding: "0em" },
            }}
            transition={{ duration: 0.2, type: "ease" }}
          >
            <em style={{ transformOrigin: "top center" }}>{answer}</em>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dropdown;
