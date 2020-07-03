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
      <h2>TypingGame</h2>
      <div className="navigation-buttons">
        <Link to="/">
          <div className={checkButtonClass("/")}>
            <h3>Home</h3>
          </div>
        </Link>
        <Link to="/10second">
          <div className={checkButtonClass("/10second")}>
            <h3>10second</h3>
          </div>
        </Link>
        <Link to="/typingtest">
          <div className={checkButtonClass("/typingtest")}>
            <h3>TypingTest</h3>
          </div>
        </Link>
        <Link to="/quotes">
          <div className={checkButtonClass("/quotes")}>
            <h3>Quotes</h3>
          </div>
        </Link>
      </div>
      <div
        onClick={() => dispatch(changeMode())}
        className={theme ? "navigation-button-dark" : "navigation-button-light"}
        style={{ position: "fixed", width: "145px", bottom: "2rem" }}
      >
        <h3>Theme</h3>
      </div>
    </div>
  );
}

export default SideMenu;
