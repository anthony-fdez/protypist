import React, { useState } from "react";

import "./10second.css";
import Header from "../header/header";
import Qwerty from "../inScreenKeyboard/qwerty";
import Dvorak from "../inScreenKeyboard/dvorak";
import Colemak from "../inScreenKeyboard/colemak";

import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

import Input from "./input";

function Typing10Second() {
  const dispatch = useDispatch();
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const difficultyReducer = useSelector(
    (state) => state.tenSecondsDifficultyReducer
  );
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const keyboardLayout = useSelector((state) => state.selectKeyboardLayout);

  const [isMenuInScreen, setIsMenuInScreen] = useState(false);
  const [dificulty, setDificulty] = useState(difficultyReducer);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  const keyboardLayoutSelector = () => {
    if (keyboardLayout === "QWERTY") {
      return <Qwerty />;
    } else if (keyboardLayout === "DVORAK") {
      return <Dvorak />;
    } else if (keyboardLayout === "COLEMAK") {
      return <Colemak />;
    } else return <Qwerty />;
  };

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
                <div className="container">
                  <Input dificulty={dificulty} />
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
            {keyboardOnScreen && keyboardLayoutSelector()}
          </div>
        </div>

        <div className={"settings-10second"}>
          <div
            style={{
              display: "flex",
              margin: "auto",
              position: "absolute",
              bottom: "5px",
            }}
          >
            <button
              onClick={() => {
                setDificulty("EASY");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "EASY",
                });
              }}
              className={
                dificulty === "EASY"
                  ? "difficulty-btn btn btn-light mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
              style={
                dificulty === "EASY"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
              }
            >
              Easy
            </button>
            <button
              onClick={() => {
                setDificulty("NORMAL");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "NORMAL",
                });
              }}
              className={
                dificulty === "NORMAL"
                  ? "difficulty-btn btn btn-light mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
              style={
                dificulty === "NORMAL"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
              }
            >
              Normal
            </button>
            <button
              onClick={() => {
                setDificulty("HARD");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "HARD",
                });
              }}
              className={
                dificulty === "HARD"
                  ? "difficulty-btn btn btn-light mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
              style={
                dificulty === "HARD"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
              }
            >
              Hard
            </button>
            <button
              onClick={() => {
                setDificulty("EPIC");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "EPIC",
                });
              }}
              className={
                dificulty === "EPIC"
                  ? "difficulty-btn btn btn-light mr-2"
                  : "difficulty-btn btn btn-light mr-2"
              }
              style={
                dificulty === "EPIC"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      border: "none",
                      color: colorFiles.fontColor,
                    }
              }
            >
              Epic
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Typing10Second;
