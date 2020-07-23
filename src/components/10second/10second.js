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

  const [isMenuInScreen, setIsMenuInScreen] = useState(false);
  const [dificulty, setDificulty] = useState(1); // easy: 2seconds, normal: 1second, harn 0.4seconds
  const [keyboardOnScreen, setKeyboardOnScreen] = useState(true);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  const displayKeyboard = () => {
    if (keyboardOnScreen) {
      if (theme) {
        return <KeyboardDark />;
      } else return <Keyboard />;
    } else return null;
  };

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
      <div>
        <div className={isMenuInScreen ? "dark-mode-open" : "dark-mode-closed"}>
          {/* <div className={darkMode ? "dark-mode" : "light-mode"}></div> */}

          <div>
            <div>
              <div
                className={"App transition  p-3 container"}
                // className={
                //   darkMode
                //     ? "transition App p-3 container bg-dark "
                //     : "transition App p-3 container bg-primary text-white"
                // }
              ></div>
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
        {displayKeyboard()}
      </div>
    </animated.div>
  );
}

export default Typing10Second;
