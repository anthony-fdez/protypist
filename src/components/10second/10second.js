import React, { useState, useEffect } from "react";
import "./10second.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

import Input from "./input";

function Typing10Second() {
  const theme = useSelector((state) => state.darkModeReducer);

  const [isMenuInScreen, setIsMenuInScreen] = useState(false);
  const [dificulty, setDificulty] = useState(1); // easy: 2seconds, normal: 1second, harn 0.4seconds

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

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
              >
                <div className="title ">
                  <h1>10 Second Challenge</h1>
                  <h5 style={{ color: "rgb(0, 118, 253)" }}>
                    Type fast, you only have 10 seconds
                  </h5>
                </div>
              </div>
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
      </div>
    </animated.div>
  );
}

export default Typing10Second;
