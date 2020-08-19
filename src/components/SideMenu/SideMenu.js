import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";
import { useDispatch, useSelector } from "react-redux";
import Typical from "react-typical";

import { useLocation } from "react-router-dom";

function SideMenu() {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.themeReducer);

  const colorFiles = require(`../themes/${colors}`);

  const theme = useSelector((state) => state.darkModeReducer);

  let location = useLocation();
  location = location.pathname;

  const checkButtonClass = (path) => {
    if (location === path) {
      return "navigation-button-active";
    } else return "navigation-button";
  };

  const checkButtonStyle = (path) => {
    if (location === path) {
      return colorFiles.primaryColor;
    } else return colorFiles.secondaryBackgroundColor;
  };

  const checkButtonStyleColor = (path) => {
    if (location === path) {
      return colorFiles.contrastFontColor;
    } else return colorFiles.fontColor;
  };

  const checkTypingGameClass = (path) => {
    if (location === path) {
      return "typing-game-active";
    } else return "typing-game-button";
  };

  return (
    <div className={"SideMenu"}>
      <div className="d-flex justify-content-center">
        <h3 className="text-primary">Pro</h3>
        <h3>
          <Typical steps={["Typist"]} />
        </h3>
      </div>

      <div className="navigation-buttons">
        <Link className="left-menu-link" to="/10second">
          <div
            style={{
              backgroundColor: checkButtonStyle("/10second"),
              color: checkButtonStyleColor("/10second"),
            }}
            className={checkButtonClass("/10second")}
          >
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-clock"
            ></i>
            <h5>10second</h5>
          </div>
        </Link>
        <Link className="left-menu-link" to="/">
          <div
            style={{
              backgroundColor: checkButtonStyle("/"),
              color: checkButtonStyleColor("/"),
            }}
            className={checkTypingGameClass("/")}
          >
            <div className="typing-test-top-button">
              <i
                style={{ position: "absolute", left: "20px" }}
                className="fas fa-keyboard"
              ></i>
              <h5>TypingTest</h5>
            </div>
            <div
              onClick={() => {
                dispatch({
                  type: "TOGGLE_OPENING_SIDE_MENU",
                });
              }}
              className="typing-test-bottom-button"
            >
              <i
                style={{ position: "absolute", left: "20px" }}
                className="fas fa-quote-left"
              ></i>
              <h5>Info</h5>
            </div>
          </div>
        </Link>
        <hr
          style={{ marginTop: "10px", backgroundColor: colorFiles.hrColor }}
        ></hr>
        <Link className="left-menu-link" to="/200">
          <div
            style={{
              backgroundColor: checkButtonStyle("/200"),
              color: checkButtonStyleColor("/200"),
            }}
            className={checkButtonClass("/200")}
          >
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-biking"
            ></i>
            <h5>Top 200</h5>
          </div>
        </Link>
        <Link className="left-menu-link" to="/1000">
          <div
            style={{
              backgroundColor: checkButtonStyle("/1000"),
              color: checkButtonStyleColor("/1000"),
            }}
            className={checkButtonClass("/1000")}
          >
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-car-side"
            ></i>
            <h5>Top 1000</h5>
          </div>
        </Link>
        <hr
          style={{ marginTop: "10px", backgroundColor: colorFiles.hrColor }}
        ></hr>
        <Link className="left-menu-link" to="/stats">
          <div
            style={{
              backgroundColor: checkButtonStyle("/stats"),
              color: checkButtonStyleColor("/stats"),
            }}
            className={checkTypingGameClass("/stats")}
          >
            <div className="typing-test-top-button">
              <i
                style={{ position: "absolute", left: "20px" }}
                className="far fa-chart-bar"
              ></i>
              <h5>Stats</h5>
            </div>
            <div
              onClick={() => {
                dispatch({
                  type: "TOGGLE_OPENING_LADDERBOARD_MENU",
                });
              }}
              className="typing-test-bottom-button"
            >
              <h5>Leaderboard</h5>
            </div>
          </div>
        </Link>
        <Link
          className="left-menu-link"
          to="/settings"
          style={{ position: "absolute", width: "200px", bottom: "2rem" }}
        >
          <div
            style={{
              backgroundColor: checkButtonStyle("/settings"),
              color: checkButtonStyleColor("/settings"),
            }}
            className={checkButtonClass("/settings")}
          >
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-tools"
            ></i>
            <h5>Settings</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
