import React from "react";
import "./TypingTest.css";
import Header from "../header/header";
import { useSelector } from "react-redux";

function TypingTest() {
  const theme = useSelector((state) => state.darkModeReducer);

  return (
    <div className={theme ? "TypingTest-page-dark" : "TypingTest-page-light"}>
      <div className="TypingTest">
        <Header text="Improve your typing skills" />
      </div>
    </div>
  );
}

export default TypingTest;
