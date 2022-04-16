import React, { FC } from "react";

interface NavBtnProps {
  title: string;
  to: string;
  fullSend: () => void;
}

const NavBtn: FC<NavBtnProps> = ({ title, to, fullSend }) => {
  return (
    <div className="navbtn" onClick={() => fullSend()}>
      {title.toUpperCase()}
    </div>
  );
};

export default NavBtn;
