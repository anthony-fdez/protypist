import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";

function SideMenu() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.darkModeReducer);

  let location = useLocation();
  location = location.pathname;

  const checkButtonClass = (path) => {
    if (theme) {
      if (location === path) {
        return "navigation-button-active-dark";
      } else return "navigation-button-dark";
    } else if (theme === false) {
      if (location === path) {
        return "navigation-button-active-light";
      } else return "navigation-button-light";
    }
  };

  return (
    <div className={theme ? "SideMenu-dark" : "SideMenu-light"}>
      <h3>TypingGame</h3>
      <div className="navigation-buttons">
        <Link to="/">
          <div className={checkButtonClass("/")}>
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-home"
            ></i>
            <h5>Home</h5>
          </div>
        </Link>
        <Link to="/10second">
          <div className={checkButtonClass("/10second")}>
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-clock"
            ></i>
            <h5>10second</h5>
          </div>
        </Link>
        <Link to="/typingtest">
          <div className={checkButtonClass("/typingtest")}>
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-keyboard"
            ></i>
            <h5>TypingTest</h5>
          </div>
        </Link>
        <Link to="/quotes">
          <div className={checkButtonClass("/quotes")}>
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-quote-left"
            ></i>
            <h5>Quotes</h5>
          </div>
        </Link>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr" : "dark-hr"}
        ></hr>
        <Link to="/200">
          <div className={checkButtonClass("/200")}>
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-biking"
            ></i>
            <h5>Top 200</h5>
          </div>
        </Link>
        <Link to="/1000">
          <div className={checkButtonClass("/1000")}>
            <i
              style={{ position: "absolute", left: "20px" }}
              className="fas fa-car-side"
            ></i>
            <h5>Top 1000</h5>
          </div>
        </Link>
        <Link
          to="/settings"
          style={{ position: "absolute", width: "200px", bottom: "2rem" }}
        >
          <div className={checkButtonClass("/settings")}>
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
