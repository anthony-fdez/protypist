import React, { useState } from "react";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Header(props) {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  const [isLogInMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);
  const [isLogOutMenuOpen, setIsLogOutMenuOpen] = useState(false);

  //==================================================================
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmationPassword, setConfirmationPassword] = useState(null);

  const getTheEmail = (e) => {
    setEmail(e.target.value);
  };
  const getTheName = (e) => {
    setName(e.target.value);
  };
  const getThePassword = (e) => {
    setPassword(e.target.value);
  };
  const getTheConfirmationPassword = (e) => {
    setConfirmationPassword(e.target.value);
  };

  const logIn = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/users/login", user)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "LOG_IN_OUT",
            payload: true,
          });
          setIsSignUpMenuOpen(false);
          setIsLoginMenuOpen(false);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const signUp = () => {
    const user = {
      name: name,
      password: password,
      email: email,
    };

    axios
      .post("http://localhost:5000/users", user)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const logInMenu = () => {
    return (
      <div
        className={isLogInMenuOpen ? "login-menu-open" : "login-menu-closed"}
      >
        <div className="log-in-header">
          <h2>Log in</h2>
          <i
            onClick={() => setIsLoginMenuOpen(!isLogInMenuOpen)}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <div>
          <div>
            <h5 className="login-labels">Email:</h5>
            <input
              onChange={(e) => {
                getTheEmail(e);
              }}
              className="login-input"
              for="email"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Password:</h5>
            <input
              onChange={(e) => {
                getThePassword(e);
              }}
              type="password"
              className="login-input"
            ></input>
          </div>
          <div
            onClick={() => {
              logIn();
            }}
            className="log-in-button-menu"
          >
            <h5>Log In</h5>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <p>Don't have an account?</p>
            <div
              onClick={() => {
                setIsLoginMenuOpen(false);
                setIsSignUpMenuOpen(true);
              }}
              className="sign-up-login-button-menu"
            >
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
            onClick={() => setIsSignUpMenuOpen(false)}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <div>
          <div>
            <h5 className="login-labels">Name:</h5>
            <input
              onChange={(e) => {
                getTheName(e);
              }}
              className="login-input"
              for="name"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Email:</h5>
            <input
              onChange={(e) => {
                getTheEmail(e);
              }}
              className="login-input"
              for="email"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Password:</h5>
            <input
              onChange={(e) => {
                getThePassword(e);
              }}
              type="password"
              className="login-input"
            ></input>
          </div>
          <div>
            <h5 className="login-labels">Reenter password:</h5>
            <input
              onChange={(e) => {
                getTheConfirmationPassword(e);
              }}
              type="password"
              className="login-input"
            ></input>
          </div>
          <div
            onClick={() => {
              signUp();
            }}
            className="log-in-button-menu"
          >
            <h5>Create Account</h5>
          </div>
        </div>
      </div>
    );
  };

  const logOutMenu = () => {
    return (
      <div
        className={
          isLogOutMenuOpen ? "log-out-menu-open" : "log-out-menu-closed"
        }
      >
        <div className="log-in-header">
          <h2>Log Out</h2>
          <i
            onClick={() => setIsLogOutMenuOpen(false)}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <h5 className="text-left mt-3 ml-3">Are you sure?</h5>
        <div className="d-flex justify-content-between">
          <button className="log-out-buttons btn btn-light">No</button>
          <button className="log-out-buttons btn btn-danger">Yes</button>
        </div>
        <hr
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
        ></hr>
        <h5 className="text-left mt-3 ml-3">Log out in all devices</h5>
        <input
          className="login-input mt-2"
          placeholder="Your current password"
        ></input>
        <div
          onClick={() => {
            signUp();
          }}
          className="log-out-all-button-menu bg-danger"
        >
          <h5>Log Out All</h5>
        </div>
      </div>
    );
  };

  const logInButton = () => {
    return (
      <div className="log-in-button">
        <button
          onClick={() => setIsLoginMenuOpen(!isLogInMenuOpen)}
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    );
  };

  const logOutButton = () => {
    return (
      <div
        onClick={() => {
          setIsLogOutMenuOpen(true);
        }}
        className="log-in-button"
      >
        <button className="btn btn-primary">Logout</button>
      </div>
    );
  };

  return (
    <div>
      <div className={theme ? "Header-dark" : "Header-light"}>
        <h2>{props.text}</h2>
        {isLoggedIn ? logOutButton() : logInButton()}
        {logInMenu()}
        {signUpMenu()}
        {logOutMenu()}
      </div>
      <div
        className={
          isLogInMenuOpen || isSignUpMenuOpen || isLogOutMenuOpen
            ? "darkned-background-active"
            : "darkned-background-off"
        }
      ></div>
    </div>
  );
}

export default Header;
