import React from "react";
import "./replayText.css";
import { useSelector, useDispatch } from "react-redux";

const ReplayText = (props) => {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const isReplayComponentShown = useSelector(
    (state) => state.replayComponentShown
  );

  return (
    <div>
      <div
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
        className={
          isReplayComponentShown ? "replay-text-shown" : "replay-text-hidden"
        }
      >
        <h1>Replay</h1>
      </div>
    </div>
  );
};

export default ReplayText;
