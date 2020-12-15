import React, { useState, useEffect } from "react";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Header(props) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const latestWPM = useSelector((state) => state.latestWPMReducerTypingGame);
  const latestWPM200 = useSelector((state) => state.latestWPMReducer200);
  const latestWPM1000 = useSelector((state) => state.latestWPMReducer1000);
  const isLogInMenuOpenReducer = useSelector(
    (state) => state.logInMenuOpenReducer
  );

  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);
  const [isLogOutMenuOpen, setIsLogOutMenuOpen] = useState(false);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  //==================================================================
  const [name, setName] = useState("");
  const [emailLogIn, setEmailLogIn] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [passwordLogOut, setPasswordLogOut] = useState("");
  const [clear, setClear] = useState(false);

  const [isErrorWarningShown, setIsErrorWarningShown] = useState(false);
  const [isSuccessWarningShown, setIsSuccssWarningShown] = useState(false);
  const [isSkillLevelMenuShown, setIsSkillMenuShown] = useState(false);

  const [message, setMessage] = useState("");

  //user Info
  const [userName, setUserName] = useState("Guest");
  const [wpmAverage, setWpmAverage] = useState();

  useEffect(() => {
    if (jwt === null) {
      dispatch({
        type: "LOG_IN_OUT",
        payload: false,
      });
    }
  }, [jwt]);

  const getTheEmailLogin = (e) => {
    setEmailLogIn(e.target.value);
  };
  const getTheEmailSignup = (e) => {
    setEmailSignUp(e.target.value);
  };
  const getTheName = (e) => {
    setName(e.target.value);
  };
  const getThePasswordLogin = (e) => {
    setPasswordLogIn(e.target.value);
  };
  const getThePasswordSignup = (e) => {
    setPasswordSignUp(e.target.value);
  };
  const getThePasswordLogout = (e) => {
    setPasswordLogOut(e.target.value);
  };

  const clearInput = (e) => {
    e.target.value = "";
  };

  //check if the token is still valid

  useEffect(() => {
    const headers = { Authorization: jwt };
    const bodyParameters = { key: "value" };

    axios
      .post("https://protypist.herokuapp.com/checkIfLoggedIn", bodyParameters, {
        headers: headers,
      })
      .then((response) => {
        dispatch({
          type: "LOG_IN_OUT",
          payload: true,
        });
      })
      .catch((e) => {
        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/me", {
          headers: headers,
        })
        .then((response) => {
          setUserName(response.data.name);
          dispatch({
            type: "SET_USER_NAME",
            payload: response.data.name,
          });
          dispatch({
            type: "SET_USER_ID",
            payload: response.data._id,
          });
        })
        .catch((e) => {
          setUserName("Guest");
        });
    } else {
      dispatch({
        type: "SET_USER_NAME",
        payload: "Guest",
      });
      setUserName("Guest");
    }
  }, [jwt, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/overallStatistics", {
          headers: headers,
        })
        .then((response) => {
          if (response.data.overAllRaces < 10) {
            setWpmAverage(response.data.overAllAverageWpm);
          } else {
            setWpmAverage(response.data.overAllAverageWpm10races);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [jwt, latestWPM, latestWPM200, latestWPM1000]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/getKeysTyped", {
          headers: headers,
        })
        .then((response) => {
          dispatch({
            type: "SET_KEYS_PRESSED",
            payload: {
              a: response.data.a,
              b: response.data.b,
              c: response.data.c,
              d: response.data.d,
              e: response.data.e,
              f: response.data.f,
              g: response.data.g,
              h: response.data.h,
              i: response.data.i,
              j: response.data.j,
              k: response.data.k,
              l: response.data.l,
              m: response.data.m,
              n: response.data.n,
              o: response.data.o,
              p: response.data.p,
              q: response.data.q,
              r: response.data.r,
              s: response.data.s,
              t: response.data.t,
              u: response.data.u,
              v: response.data.v,
              w: response.data.w,
              x: response.data.x,
              y: response.data.y,
              z: response.data.z,
              ONE: response.data.ONE,
              TWO: response.data.TWO,
              THREE: response.data.THREE,
              FOUR: response.data.FOUR,
              FIVE: response.data.FIVE,
              SIX: response.data.SIX,
              SEVEN: response.data.SEVEN,
              EIGHT: response.data.EIGHT,
              NINE: response.data.NINE,
              ZERO: response.data.ZERO,
              Space: response.data.Space,
              Shift: response.data.Shift,
              Comma: response.data.Comma,
              Dot: response.data.Dot,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [jwt, isLoggedIn]);

  const selectSkillLevel = () => {
    if (wpmAverage !== undefined) {
      if (wpmAverage <= 20) {
        return `Beginer: ${Math.round(wpmAverage * 100) / 100}wpm`;
      } else if (wpmAverage <= 40) {
        return `Average: ${Math.round(wpmAverage * 100) / 100}wpm`;
      } else if (wpmAverage <= 60) {
        return `Intermidiate: ${Math.round(wpmAverage * 100) / 100}wpm`;
      } else if (wpmAverage <= 80) {
        return `Pro: ${Math.round(wpmAverage * 100) / 100}wpm`;
      } else {
        return `Master: ${Math.round(wpmAverage * 100) / 100}wpm`;
      }
    }
  };

  //hide the warning after 3 seconds
  useEffect(() => {
    let myTimeout;
    if (isErrorWarningShown || isSuccessWarningShown) {
      myTimeout = setTimeout(() => {
        setIsErrorWarningShown(false);
        setIsSuccssWarningShown(false);
      }, 3000);
    }
    return () => clearTimeout(myTimeout);
  }, [isErrorWarningShown, isSuccessWarningShown]);

  const logIn = () => {
    const user = {
      email: emailLogIn,
      password: passwordLogIn,
    };

    if (passwordLogIn === "" || emailLogIn === "") {
      setMessage("You need to provide an Email and a Password");
      setIsErrorWarningShown(true);
    } else {
      axios
        .post("https://protypist.herokuapp.com/users/login", user)
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

            setMessage(
              "Glad to see you again " + response.data.user.name + ". Have fun!"
            );
            setIsSuccssWarningShown(true);
          }
        })
        .catch((e) => {
          if ((e.response.status = 400)) {
            setMessage("Wrong Email or Password");
            setIsErrorWarningShown(true);
            console.log(e.response);
          } else {
            setMessage("There is an error in the server, try again later.");
            setIsErrorWarningShown(true);
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
      setMessage("Enter your information before submiting.");
      setIsErrorWarningShown(true);
    } else if (emailSignUp === "") {
      setMessage("You need to provide a valid email.");
      setIsErrorWarningShown(true);
    } else if (name === "") {
      setMessage("You need to provide a name.");
      setIsErrorWarningShown(true);
    } else if (passwordSignUp === "") {
      setMessage("You need to provide a password, that's pretty important.");
      setIsErrorWarningShown(true);
    } else {
      axios
        .post("https://protypist.herokuapp.com/users", user)
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
          setMessage(
            "Hey there " + response.data.user.name + ". Welcome to ProTypist!"
          );
          setIsSuccssWarningShown(true);
        })
        .catch((e) => {
          if (e.response.data.code === 11000) {
            setMessage(
              "The Email you just entered is already rejistered, try loging in."
            );
            setIsErrorWarningShown(true);
          } else if (e.response.data.errors.email) {
            setMessage("You need to provide a valid email.");
            setIsErrorWarningShown(true);
          } else if (e.response.data.errors.password) {
            setMessage("Your password is too easy to guess. Try again.");
            setIsErrorWarningShown(true);
          }
        });
    }
  };

  const logOut = () => {
    const headers = { Authorization: jwt };
    const bodyParameters = { key: "value" };

    axios
      .post("https://protypist.herokuapp.com/users/logout", bodyParameters, {
        headers: headers,
      })
      .then(() => {
        setIsSignUpMenuOpen(false);
        dispatch({
          type: "SET_OPEN_LOGIN_MENU",
          payload: false,
        });
        setIsLogOutMenuOpen(false);

        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });

        dispatch({
          type: "SET_JWT",
          payload: null,
        });
        setMessage("Logged out, hope to see you again soon :)");
        setIsSuccssWarningShown(true);
        localStorage.clear();
      })
      .catch((e) => {
        setMessage(
          "Failed to log out, something bad happened in the server probably."
        );
        setIsErrorWarningShown(true);
        console.log(e.response);
      });
  };

  const logOutAll = () => {
    const headers = { Authorization: jwt };
    const data = { password: passwordLogOut };

    axios
      .post("https://protypist.herokuapp.com/users/logoutall", data, {
        headers: headers,
      })
      .then(() => {
        setIsSignUpMenuOpen(false);
        dispatch({
          type: "SET_OPEN_LOGIN_MENU",
          payload: false,
        });
        setIsLogOutMenuOpen(false);

        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });

        dispatch({
          type: "SET_JWT",
          payload: null,
        });
        setMessage("Logged out successfuly");
        setIsSuccssWarningShown(true);
      })
      .catch((e) => {
        setMessage("Wrong password, Try again.");
        setIsErrorWarningShown(true);
      });
  };

  const logInMenu = () => {
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
        <hr
          style={{ marginTop: "2rem", backgroundColor: colorFiles.hrColor }}
        ></hr>
        <div>
          <form>
            <div>
              <h5 className="login-labels">Email:</h5>
              <input
                autoComplete="off"
                onChange={(e) => {
                  getTheEmailLogin(e);
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
                onChange={(e) => {
                  if (clear) {
                    clearInput(e);
                  } else getThePasswordLogin(e);
                }}
                type="password"
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
              backgroundColor: colorFiles.primaryColor,
              color: "black",
            }}
          >
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
                backgroundColor: colorFiles.secondaryBackgroundColor,
              }}
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
        <hr
          style={{ marginTop: "1rem", backgroundColor: colorFiles.hrColor }}
        ></hr>
        <div>
          <form>
            <div>
              <h5 className="login-labels">Name:</h5>
              <input
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  getTheName(e);
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
                  getTheEmailSignup(e);
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
                  getThePasswordSignup(e);
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
          <div
            onClick={() => {
              signUp();
            }}
            className="log-in-button-menu mt-5"
            style={{
              backgroundColor: colorFiles.primaryColor,
              color: colorFiles.fontColor,
            }}
          >
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

  const logOutMenu = () => {
    return (
      <div
        className={
          isLogOutMenuOpen ? "log-out-menu-open" : "log-out-menu-closed"
        }
        style={{ backgroundColor: colorFiles.secondSecondaryBackgroundColor }}
      >
        <div className="log-in-header">
          <h2>Log Out</h2>
          <i
            onClick={() => setIsLogOutMenuOpen(false)}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <hr
          style={{ marginTop: "10px", backgroundColor: colorFiles.hrColor }}
        ></hr>
        <h5 className="text-left mt-3 ml-3">Are you sure?</h5>
        <div className="d-flex justify-content-between">
          <button
            onClick={() => setIsLogOutMenuOpen(false)}
            className="log-out-buttons btn btn-light"
          >
            No
          </button>
          <button
            onClick={() => logOut()}
            className="log-out-buttons btn btn-danger"
          >
            Yes
          </button>
        </div>
        <hr
          style={{ marginTop: "10px", backgroundColor: colorFiles.hrColor }}
        ></hr>
        <h5 className="text-left mt-3 ml-3">Log out in all devices</h5>
        <input
          autoComplete="off"
          type="password"
          className="login-input mt-2"
          placeholder="Your current password"
          onChange={(e) => {
            getThePasswordLogout(e);
          }}
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
        ></input>
        <div
          onClick={() => {
            logOutAll();
          }}
          style={{ color: "white" }}
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
          onClick={() => {
            dispatch({
              type: "SET_OPEN_LOGIN_MENU",
              payload: true,
            });
          }}
          className="btn btn-light"
          style={{
            backgroundColor: colorFiles.primaryColor,
            color: colorFiles.contrastFontColor,
            border: "none",
          }}
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
        <button
          style={{
            backgroundColor: colorFiles.primaryColor,
            color: colorFiles.contrastFontColor,
            border: "none",
          }}
          className="btn btn-light"
        >
          Logout
        </button>
      </div>
    );
  };

  const successWarning = () => {
    return (
      <div
        className={
          isSuccessWarningShown
            ? "success-warning-shown bg-primary"
            : "success-warning-hidden bg-primary"
        }
      >
        <h5>{message}</h5>
      </div>
    );
  };

  const errorWarning = () => {
    return (
      <div
        className={
          isErrorWarningShown
            ? "error-warning-shown bg-danger"
            : "error-warning-hidden bg-danger"
        }
      >
        <h4 style={{ marginRight: "10px" }}>
          <strong>Error: </strong>
        </h4>
        <h5>{message}</h5>
      </div>
    );
  };

  const skillLevelMenu = () => {
    return (
      <div
        className={
          isSkillLevelMenuShown
            ? "skill-level-menu-shown"
            : "skill-level-menu-hidden"
        }
        style={{
          backgroundColor: colorFiles.secondSecondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
      >
        <h4>Skill Level</h4>
        <hr style={{ marginTop: "2rem" }} className="white-hr mt-2"></hr>
        <h5 className="mt-2">00 - 20 -{">"} Beginer</h5>
        <h5 className="mt-2">21 - 40 -{">"} Average</h5>
        <h5 className="mt-2">41 - 60 -{">"} Intermidiate</h5>
        <h5 className="mt-2">61 - 80 -{">"} Pro</h5>
        <h5 className="mt-2">81 - up -{">"} Master</h5>
      </div>
    );
  };

  return (
    <div>
      {errorWarning()}
      {successWarning()}
      <div
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
        className={"Header"}
      >
        <h2 className="user-name">{userName}</h2>
        <h2>{props.text}</h2>
        <div
          onClick={() => {
            dispatch({
              type: "SET_OPEN_LOGIN_MENU",
              payload: false,
            });
            setIsSignUpMenuOpen(false);
            setIsLogOutMenuOpen(false);
          }}
          className={
            isLogOutMenuOpen || isSignUpMenuOpen || isLogInMenuOpenReducer // isSubmitQuoteMenuOpen
              ? "darkened-background-header-on"
              : "darkened-background-header-off"
          }
        ></div>
        <div
          className={
            isSkillLevelMenuShown ? "skill-level-shown" : "skill-level-hidden"
          }
          style={{
            color: colorFiles.fontColor,
          }}
        >
          <h5
            onMouseOver={() => {
              setIsSkillMenuShown(true);
            }}
            onMouseLeave={() => {
              setIsSkillMenuShown(false);
            }}
          >
            {selectSkillLevel()}
          </h5>
          {skillLevelMenu()}
        </div>

        {isLoggedIn ? logOutButton() : logInButton()}
        {logInMenu()}
        {signUpMenu()}
        {logOutMenu()}
      </div>
      <div
        className={
          isLogInMenuOpenReducer || isSignUpMenuOpen || isLogOutMenuOpen
            ? "darkned-background-active"
            : "darkned-background-off"
        }
      ></div>
    </div>
  );
}

export default Header;
