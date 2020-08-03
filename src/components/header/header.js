import React, { useState } from "react";
import "./header.css";
import { useSelector } from "react-redux";
import axios from "axios";

function Header(props) {
  const theme = useSelector((state) => state.darkModeReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);

  const [isLogInMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);

  const logInMenu = () => {
    return (
      <div
        className={isLogInMenuOpen ? "login-menu-open" : "login-menu-closed"}
      >
        <div className="log-in-header">
          <h2>Log in</h2>
          <i
            onClick={() => setIsLoginMenuOpen(!isLogInMenuOpen)}
            className="fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <div>
          <div>
            <h5 className="login-labels">Email:</h5>
            <input className="login-input" for="email"></input>
          </div>
          <div>
            <h5 className="login-labels">Password:</h5>
            <input type="password" className="login-input"></input>
          </div>
          <div className="log-in-button-menu">
            <h5>Log In</h5>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <p>Don't have an account?</p>
            <div className="sign-up-login-button-menu">
              <h5>Create Account</h5>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const signUpMenu = () => {
    return (
      <div
        className={isSignUpMenuOpen ? "signUp-menu-open" : "signUp-menu-closed"}
      >
        <div className="signUp-header">
          <h2>Sign Up</h2>
          <i
            onClick={() => setIsLoginMenuOpen(!isLogInMenuOpen)}
            className="fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <div>
          <div>
            <h5 className="login-labels">Email:</h5>
            <input className="login-input" for="email"></input>
          </div>
          <div>
            <h5 className="login-labels">Password:</h5>
            <input type="password" className="login-input"></input>
          </div>
          <div className="log-in-button-menu">
            <h5>Log In</h5>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <p>Don't have an account?</p>
            <div className="sign-up-login-button-menu">
              <h5>Create Account</h5>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={theme ? "Header-dark" : "Header-light"}>
        <h2>{props.text}</h2>
        <div className="log-in-button">
          <button
            onClick={() => setIsLoginMenuOpen(!isLogInMenuOpen)}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>

        {logInMenu()}
      </div>
      <div
        className={
          isLogInMenuOpen
            ? "darkned-background-active"
            : "darkned-background-off"
        }
      ></div>
    </div>
  );
}

export default Header;
