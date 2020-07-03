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

  return (
    <div className="SideMenu">
      <h2>TypingGame</h2>
      <div className="navigation-buttons">
        <Link to="/">
          <div
            className={
              location === "/"
                ? "navigation-button-active"
                : "navigation-button"
            }
          >
            <h3>Home</h3>
          </div>
        </Link>
        <Link to="/10second">
          <div
            className={
              location === "/10second"
                ? "navigation-button-active"
                : "navigation-button"
            }
          >
            <h3>10second</h3>
          </div>
        </Link>
        <Link to="/typingtest">
          <div
            className={
              location === "/typingtest"
                ? "navigation-button-active"
                : "navigation-button"
            }
          >
            <h3>TypingTest</h3>
          </div>
        </Link>
        <Link to="/quotes">
          <div
            className={
              location === "/quotes"
                ? "navigation-button-active"
                : "navigation-button"
            }
          >
            <h3>Quotes</h3>
          </div>
        </Link>
      </div>
      <div
        onClick={() => dispatch(changeMode())}
        className="navigation-button"
        style={{ position: "fixed", width: "145px", bottom: "2rem" }}
      >
        <h3>Theme</h3>
      </div>
    </div>
  );
}

export default SideMenu;
