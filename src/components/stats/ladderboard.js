import React from "react";
import "./ladderboard.css";
import "./otherPersonProfile.css";
import "./stats.css";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import UserProfile from "./components/userProfile/userProfile";
import formatTheTime from "../functions/formatTime";

function Ladderboard(props) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const userId = useSelector((state) => state.userIdReducer);

  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("highest");
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [otherUserData, setOtherUserData] = useState(undefined);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);
      axios
        .get("https://protypist.onrender.com/users/ladderboard/highest", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [jwt]);

  const sortByWpm = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);
      axios
        .get("https://protypist.onrender.com/users/ladderboard/wpm", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByHighest = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.onrender.com/users/ladderboard/highest", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByRaces = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.onrender.com/users/ladderboard/races", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByTime = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.onrender.com/users/ladderboard/time", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const getTheOtherUserData = (DATA) => {
    const headers = { Authorization: jwt };
    const data = {
      _id: DATA,
    };

    axios
      .post("https://protypist.onrender.com/users/getOtherUserData", data, {
        headers: headers,
      })
      .then((response) => {
        setOtherUserData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCloseUserProfile = () => {
    setUserProfileOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: colorFiles.secondaryBackgroundColor,
        color: colorFiles.fontColor,
      }}
      className={props.isShown ? "Ladderboard-shown" : "Ladderboard-hidden"}
    >
      {userProfileOpen && (
        <UserProfile
          isOpen={userProfileOpen}
          handleClose={handleCloseUserProfile}
          otherUserData={otherUserData}
        />
      )}
      <div
        onClick={() => setUserProfileOpen(!userProfileOpen)}
        className={userProfileOpen ? "dark-background-leaderboard" : ""}
      ></div>
      <div>
        <div className="ladderboard-header">
          <i className="fas fa-medal fa-2x mr-3"></i>
          <h2>Leaderboard</h2>
          {isLoading && (
            <div
              style={{
                color: colorFiles.fontColor,
              }}
              className={"loading-div-ladderboard"}
            >
              <div className="lds-ellipsis">
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
              </div>
            </div>
          )}
        </div>

        <br></br>
        <div className="select-sort-method">
          <h4 className="mr-5">Sort by:</h4>
          <Button
            variant="contained"
            onClick={() => {
              setSortBy("highest");
              sortByHighest();
            }}
            className={"mr-2 sort-button"}
            style={
              sortBy === "highest"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: "white",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            <i className="fas fa-chart-line sort-button-icon"></i>
            Highest
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSortBy("wpm");
              sortByWpm();
            }}
            className={"mr-2 sort-button"}
            style={
              sortBy === "wpm"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: "white",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            <i className="fas fa-chart-area sort-button-icon"></i>
            Average
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSortBy("races");
              sortByRaces();
            }}
            className={"mr-2 sort-button"}
            style={
              sortBy === "races"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: "white",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            <i className="fas fa-flag-checkered sort-button-icon"></i>
            Races
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSortBy("time");
              sortByTime();
            }}
            className={"mr-2 sort-button"}
            style={
              sortBy === "time"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: "white",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            <i className="fas fa-stopwatch sort-button-icon"></i>
            Time
          </Button>
        </div>
        <br></br>

        <i
          onClick={() => {
            dispatch({
              type: "TOGGLE_OPENING_LADDERBOARD_MENU",
            });
          }}
          className="fas fa-times fa-2x close-icon mt-3 mr-3"
        ></i>
      </div>
      <div className="ladderboard-info">
        <h5 className="ladderboard-name-info">Name</h5>
        <h5 className="ladderboard-races-info">Races</h5>
        <h5 className="ladderboard-averageWpm-info">Average</h5>
        <h5 className="ladderboard-info-higest">Highest</h5>
        <h5 className="ladderboard-time-info">Time</h5>
      </div>
      <div className="ladderboard-table">
        {data.map((user, index) => {
          return (
            <div
              onClick={() => {
                if (user.account === false) {
                  getTheOtherUserData(user._id);
                  setUserProfileOpen(!userProfileOpen);
                }
              }}
              key={index}
              className={"ladderboard-row"}
              style={
                userId === user._id
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      color: "white",
                    }
                  : {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
              }
            >
              <h4 className="ladderboard-number-item">
                {index === 0 ? <i class="fas fa-trophy"></i> : index + 1}
              </h4>
              <h4 className="ladderboard-name-item">
                {user.name}
                {user.account === true && (
                  <i
                    style={{ transform: "scale(0.7)", marginLeft: "10px" }}
                    class="fas fa-lock"
                  ></i>
                )}
              </h4>
              <h4 className="ladderboard-races-item">{user.races}</h4>
              <h4 className="ladderboard-time-item">
                {formatTheTime(user.time)}
              </h4>
              <h4 className="ladderboard-averageWpm-item">
                {Math.round(user.averageWpm * 100) / 100}
              </h4>
              <h4 className="ladderboard-item-higest">{user.highestWpm}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ladderboard;
