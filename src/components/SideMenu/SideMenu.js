import React, { useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./SideMenu.css";
import { useSelector, useDispatch } from "react-redux";
import changeMode from "../../action/changeTheme";
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
            <h4>Home</h4>
          </div>
        </Link>
        <Link to="/10second">
          <div className={checkButtonClass("/10second")}>
            <h4>10second</h4>
          </div>
        </Link>
        <Link to="/typingtest">
          <div className={checkButtonClass("/typingtest")}>
            <h4>TypingTest</h4>
          </div>
        </Link>
        <Link to="/quotes">
          <div className={checkButtonClass("/quotes")}>
            <h4>Quotes</h4>
          </div>
        </Link>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr" : "dark-hr"}
        ></hr>
        <Link to="/200">
          <div className={checkButtonClass("/200")}>
            <h4>200</h4>
          </div>
        </Link>
        <Link to="/1000">
          <div className={checkButtonClass("/1000")}>
            <h4>1000</h4>
          </div>
        </Link>
      </div>
      <div
        onClick={() => dispatch(changeMode())}
        className={theme ? "navigation-button-dark" : "navigation-button-light"}
        style={{ position: "fixed", width: "145px", bottom: "2rem" }}
      >
        <h4>Theme</h4>
      </div>
    </div>
  );
}

export default SideMenu;
