import React from "react";
import "./settings.css";
import { useState, useEffect } from "react";
import Header from "../header/header";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

function Settings() {
  const theme = useSelector((state) => state.darkModeReducer);
  const length = useSelector((state) => state.lengthReducer);
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const dispatch = useDispatch();

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  const selectTheText = () => {
    if (length === 20) {
      return "20";
    } else if (length === 35) {
      return "35";
    } else if (length === 50) {
      return "50";
    }
  };

  return (
    <animated.div
      style={animation}
      className={theme ? "home-page-dark" : "home-page-light"}
    >
      <div className="Home">
        <Header text="Settings" />
        <div className="container">
          <p className="alert-primary settings-alert">
            <strong>Note: </strong>
            all the adjustments that you make here will be erased if you clear
            you browser cache.
          </p>
          <div
            onClick={() => {
              dispatch({ type: "CHANGE_THEME" });
            }}
            className={theme ? "settings-card-dark" : "settings-card-ligth"}
          
            <div style={{ textAlign: "left" }}>
              <h2>Dark Mode</h2>
              <p>Change between dark and light mode.</p>
            </div>
            <h1 className="text">{theme ? "ON" : "OFF"}</h1>
          </div>
        </div>

        <div className="container mt-5">
          <h3>Typing Settings</h3>
          <div
            className={
              theme ? "settings-card-dark-words" : "settings-card-ligth-words"
            }
          >
            <div style={{ textAlign: "left" }}>
              <h2>Test Length</h2>
              <p>Change the amoung of words that you want on your tests.</p>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TO_20" });
                }}
                style={{ marginLeft: "2rem" }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                20
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TO_35" });
                }}
                style={{ marginLeft: "2rem" }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                35
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TO_50" });
                }}
                style={{ marginRight: "11rem", marginLeft: "2rem" }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                50
              </button>
            </div>
            <h1 className="text">{selectTheText()}</h1>
          </div>
        </div>
        <div style={{ cursor: "pointer" }} className="container">
          <div
            onClick={() => {
              dispatch({ type: "REAL_TIME_WPM" });
            }}
            className={
              theme ? "settings-card-dark-words" : "settings-card-ligth-words"
            }
          >
            <div style={{ textAlign: "left" }}>
              <h2>Real Time WPM</h2>
              <p>
                Choose whether you want to see your speed as you type or not.
              </p>
              <p>
                <strong>Note:</strong> if its on and it says infinite, you are
                not a god, its a bug.
              </p>
            </div>
            <h1 className="text">{realTimeWPM ? "ON" : "OFF"}</h1>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Settings;
