import React, { useState } from "react";
import "./logout.css";

import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";

import { IconLogout } from "@tabler/icons";

const Logout = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.JWTreducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../../themes/${colors}`);

  const [passwordLogOut, setPasswordLogOut] = useState("");

  const logOut = () => {
    const headers = { Authorization: jwt };
    const bodyParameters = { key: "value" };

    Axios.post("https://protypist.herokuapp.com/users/logout", bodyParameters, {
      headers: headers,
    })
      .then(() => {
        dispatch({
          type: "SET_OPEN_LOGIN_MENU",
          payload: false,
        });
        handleClose();

        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });

        dispatch({
          type: "SET_JWT",
          payload: null,
        });

        toast.info("Logged out, hope to see you again soon :)");

        localStorage.clear();
      })
      .catch((e) => {
        toast.error(
          "Failed to log out, something bad happened in the server probably."
        );

        console.log(e.response);
      });
  };

  const logOutAll = () => {
    const headers = { Authorization: jwt };
    const data = { password: passwordLogOut };

    Axios.post("https://protypist.herokuapp.com/users/logoutall", data, {
      headers: headers,
    })
      .then(() => {
        dispatch({
          type: "SET_OPEN_LOGIN_MENU",
          payload: false,
        });
        handleClose();

        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });

        dispatch({
          type: "SET_JWT",
          payload: null,
        });

        toast.info("Logged out successfuly");
      })
      .catch((e) => {
        toast.error("Wrong password, Try again.");
      });
  };

  const logOutMenu = () => {
    return (
      <div
        className={isOpen ? "log-out-menu-open" : "log-out-menu-closed"}
        style={{ backgroundColor: colorFiles.secondSecondaryBackgroundColor }}
      >
        <div className="log-in-header">
          <h2>Log Out</h2>
          <i
            onClick={() => handleClose()}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
        </div>
        <h5 className="text-left mt-3 ml-3">Are you sure?</h5>
        <div className="d-flex justify-content-between">
          <Button
            variant="contained"
            style={{
              color: colorFiles.fontColor,
              backgroundColor: colorFiles.backgroundColor,
            }}
            onClick={() => handleClose()}
            className="log-out-buttons ml-3"
          >
            No
          </Button>
          <Button
            style={{
              color: "white",
            }}
            variant="contained"
            onClick={() => logOut()}
            className="log-out-buttons bg-danger mr-3"
          >
            Yes
          </Button>
        </div>

        <h5 className="text-left mt-3 ml-3">Log out in all devices</h5>
        <input
          autoComplete="off"
          type="password"
          className="login-input mt-2"
          placeholder="Your current password"
          onChange={(e) => {
            setPasswordLogOut(e.target.value);
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
          style={{ color: "white", display: "flex" }}
          className="log-out-all-button-menu bg-danger"
        >
          <IconLogout style={{ marginRight: "70px" }} />
          <h5>Log Out All</h5>
        </div>
      </div>
    );
  };

  return <>{logOutMenu()}</>;
};
export default Logout;
