import React, { FC } from "react";
import { TileState } from "./tileState";
import "./hoordle.scss";

interface TileProps {
  value: string;
  state: string;
  // animation?: string;
}

const Tile: FC<TileProps> = ({ value, state }) => {
  return <div className={`tile ${state}`}>{value}</div>;
};

export default Tile;
