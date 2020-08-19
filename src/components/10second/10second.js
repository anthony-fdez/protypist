import React, { useState } from "react";

import "./10second.css";
import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";

import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

import Input from "./input";

function Typing10Second() {
  const theme = useSelector((state) => state.darkModeReducer);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );

  const [isMenuInScreen, setIsMenuInScreen] = useState(false);
  const [dificulty, setDificulty] = useState("NORMAL");

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <animated.div style={animation} className={"Typing10Second-page"}>
      <div className={"Typing10Second"}>
        <Header />
      </div>
      <div>
        <div className={isMenuInScreen ? "dark-mode-open" : "dark-mode-closed"}>
          <div>
            <div>
              <div className={"App transition  p-3 container"}></div>
              <div
                onClick={() => {
                  setIsMenuInScreen(false);
                }}
              >
                <div className="container mt-3">
                  <Input dificulty={dificulty} darkMode={theme} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            keyboardOnScreen
              ? "keyboard-div-shown-10seconds"
              : "keyboard-div-hidden-10seconds"
          }
        >
          <div className="check-for-small-display">
            {keyboardOnScreen && <Keyboard />}
          </div>
        </div>

        <div className={"settings-10second"}>
          <div className="d-flex">
            <h4 className="mr-2">Difficulty: </h4>
            <button
              onClick={() => {
                setDificulty("EZZY");
              }}
              className={
                dificulty === "EZZY"
                  ? "difficulty-btn btn btn-primary mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
            >
              Ezzy
            </button>
            <button
              onClick={() => {
                setDificulty("NORMAL");
              }}
              className={
                dificulty === "NORMAL"
                  ? "difficulty-btn btn btn-primary mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
            >
              Normal
            </button>
            <button
              onClick={() => {
                setDificulty("HARD");
              }}
              className={
                dificulty === "HARD"
                  ? "difficulty-btn btn btn-primary mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
            >
              Hard
            </button>
            <button
              onClick={() => {
                setDificulty("HARDER");
              }}
              className={
                dificulty === "HARDER"
                  ? "difficulty-btn btn btn-primary mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
            >
              Harder ;)
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Typing10Second;
