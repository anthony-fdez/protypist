import React, { useState } from "react";
import "./settings.css";
import Header from "../header/header";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

function Settings() {
  const theme = useSelector((state) => state.darkModeReducer);
  const length = useSelector((state) => state.lengthReducerNormal);
  const lenghtAdvanced = useSelector((state) => state.lengthReducerAdvanced);
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const [isThemesCardOpen, setIsThemesCardOpen] = useState(false);

  const dispatch = useDispatch();

  const colors = useSelector((state) => state.themeReducer);

  const colorFiles = require(`../themes/${colors}`);

  const displayTheActualTheme = () => {
    let name = colors.split("");
    for (let i = 0; i < 5; i++) {
      name.pop();
    }

    name = name.join("");

    return name.toUpperCase();
  };

  displayTheActualTheme();

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <animated.div className={"home-page"} style={animation}>
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
          transition: "0.3s",
        }}
      >
        <Header text="Settings" />
        <div className="container mt-5">
          <div
            onClick={() => {
              setIsThemesCardOpen(!isThemesCardOpen);
            }}
            className={
              isThemesCardOpen
                ? "settings-card-themes-open"
                : "settings-card-themes-closed"
            }
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
          >
            <div className="theme-card-info">
              <div style={{ textAlign: "left" }}>
                <h2>Theme</h2>
                <p>Change the overall theme of the app!</p>
              </div>
              <h1 className="text-themes">{displayTheActualTheme()}</h1>
            </div>
            <div className="themes-buttons">
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "dark.json" });
                }}
              >
                Dark
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "light.json" });
                }}
              >
                Light
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "oceanBlue.json" });
                }}
              >
                OceanBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "fire.json" });
                }}
              >
                Fire
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "aqua.json" });
                }}
              >
                Aqua
              </button>

              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkred.json" });
                }}
              >
                DarkRed
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "SELECT_THEME", payload: "darkblue.json" });
                }}
              >
                DarkBlue
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <h3>Typing Settings</h3>
          <div
            className={"settings-card-words"}
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2>Test Length</h2>
              <p>Change how many word to type in the normal test.</p>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TEXT_LENGHT", payload: 25 });
                }}
                style={{
                  marginLeft: "2rem",
                  backgroundColor: colorFiles.primaryColor,
                }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                25
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TEXT_LENGHT", payload: 50 });
                }}
                style={{
                  marginLeft: "2rem",
                  backgroundColor: colorFiles.primaryColor,
                }}
                className={"btn btn-primary"}
              >
                50
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TEXT_LENGHT", payload: 75 });
                }}
                style={{
                  marginRight: "11rem",
                  marginLeft: "2rem",
                  backgroundColor: colorFiles.primaryColor,
                }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                75
              </button>
            </div>
            <h1 className="text">{length}</h1>
          </div>
          <div
            className={"settings-card-words"}
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2>Test Length (advanced)</h2>
              <p>Change how many word to type in the advanced test.</p>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TEXT_LENGHT_ADVANCED", payload: 25 });
                }}
                style={{
                  marginLeft: "2rem",
                  backgroundColor: colorFiles.primaryColor,
                }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                25
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TEXT_LENGHT_ADVANCED", payload: 50 });
                }}
                style={{
                  marginLeft: "2rem",
                  backgroundColor: colorFiles.primaryColor,
                }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                50
              </button>
              <button
                onClick={() => {
                  dispatch({ type: "SET_TEXT_LENGHT_ADVANCED", payload: 75 });
                }}
                style={{
                  marginRight: "11rem",
                  marginLeft: "2rem",
                  backgroundColor: colorFiles.primaryColor,
                }}
                className={theme ? "btn btn-primary" : "btn btn-dark"}
              >
                75
              </button>
            </div>
            <h1 className="text">{lenghtAdvanced}</h1>
          </div>
        </div>
        <h3>Ui settings</h3>
        <div style={{ cursor: "pointer" }} className="container">
          <div
            onClick={() => {
              dispatch({ type: "SET_KEYBOARD_ON_SCREEN" });
            }}
            className={"settings-card-words"}
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2>On Screen Keyboard</h2>
              <p>Hide or show the Keyboard on the screen.</p>
            </div>
            <h1 className="text">{keyboardOnScreen ? "ON" : "OFF"}</h1>
          </div>
        </div>
        <div
          style={{ cursor: "pointer", paddingBottom: "5rem" }}
          className="container"
        >
          <div
            onClick={() => {
              dispatch({ type: "REAL_TIME_WPM" });
            }}
            className={"settings-card-words"}
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2>Real Time WPM</h2>
              <p>
                Choose whether you want to see your speed as you type or not.
              </p>
              <p>
                <strong>Note:</strong> if its on and it says infinite, you are
                not a god, its a bug :)
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
