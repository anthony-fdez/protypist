import React, { useState, useEffect } from "react";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Header(props) {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const latestWPM = useSelector((state) => state.latestWPMReducerTypingGame);
  const latestWPM200 = useSelector((state) => state.latestWPMReducer200);
  const latestWPM1000 = useSelector((state) => state.latestWPMReducer1000);

  const [isLogInMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);
  const [isLogOutMenuOpen, setIsLogOutMenuOpen] = useState(false);

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
        .get("https://protypist.herokuapp.com/users/me/name", {
          headers: headers,
        })
        .then((response) => {
          setUserName(response.data);
        })
        .catch((e) => {
          setUserName("Guest");
        });
    }
  }, [jwt]);

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
  }, [latestWPM, latestWPM200, latestWPM1000]);

  const selectSkillLevel = () => {
    if (wpmAverage < 20) {
      return `Beginer: ${wpmAverage}wpm`;
    } else if (wpmAverage < 40) {
      return `Intermidiate: ${wpmAverage}wpm`;
    } else if (wpmAverage < 60) {
      return `Average: ${wpmAverage}wpm`;
    } else if (wpmAverage < 80) {
      return `Pro: ${wpmAverage}wpm`;
    } else if (wpmAverage < 100) {
      return `Master: ${wpmAverage}wpm`;
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
            setIsLoginMenuOpen(false);

            setMessage("You are logged in! Have fun.");
            setIsSuccssWarningShown(true);
          }
        })
        .catch((e) => {
          if ((e.response.status = 400)) {
            setMessage("Wrong Email or Password");
            setIsErrorWarningShown(true);
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
            setIsLoginMenuOpen(false);
          }
          setMessage("Your account has been successfuly created.");
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
        setIsLoginMenuOpen(false);
        setIsLogOutMenuOpen(false);

        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });

        dispatch({
          type: "SET_JWT",
          payload: null,
        });
        setMessage("Logged out successfully.");
        setIsSuccssWarningShown(true);
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
        setIsLoginMenuOpen(false);
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
          <form>
            <div>
              <h5 className="login-labels">Email:</h5>
              <input
                autoComplete="off"
                onChange={(e) => {
                  getTheEmailLogin(e);
                }}
                className="login-input"
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
              ></input>
            </div>
          </form>

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
              ></input>
            </div>
            <div>
              <h5 className="login-labels">Email:</h5>
              <input
                onChange={(e) => {
                  getTheEmailSignup(e);
                }}
                className="login-input"
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
              ></input>
            </div>
          </form>
          <div
            onClick={() => {
              signUp();
            }}
            className="log-in-button-menu mt-5"
          >
            <h5>Create Account</h5>
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="d-flex justify-content-center"
          >
            <h5
              onClick={() => {
                setIsSignUpMenuOpen(false);
                setIsLoginMenuOpen(true);
              }}
              style={{ width: "6rem", marginTop: "10px" }}
              className={theme ? "linkURL" : "linkURLlight"}
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
          style={{ marginTop: "2rem" }}
          className={theme ? "white-hr mt-2" : "dark-hr mt-1"}
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
        ></input>
        <div
          onClick={() => {
            logOutAll();
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

  // const skillLevelMenu = () => {
  //   return (
  //     <div
  //       className={theme ? "skill-level-menu-dark" : "skill-level-menu-light"}
  //     >
  //       <h4>0 - 20 --- Beginer</h4>
  //     </div>
  //   );
  // };

  return (
    <div>
      {errorWarning()}
      {successWarning()}
      <div className={theme ? "Header-dark" : "Header-light"}>
        <h2 className="user-name">{userName}</h2>
        <h2>{props.text}</h2>
        {/* <div className="skill-level">
          <h5>{selectSkillLevel()}</h5>
        </div> */}

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
