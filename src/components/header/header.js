import React, { useState, useEffect } from "react";
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
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (jwt === null) {
      dispatch({
        type: "LOG_IN_OUT",
        payload: false,
      });
    }
  }, [jwt]);

  const getTheEmail = (e) => {
    setEmail(e.target.value);
  };
  const getTheName = (e) => {
    setName(e.target.value);
  };
  const getThePassword = (e) => {
    setPassword(e.target.value);
  };

  const clearInput = (e) => {
    e.target.value = "";
  };

  //check if the token is still valid

  useEffect(() => {
    const headers = { Authorization: jwt };
    const bodyParameters = { key: "value" };

    axios
      .post("http://localhost:5000/checkIfLoggedIn", bodyParameters, {
        headers: headers,
      })
      .then((response) => {
        //nothing happens. All good
      })
      .catch((e) => {
        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });
        dispatch({
          type: "SET_JWT",
          payload: null,
        });
      });
  }, []);

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
          dispatch({
            type: "SET_JWT",
            payload: response.data.token,
          });
          setIsSignUpMenuOpen(false);
          setIsLoginMenuOpen(false);
        }
      })
      .catch((e) => {
        alert("Wrong Email or Password");
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
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const logOut = () => {
    const headers = { Authorization: jwt };
    const bodyParameters = { key: "value" };

    axios
      .post("http://localhost:5000/users/logout", bodyParameters, {
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
          <form>
            <div>
              <h5 className="login-labels">Email:</h5>
              <input
                autocomplete="off"
                onChange={(e) => {
                  getTheEmail(e);
                }}
                className="login-input"
              ></input>
            </div>
            <div>
              <h5 className="login-labels">Password:</h5>
              <input
                autocomplete="off"
                onChange={(e) => {
                  if (clear) {
                    clearInput(e);
                  } else getThePassword(e);
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
            onMouseDown={() => {
              setClear(true);
            }}
            onMouseUp={() => {
              setClear(false);
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
                autocomplete="off"
                onChange={(e) => {
                  getTheName(e);
                }}
                className="login-input"
              ></input>
            </div>
            <div>
              <h5 className="login-labels">Email:</h5>
              <input
                autocomplete="off"
                onChange={(e) => {
                  getTheEmail(e);
                }}
                className="login-input"
              ></input>
            </div>
            <div>
              <h5 className="login-labels">Password:</h5>
              <input
                autocomplete="off"
                onChange={(e) => {
                  getThePassword(e);
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
          autocomplete="off"
          type="password"
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
