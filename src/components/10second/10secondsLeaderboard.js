import React from "react";
import "./TenSecondsLeaderboard.css";
import { useSelector } from "react-redux";

const TenSecondsLeaderboard = (props) => {
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

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
      <div>Helo</div>
    </div>
  );
};

export default TenSecondsLeaderboard;
