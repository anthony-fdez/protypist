import React, { useState, useEffect } from "react";
import "./selectText.css";
import Header from "../header/header";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

const SelectText = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("Type your text here");
  const [words, setWords] = useState(0);
  const [chars, setChars] = useState(0);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

  const calculateWordsInInputField = (e) => {
    setText(e.target.value);

    let textArr = e.target.value;
    textArr = textArr.split("");

    let Words = 0;
    let Chars = 0;

    for (let i = 0; i < textArr.length; i++) {
      if (textArr[i] === " ") {
        Words++;
      }
    }

    setWords(Words);
    setChars(textArr.length);
  };

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
          <textarea
            wrap="soft"
            maxLength="800"
            rows="4"
            onChange={(e) => calculateWordsInInputField(e)}
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="select-text-input"
          ></textarea>
          <div className="select-text-info-div">
            <div className="select-text-info">
              <h5 style={{ marginRight: "3rem" }}>Words: {words}</h5>
              <h5>Characters: {chars}</h5>
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
