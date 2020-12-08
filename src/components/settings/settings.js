import React from "react";
import "./settings.css";
import Header from "../header/header";
import ThemesCard from "./themesCard";
import LanguageCard from "./languageCard";
import FontFamilyCard from "./fontFamilyCard";
import KeyboardLayout from "./keyboardLayout";
import FontSizeCard from "./fontSize";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";

function Settings() {
  const theme = useSelector((state) => state.darkModeReducer);
  const length = useSelector((state) => state.lengthReducerNormal);
  const lenghtAdvanced = useSelector((state) => state.lengthReducerAdvanced);
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const instaDeath = useSelector((state) => state.instaDeathReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  const dispatch = useDispatch();

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const isAccountPrivate = useSelector((state) => state.privateAccountReducer);

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
        <ThemesCard />
        <LanguageCard />

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
                  color: colorFiles.contrastFontColor,
                  border: "none",
                }}
                className={theme ? "btn btn-light" : "btn btn-dark"}
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
                  color: colorFiles.contrastFontColor,
                  border: "none",
                }}
                className={"btn btn-light"}
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
                  color: colorFiles.contrastFontColor,
                  border: "none",
                }}
                className={theme ? "btn btn-light" : "btn btn-dark"}
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
                  color: colorFiles.contrastFontColor,
                  border: "none",
                }}
                className={theme ? "btn btn-light" : "btn btn-dark"}
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
                  color: colorFiles.contrastFontColor,
                  border: "none",
                }}
                className={theme ? "btn btn-light" : "btn btn-dark"}
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
                  color: colorFiles.contrastFontColor,
                  border: "none",
                }}
                className={theme ? "btn btn-light" : "btn btn-dark"}
              >
                75
              </button>
            </div>
            <h1 className="text">{lenghtAdvanced}</h1>
          </div>
          <div
            className={"settings-card-words"}
            style={
              instaDeath
                ? {
                    backgroundColor: "rgb(235, 64, 52)",
                    color: "white",
                  }
                : {
                    backgroundColor: colorFiles.secondaryBackgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
            onClick={() => {
              dispatch({ type: "ACTIVATE_INSTA_DEATH!" });
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2>Instant Death Mode</h2>
              <p>
                This is for those who want to take their accuracy to the next
                level. If you make an error you lose. And no data will be saved
                if you lose
              </p>
            </div>
            <h1 className="text">{instaDeath ? "ON" : "OFF"}</h1>
          </div>
        </div>
        {isLoggedIn && (
          <div>
            <h3>Account</h3>
            <div className="container">
              <div
                className={"settings-card-words"}
                style={{
                  backgroundColor: colorFiles.secondaryBackgroundColor,
                  color: colorFiles.fontColor,
                }}
                onClick={() => {
                  const headers = {
                    Authorization: jwt,
                  };

                  const data = "testing";

                  axios
                    .post(
                      "https://protypist.herokuapp.com/users/me/private",
                      data,
                      {
                        headers: headers,
                      }
                    )
                    .then((Response) => {
                      console.log(Response);
                      dispatch({
                        type: "SET_ACCOUNT_TYPE",
                        payload: Response.data,
                      });
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h2>Account: {isAccountPrivate ? "Private" : "Public"}</h2>
                  <p>
                    If your account is public other people can see all your
                    races and statistics.
                  </p>
                </div>
                <h1 className="text">
                  {isAccountPrivate ? "PRIVATE" : "PUBLIC"}
                </h1>
                <div>
                  {isAccountPrivate ? (
                    <i class="fas fa-lock fa-2x"></i>
                  ) : (
                    <i class="fas fa-lock-open fa-2x"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <h3>Ui settings</h3>
        <FontFamilyCard />
        <FontSizeCard />
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
        <KeyboardLayout />
        <div
          style={{ cursor: "pointer", paddingBottom: "6rem" }}
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
        <div
          style={{
            backgroundColor: colorFiles.primaryColor,
            color: colorFiles.fontColor,
          }}
          className="gitHub-link-div"
        >
          <a
            style={{ color: colorFiles.contrastFontColor }}
            className="gitHub-link"
            href="https://github.com/anthony-fdez/protypist"
            target="blank"
          >
            <i className="fab fa-github gitHub-icon"></i>
            GitHub Repo
          </a>
        </div>
      </div>
    </animated.div>
  );
}

export default Settings;
