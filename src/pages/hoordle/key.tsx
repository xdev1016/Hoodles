import React, { FC } from "react";
import "./hoordle.scss";

interface KeyProps {
  state: string;
  value: string;
  onClick: (value: string, state: string) => void;
}

const Key: FC<KeyProps> = ({ state, value, onClick }) => {
  return (
    <button
      onClick={() => onClick(value, state)}
      className={`hoordle-key ${state}`}
    >
      {value.toUpperCase()}
    </button>
  );
};

export default Key;
