import React from "react";
import "./header.css";
import { useSelector } from "react-redux";

function Header(props) {
  const theme = useSelector((state) => state.darkModeReducer);
  return (
    <div className={theme ? "Header-dark" : "Header-light"}>
      <h1>{props.text}</h1>
    </div>
  );
}

export default Header;
