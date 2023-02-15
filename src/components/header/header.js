import React, { useState, useEffect } from "react";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";

import axios from "axios";

import { IconLogin, IconLogout } from "@tabler/icons";
import { selectSkillLevel } from "./helpers/selectSkillLevel";

// Components
import LogInMenu from "./login/login";
import Logout from "./logout/logout";

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

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const [isSkillLevelMenuShown, setIsSkillMenuShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogOutMenuOpen, setIsLogOutMenuOpen] = useState(false);

  //user Info
  const [userName, setUserName] = useState("Guest");
  const [wpmAverage, setWpmAverage] = useState();

  const isTyping = useSelector((state) => state.isTypingReducer);
  const isFocusMode = useSelector((state) => state.isFocusModeReducer);

  useEffect(() => {
    if (jwt === null) {
      dispatch({
        type: "LOG_IN_OUT",
        payload: false,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  //check if the token is still valid

  useEffect(() => {
    const headers = { Authorization: jwt };
    const bodyParameters = { key: "value" };

    axios
      .post("https://protypist.onrender.com/checkIfLoggedIn", bodyParameters, {
        headers: headers,
      })
      .then((response) => {
        dispatch({
          type: "LOG_IN_OUT",
          payload: true,
        });
        setIsLoading(false);
      })
      .catch((e) => {
        dispatch({
          type: "LOG_IN_OUT",
          payload: false,
        });
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.onrender.com/users/me", {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.onrender.com/users/overallStatistics", {
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
  }, [jwt, latestWPM, latestWPM200, latestWPM1000, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.onrender.com/users/getKeysTyped", {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, isLoggedIn]);

  const logInButton = () => {
    return (
      <div className="log-in-button">
        <Button
          variant="contained"
          style={{
            display: "flex",
            backgroundColor: colorFiles.primaryColor,
            color: "white",
          }}
          onClick={() => {
            dispatch({
              type: "SET_OPEN_LOGIN_MENU",
              payload: true,
            });
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconLogin />
            Login
          </div>
        </Button>
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
        <Button
          variant="contained"
          style={{
            display: "flex",
            backgroundColor: colorFiles.primaryColor,
            color: colorFiles.contrastFontColor,
            border: "none",
          }}
          className="btn btn-light"
        >
          <IconLogout />
          Logout
        </Button>
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
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
      >
        <h4>Skill Level</h4>
        <h5 className="mt-2">00 - 20 -{">"} Beginer</h5>
        <h5 className="mt-2">21 - 40 -{">"} Average</h5>
        <h5 className="mt-2">41 - 60 -{">"} Intermidiate</h5>
        <h5 className="mt-2">61 - 80 -{">"} Pro</h5>
        <h5 className="mt-2">81 - up -{">"} Master</h5>
      </div>
    );
  };

  const handleCloseLogoutMenu = () => {
    setIsLogOutMenuOpen(false);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
        }}
        className={isTyping && isFocusMode ? "Header-hidden" : "Header"}
      >
        <LogInMenu />
        <Logout handleClose={handleCloseLogoutMenu} isOpen={isLogOutMenuOpen} />
        <h2 className="user-name">
          {!isLoading ? userName : <CircularProgress />}
        </h2>

        <h2>{props.text}</h2>
        <div
          onClick={() => {
            dispatch({
              type: "SET_OPEN_LOGIN_MENU",
              payload: false,
            });
          }}
          className={
            isLogOutMenuOpen || isLogInMenuOpenReducer // isSubmitQuoteMenuOpen
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
            {selectSkillLevel({ wpmAverage })}
          </h5>
          {skillLevelMenu()}
        </div>

        {isLoggedIn ? logOutButton() : logInButton()}
      </div>
      <div
        className={
          isLogInMenuOpenReducer || isLogOutMenuOpen
            ? "darkned-background-active"
            : "darkned-background-off"
        }
      ></div>
    </div>
  );
}

export default Header;
