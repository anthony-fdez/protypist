import React from "react";
import "./header.css";
import { useState, useEffect } from "react";

function Header(props) {
  return (
    <div className="Header">
      <h1>{props.text}</h1>
    </div>
  );
}

export default Header;
