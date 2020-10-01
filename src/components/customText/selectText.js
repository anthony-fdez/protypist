import React, { useState, useEffect } from "react";
import "./selectText.css";
import Header from "../header/header";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

const SelectText = () => {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

  return (
    <animated.div style={animation} className={"TypingTest-page"}>
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
        }}
        className="TypingTest"
      >
        <Header />
        <div
          style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
          className="select-text-div"
        >
          <h4>Type of paste the text you want to type in the box below!</h4>
          <hr style={{ background: colorFiles.hrColor }}></hr>
          <div
            contentEditable="true"
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="select-text-input"
          >
            Type your text here!
          </div>
          <div className="select-text-info-div">
            <div className="select-text-info">
              <h5 style={{ marginRight: "3rem" }}>Words:</h5>
              <h5>Characters:</h5>
            </div>
            <button
              style={{
                backgroundColor: colorFiles.primaryColor,
                color: colorFiles.fontColor,
                fontSize: "16px",
              }}
              className="btn btn-light start-button"
            >
              Start typing
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default SelectText;
