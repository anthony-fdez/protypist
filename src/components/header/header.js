import React from "react";
import "./header.css";
import { useSelector } from "react-redux";

function Header(props) {
  const theme = useSelector((state) => state.darkModeReducer);
  return (
    <div className={theme ? "Header-dark" : "Header-light"}>
      <h2>{props.text}</h2>
    </div>
  );
}

export default Header;
