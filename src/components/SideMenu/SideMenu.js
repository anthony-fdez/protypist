import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./SideMenu.css";

function SideMenu() {
  return (
    <div className="SideMenu">
      <h2>TypingGame</h2>

      <div className="navigation-buttons">
        <Link to="/">
          <div className="navigation-button">
            <h3>Home</h3>
          </div>
        </Link>
        <Link to="/10second">
          <div className="navigation-button">
            <h3>10second</h3>
          </div>
        </Link>
        <Link to="/typingtest">
          <div className="navigation-button">
            <h3>TypingTest</h3>
          </div>
        </Link>
        <Link to="/quotes">
          <div className="navigation-button">
            <h3>Quotes</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
