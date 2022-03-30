import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import "./login.css";

import {
  IconLogin,
  IconLogout,
  IconUserPlus,
  IconAlertTriangle,
} from "@tabler/icons";
import { toast } from "react-toastify";

const LogInMenu = () => {
  const dispatch = useDispatch();

  const isLogInMenuOpenReducer = useSelector(
    (state) => state.logInMenuOpenReducer
  );

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../../themes/${colors}`);

  const [emailLogIn, setEmailLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");
  const [name, setName] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);

  const logIn = () => {
    const user = {
      email: emailLogIn,
      password: passwordLogIn,
    };

    if (passwordLogIn === "" || emailLogIn === "") {
      toast.error("You need to provide an Email and a Password");
    } else {
      Axios.post("https://protypist.herokuapp.com/users/login", user)
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: "LOG_IN_OUT",
              payload: true,
            });
            dispatch({
              type: "SET_JWT",
              payload: response.data.token,
            });
            setIsSignUpMenuOpen(false);
            dispatch({
              type: "SET_OPEN_LOGIN_MENU",
              payload: false,
            });

            toast.info(
              "Glad to see you again " + response.data.user.name + ". Have fun!"
            );
          }
        })
        .catch((e) => {
          if ((e.response.status = 400)) {
            toast.error("Wrong Eomail or Passwrd");

            console.log(e.response);
          } else {
            toast.error("There is an error in the server, try again later.");
          }
        });
    }
  };

  const signUp = () => {
    const user = {
      name: name,
      password: passwordSignUp,
      email: emailSignUp,
    };

    if (emailSignUp === "" && name === "" && passwordSignUp === "") {
      toast.error("Enter your information before submiting.");
    } else if (emailSignUp === "") {
      toast.error("You need to provide a valid email.");
    } else if (name === "") {
      toast.error("You need to provide a name.");
    } else if (passwordSignUp === "") {
      toast.error("You need to provide a password, that's pretty important.");
    } else {
      Axios.post("https://protypist.herokuapp.com/users", user)
        .then((response) => {
          if (response.status === 201) {
            dispatch({
              type: "LOG_IN_OUT",
              payload: true,
            });
            dispatch({
              type: "SET_JWT",
              payload: response.data.token,
            });
            setIsSignUpMenuOpen(false);
            dispatch({
              type: "SET_OPEN_LOGIN_MENU",
              payload: false,
            });
          }

          toast.info(
            "Hey there " + response.data.user.name + ". Welcome to ProTypist!"
          );
        })
        .catch((e) => {
          if (e.response.data.code === 11000) {
            toast.error(
              "The Email you just entered is already rejistered, try loging in."
            );
          } else if (e.response.data.errors.email) {
            toast.error("You need to provide a valid email.");
          } else if (e.response.data.errors.password) {
            toast.error("Your password is too easy to guess. Try again.");
          }
        });
    }
  };

  const signUpMenuComponent = () => {
    return (
      <div
        className={isSignUpMenuOpen ? "signUp-menu-open" : "signUp-menu-closed"}
        style={{ backgroundColor: colorFiles.secondSecondaryBackgroundColor }}
      >
        <div className="signUp-header">
          <h2>Welcome!</h2>
          <i
            onClick={() => setIsSignUpMenuOpen(false)}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <p style={{ textAlign: "left", marginLeft: "1rem" }}>
          Let's create you an account
        </p>
        <br></br>
        <div>
          <form>
            <div>
              <h5 className="login-labels">Name:</h5>
              <input
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="login-input"
                style={{
                  backgroundColor: colorFiles.secondaryBackgroundColor,
                  color: colorFiles.fontColor,
                }}
                placeholder="Eg: Robert Junior"
              ></input>
            </div>
            <div>
              <h5 className="login-labels">Email:</h5>
              <input
                onChange={(e) => {
                  setEmailSignUp(e.target.value);
                }}
                className="login-input"
                style={{
                  backgroundColor: colorFiles.secondaryBackgroundColor,
                  color: colorFiles.fontColor,
                }}
                placeholder="robertjr@example.mail"
              ></input>
            </div>
            <div>
              <h5 className="login-labels">Password:</h5>
              <input
                onChange={(e) => {
                  setPasswordSignUp(e.target.value);
                }}
                type="password"
                className="login-input"
                style={{
                  backgroundColor: colorFiles.secondaryBackgroundColor,
                  color: colorFiles.fontColor,
                }}
                placeholder="**********"
              ></input>
            </div>
          </form>
          {/* <div className="mt-3 select-country-button">
            <CountrySelector
              isOpen={isCountrySelectorOpen}
              closeMenu={handleOpeningCountryMenu}
            />
            {getCurrentCountry()}
          </div> */}
          <div
            onClick={() => {
              signUp();
            }}
            className="log-in-button-menu mt-4"
            style={{
              display: "flex",
              backgroundColor: colorFiles.primaryColor,
              color: "white",
            }}
          >
            <IconUserPlus style={{ marginRight: "50px" }} />

            <h5>Create Account</h5>
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            className="d-flex justify-content-center"
          >
            <h5
              onClick={() => {
                setIsSignUpMenuOpen(false);
                dispatch({
                  type: "SET_OPEN_LOGIN_MENU",
                  payload: true,
                });
              }}
              style={{
                width: "6rem",
                marginTop: "10px",
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className="linkURL"
            >
              Log In
            </h5>
          </div>
        </div>
      </div>
    );
  };

  const loginMenuComponent = () => {
    return (
      <div
        className={
          isLogInMenuOpenReducer ? "login-menu-open" : "login-menu-closed"
        }
        style={{ backgroundColor: colorFiles.secondSecondaryBackgroundColor }}
      >
        <div className="log-in-header">
          <h2>Log in</h2>
          <i
            onClick={() => {
              dispatch({
                type: "SET_OPEN_LOGIN_MENU",
                payload: false,
              });
            }}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <br></br>
        <div>
          <form>
            <div>
              <h5 className="login-labels">Email:</h5>
              <input
                autoComplete="off"
                onChange={(e) => {
                  setEmailLogIn(e.target.value);
                }}
                className="login-input"
                style={{
                  backgroundColor: colorFiles.secondaryBackgroundColor,
                  color: colorFiles.fontColor,
                }}
                placeholder="robertjr@example.mail"
              ></input>
            </div>
            <div>
              <h5 className="login-labels">Password:</h5>
              <input
                autoComplete="off"
                type="password"
                onChange={(e) => {
                  setPasswordLogIn(e.target.value);
                }}
                className="login-input"
                style={{
                  backgroundColor: colorFiles.secondaryBackgroundColor,
                  color: colorFiles.fontColor,
                }}
                placeholder="********"
              ></input>
            </div>
          </form>

          <div
            onClick={() => {
              logIn();
            }}
            className="log-in-button-menu"
            style={{
              display: "flex",
              backgroundColor: colorFiles.primaryColor,
              color: "white",
            }}
          >
            <IconLogin style={{ marginRight: "90px" }} />
            <h5>Log In</h5>
          </div>
          <div style={{ marginTop: "3rem" }}>
            <p>Don't have an account?</p>
            <div
              onClick={() => {
                dispatch({
                  type: "SET_OPEN_LOGIN_MENU",
                  payload: false,
                });
                setIsSignUpMenuOpen(true);
              }}
              className="sign-up-login-button-menu"
              style={{
                display: "flex",
                justifyContent: "left",
                backgroundColor: colorFiles.secondaryBackgroundColor,
              }}
            >
              <IconUserPlus style={{ marginRight: "45px" }} />
              <h5>Create one now!</h5>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        onClick={() => {
          setIsSignUpMenuOpen(false);
        }}
        className={
          isSignUpMenuOpen // isSubmitQuoteMenuOpen
            ? "darkened-background-header-on"
            : "darkened-background-header-off"
        }
      ></div>
      {loginMenuComponent()}
      {signUpMenuComponent()}
    </>
  );
};

export default LogInMenu;
