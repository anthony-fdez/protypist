import React, { useEffect, useState } from "react";
import "./TenSecondsLeaderboard.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Button } from "@material-ui/core";

const TenSecondsLeaderboard = (props) => {
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const difficultyReducer = useSelector(
    (state) => state.tenSecondsDifficultyReducer
  );

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [difficulty, setDifficulty] = useState(difficultyReducer);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = {
        Authorization: jwt,
      };

      if (difficulty === "EASY") {
        Axios.get(
          "https://protypist.herokuapp.com/10seconds/leaderboard/easy",
          {
            headers: headers,
          }
        )
          .then((response) => {
            setLeaderboardData(response.data.leaderboard_easy);
          })
          .catch((e) => {
            console.log(e.response);
          });
      } else if (difficulty === "NORMAL") {
        Axios.get(
          "https://protypist.herokuapp.com/10seconds/leaderboard/normal",
          {
            headers: headers,
          }
        )
          .then((response) => {
            setLeaderboardData(response.data.leaderboard_normal);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (difficulty === "HARD") {
        Axios.get(
          "https://protypist.herokuapp.com/10seconds/leaderboard/hard",
          {
            headers: headers,
          }
        )
          .then((response) => {
            setLeaderboardData(response.data.leaderboard_hard);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (difficulty === "EPIC") {
        Axios.get(
          "https://protypist.herokuapp.com/10seconds/leaderboard/epic",
          {
            headers: headers,
          }
        )
          .then((response) => {
            setLeaderboardData(response.data.leaderboard_epic);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [difficulty, difficultyReducer, props.isOpen]);

  const formateSeconds = (s) => {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor(s / 60);
    const seconds = s - minutes * 60;

    const formatedTime = `${
      hours === 0 ? "" : hours < 10 ? "0:" + hours : hours + ":"
    }${minutes === 0 ? "00" : minutes < 10 ? "0" + minutes : minutes}:${
      seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : seconds
    }`;

    return formatedTime;
  };

  return (
    <div
      style={{
        backgroundColor: colorFiles.secondaryBackgroundColor,
        color: colorFiles.fontColor,
      }}
      className={
        props.isOpen
          ? "ten-seconds-leaderboard-open"
          : "ten-seconds-leaderboard-closed"
      }
    >
      <div
        className="ten-seconds-leaderboard-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: colorFiles.secondaryBackgroundColor,
        }}
      >
        <h2>10 Seconds Leaderboard</h2>
        <i
          onClick={() => props.onChange()}
          className="close-icon-login fas fa-times fa-2x"
        ></i>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginTop: "2rem" }}>Rank by mode</h3>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Button
            variant="contained"
            style={
              difficulty === "EASY"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
            }
            className="select-difficulty-button"
            onClick={() => setDifficulty("EASY")}
          >
            Easy
          </Button>
          <Button
            variant="contained"
            style={
              difficulty === "NORMAL"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
            }
            className="select-difficulty-button"
            onClick={() => setDifficulty("NORMAL")}
          >
            Normal
          </Button>
          <Button
            variant="contained"
            style={
              difficulty === "HARD"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
            }
            className="select-difficulty-button"
            onClick={() => setDifficulty("HARD")}
          >
            Hard
          </Button>
          <Button
            variant="contained"
            style={
              difficulty === "EPIC"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                    marginRight: "5px",
                    marginLeft: "5px",
                    width: "80px",
                    border: "none",
                  }
            }
            className="select-difficulty-button"
            onClick={() => setDifficulty("EPIC")}
          >
            Epic
          </Button>
        </div>
      </div>
      <hr
        style={{
          background: colorFiles.hrColor,
          width: "80%",
          marginBottom: 0,
        }}
      ></hr>

      <div
        className="info-10-seconds-leaderboard"
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          borderBottom: `1px solid ${colorFiles.hrColor}`,
        }}
      >
        <h5 style={{ position: "absolute", left: "0vw" }}>Rank</h5>
        <h5 style={{ position: "absolute", left: "5vw" }}>Name</h5>
        <h5 style={{ position: "absolute", right: "16vw" }}>Score</h5>
        <h5 style={{ position: "absolute", right: "8vw" }}>Longest</h5>
        <h5 style={{ position: "absolute", right: "1vw" }}>Time</h5>
      </div>

      <div style={{ position: "relative", width: "80%", margin: "auto" }}>
        <div className="test-history-10seconds">
          {leaderboardData !== null &&
            leaderboardData.map((data, index) => {
              return (
                <div
                  style={
                    index % 2 === 0
                      ? {
                          backgroundColor: colorFiles.backgroundColor,
                          position: "relative",
                          padding: "1.5rem",
                          display: "flex",
                          alignItems: "center",
                        }
                      : {
                          position: "relative",
                          padding: "1.5rem",
                          display: "flex",
                          alignItems: "center",
                        }
                  }
                  className="test-history-item"
                  key={index}
                >
                  <h5 style={{ position: "absolute", left: "1vw" }}>
                    {index + 1}
                  </h5>
                  <h5 style={{ position: "absolute", left: "4vw" }}>
                    {data.name}
                  </h5>
                  <h5 style={{ position: "absolute", right: "16vw" }}>
                    {data.score}
                  </h5>
                  <h5 style={{ position: "absolute", right: "8vw" }}>
                    {formateSeconds(data.longestTime)}
                  </h5>
                  <h5 style={{ position: "absolute", right: "1vw" }}>
                    {formateSeconds(data.totalTime)}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TenSecondsLeaderboard;
