import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import "./team.scss";

interface TeamMemberProps {
  picture: string;
  name: string;
  description: string;
  index: number;
}

const TeamMember: FC<TeamMemberProps> = ({
  picture,
  name,
  description,
  index,
}) => {
  return (
    <AnimatePresence key={name} presenceAffectsLayout={false}>
      <motion.section
        key={name}
        initial={{
          opacity: 0,
          y: 120,
          scaleX: 0,
        }}
        whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
        transition={{
          duration: 0.5,
          type: "ease",
          staggerChildren: 0.5,
        }}
        className="member-container"
      >
        <img src={picture} className="member-avatar" />
        <span className="member-name">{name}</span>
        <p className="member-description">{description}</p>
      </motion.section>
    </AnimatePresence>
  );
};

export default TeamMember;
