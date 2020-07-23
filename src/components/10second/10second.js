<<<<<<< HEAD
import React, { useState, useEffect } from "react";

import "./10second.css";
import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";
import KeyboardDark from "../inScreenKeyboard/keyboard-dark";

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
=======
import React from "react";
import "./10second.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Typing10Second() {
  const theme = useSelector((state) => state.darkModeReducer);
>>>>>>> 83e7c7443c91422330283a253147a2a09b684afb

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

<<<<<<< HEAD
  const displayKeyboard = () => {
    if (theme) {
      return <KeyboardDark />;
    } else return <Keyboard />;
  };

=======
>>>>>>> 83e7c7443c91422330283a253147a2a09b684afb
  return (
    <animated.div
      style={animation}
      className={
        theme ? "Typing10Second-page-dark" : "Typing10Second-page-light"
      }
    >
      <div className={"Typing10Second"}>
        <Header text="10second Game" />
      </div>
<<<<<<< HEAD
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
          {displayKeyboard()}
        </div>

        <div
          className={
            theme ? "settings-10second-dark" : "settings-10second-light"
          }
        >
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
=======
>>>>>>> 83e7c7443c91422330283a253147a2a09b684afb
    </animated.div>
  );
}

export default Typing10Second;
