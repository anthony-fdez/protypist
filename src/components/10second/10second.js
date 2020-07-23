import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

import Input from "./input";
import "./10second.css";

function Game10seconds() {
  const [darkMode] = useState(true);
  const [isMenuInScreen, setIsMenuInScreen] = useState(false);
  const [dificulty, setDificulty] = useState(1); // easy: 2seconds, normal: 1second, harn 0.4seconds
  const [language, setLanguage] = useState(true); // TRUE is English, FALSE is spanish

  /*================== Getting the data from the browser ==================*/

  useEffect(() => {
    let userLanguage = window.localStorage.getItem("language");
    if (userLanguage === null) {
      setLanguage(true);
      window.localStorage.setItem("language", "true");
    } else if (userLanguage === "true") {
      setLanguage(true);
    } else if (userLanguage === "false") {
      setLanguage(false);
    }
  }, []);

  // Seting the settings to the browser

  useEffect(() => {
    //window.localStorage.setItem("mode", darkMode);
    window.localStorage.setItem("language", language);
  }, [darkMode, language]);

  /*================== Fading in animation ==================*/

  const props = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const changeDificultyButtonColors = (isDeficultyEqual) => {
    if (dificulty === isDeficultyEqual) {
      return "dificulty-button btn btn-primary m-1";
    } else return "dificulty-button btn btn-light m-1";
  };

  const enableClickingOutsideToCloseTheMenu = () => {
    if (isMenuInScreen) {
      setIsMenuInScreen(false);
    }
  };

  /*================== Sliding Menu ==================*/

  function slidingMenu() {
    return (
      <div
        className={
          isMenuInScreen ? "ten-second-menu-open" : "ten-second-menu-closed"
        }
      >
        <div className="ten-second-sliding-menu-div">
          <div className="how-to-play">
            <h3 style={{ color: "rgb(0, 118, 253)", "text-align": "center" }}>
              How to pay?
            </h3>
            <hr></hr>
            <p>
              Easy... Just type the word that is avobe where you type, every
              time you get one word right it'll add time depending on the
              dificulty, easy adds 2seconds, normal adds 1 and hard 0.5. When
              you run out of time you lose.{" "}
            </p>
            <p></p>
          </div>
          <div className="settings-page-info">
            <div className="sliding-menu-top-settings">
              <h1>{language ? "Settings" : "Ajustes"}</h1>
            </div>
            <hr className={"hr-white"}></hr>
            <div className={darkMode ? "settings-dark" : "settings-light"}>
              <h5 className="m-0">{language ? "Language:" : "Idioma:"}</h5>
              <button
                onClick={() => {
                  setLanguage(!language);
                }}
                className={"btn btn-light"}
                // className={darkMode ? "btn btn-light" : "btn btn-dark"}
              >
                {language ? "Eng" : "Esp"}
              </button>
            </div>
            <div
              className={
                darkMode ? "settings-dificult-dark" : "settings-dificult-light"
              }
            >
              <div>
                <h5>{language ? "Dificulty:" : "Dificultad:"}</h5>
              </div>
              <div className="dificulty-buttons">
                <button
                  onClick={() => {
                    setDificulty(2);
                  }}
                  className={changeDificultyButtonColors(2)}
                >
                  {language ? "Easy" : "Facil"}
                </button>
                <button
                  onClick={() => {
                    setDificulty(1);
                  }}
                  className={changeDificultyButtonColors(1)}
                >
                  {language ? "Normal" : "Normal"}
                </button>
                <button
                  onClick={() => {
                    setDificulty(0.5);
                  }}
                  className={changeDificultyButtonColors(0.5)}
                >
                  {language ? "Hard" : "Dificil"}
                </button>
              </div>
            </div>
          </div>
          <div
            onClick={enableClickingOutsideToCloseTheMenu}
            className="close-botton"
          >
            x
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="typing-10-second">
      <div
        className={isMenuInScreen ? "dark-mode-open" : "dark-mode-closed"}
        onClick={isMenuInScreen ? enableClickingOutsideToCloseTheMenu : null}
      >
        {/* <Div100vh className={darkMode ? "dark-mode" : "light-mode"}></Div100vh> */}
        <animated.div style={props}>
          <div>
            <div>
              <div className={"App transition  p-3 container"}>
                <div className="title ">
                  <h1>{language ? "10 second chalenge!" : "Escribidor!"}</h1>
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
                  <Input
                    dificulty={dificulty}
                    language={language}
                    darkMode={darkMode}
                  />
                </div>
              </div>

              <div className="settings-div container">
                <div>
                  <Link to="/">
                    <div className="nav-bottons">
                      <h5>Back to Menu</h5>
                    </div>
                  </Link>
                </div>
                <div>
                  <div
                    onClick={() => setIsMenuInScreen(!isMenuInScreen)}
                    className="nav-bottons"
                  >
                    <h5>Settings</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
}
export default Game10seconds;
