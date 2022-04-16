import React, { FC } from "react";
import "../common.scss";
import { useNavigate } from "react-router-dom";

interface TakeMeToProps {
  title: string;
  to: string;
  variant?: boolean;
}
const TakeMeTo: FC<TakeMeToProps> = ({ title, to, variant }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`take-me-to-mint-btn ${variant ? "variant" : ""}`}
    >
      {title}
    </button>
  );
};

export default TakeMeTo;
