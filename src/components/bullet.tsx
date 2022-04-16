import React, { FC } from "react";
import bullet from "../assets/icons/bullbull.svg";
import "./common.scss";

interface BulletPointProps {
  height?: string;
  width?: string;
  margin?: string;
}

const BulletPoint: FC<BulletPointProps> = ({ width, height, margin }) => {
  return (
    <img
      src={bullet}
      style={{ height: height, width: width, margin: margin }}
      className="bullet"
    />
  );
};

export default BulletPoint;
