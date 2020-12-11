import React, { useEffect, useState } from "react";
import "./TenSecondsLeaderboard.css";
import { useSelector } from "react-redux";
import Axios from "axios";

const TenSecondsLeaderboard = (props) => {
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      Axios.get("https://protypist.herokuapp.com/10seconds/leaderboard/easy", {
        headers: headers,
      })
        .then((response) => {
          setLeaderboardData(response.data.leaderboard_easy);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>10 Seconds Leaderboard</h2>
        <i
          onClick={() => props.onChange()}
          className="close-icon-login fas fa-times fa-2x"
        ></i>
      </div>
      <hr style={{ background: colorFiles.hrColor }}></hr>
      <div>
        <div style={{ position: "relative", width: "80%", margin: "auto" }}>
          <div className="test-history-item">
            <h5 style={{ position: "absolute", left: "0vw" }}>Rank</h5>
            <h5 style={{ position: "absolute", left: "5vw" }}>Name</h5>
            <h5 style={{ position: "absolute", right: "0vw" }}>Score</h5>
          </div>
        </div>
        <div className="tests-history">
          {leaderboardData !== null &&
            leaderboardData.map((data, index) => {
              return (
                <div
                  style={
                    index % 2 === 0
                      ? {
                          backgroundColor: colorFiles.backgroundColor,
                          position: "relative",
                          padding: "1rem",
                        }
                      : { position: "relative", padding: "1rem" }
                  }
                  className="test-history-item"
                  key={index}
                >
                  <h5 style={{ position: "absolute", left: "1vw" }}>
                    {index + 1}
                  </h5>
                  <h5 style={{ position: "absolute", left: "5vw" }}>
                    {data.name}
                  </h5>
                  <h5 style={{ position: "absolute", right: "1vw" }}>
                    {data.score}
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
