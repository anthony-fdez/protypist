import React, { useState } from "react";

import "./10second.css";
import Header from "../header/header";
import { Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

import Input from "./input";
import Keyboard from "../inScreenKeyboard/keyboard";

function Typing10Second() {
  const dispatch = useDispatch();

  const difficultyReducer = useSelector(
    (state) => state.tenSecondsDifficultyReducer
  );
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const [isMenuInScreen, setIsMenuInScreen] = useState(false);
  const [dificulty, setDificulty] = useState(difficultyReducer);

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
            <Keyboard />
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
            <Button
              variant="contained"
              onClick={() => {
                setDificulty("EASY");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "EASY",
                });
              }}
              className={
                dificulty === "EASY"
                  ? "difficulty-btn mr-2"
                  : "difficulty-btn mr-2"
              }
              style={
                dificulty === "EASY"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      color: colorFiles.fontColor,
                    }
              }
            >
              Easy
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDificulty("NORMAL");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "NORMAL",
                });
              }}
              className={
                dificulty === "NORMAL"
                  ? "difficulty-btn mr-2"
                  : "difficulty-btn mr-2"
              }
              style={
                dificulty === "NORMAL"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      color: colorFiles.fontColor,
                    }
              }
            >
              Normal
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDificulty("HARD");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "HARD",
                });
              }}
              className={
                dificulty === "HARD"
                  ? "difficulty-btn mr-2"
                  : "difficulty-btn mr-2"
              }
              style={
                dificulty === "HARD"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      color: colorFiles.fontColor,
                    }
              }
            >
              Hard
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDificulty("EPIC");
                dispatch({
                  type: "SET_10SECONDS_MODE",
                  payload: "EPIC",
                });
              }}
              className={
                dificulty === "EPIC"
                  ? "difficulty-btn mr-2"
                  : "difficulty-btn mr-2"
              }
              style={
                dificulty === "EPIC"
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor:
                        colorFiles.secondSecondaryBackgroundColor,
                      color: colorFiles.fontColor,
                    }
              }
            >
              Epic
            </Button>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Typing10Second;
