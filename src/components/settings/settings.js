import React from "react";
import "./settings.css";
import { useState, useEffect } from "react";
import Header from "../header/header";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

function Settings() {
  const theme = useSelector((state) => state.darkModeReducer);
  const dispatch = useDispatch();

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

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
          >
            <div style={{ textAlign: "left" }}>
              <h2>Dark Mode</h2>
              <p>Change between dark and light mode.</p>
            </div>
            <h1 className="text">{theme ? "ON" : "OFF"}</h1>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Settings;
