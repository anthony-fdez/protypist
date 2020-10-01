import React, { useState } from "react";
import "./selectText.css";

import { useSelector, useDispatch } from "react-redux";

const SelectText = () => {
  const dispatch = useDispatch();
  const textReducer = useSelector((state) => state.customText);

  const [text, setText] = useState(textReducer);
  const [words, setWords] = useState(13);
  const [chars, setChars] = useState(68);

  const isMenuOpen = useSelector((state) => state.selectMenuShown);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

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
    <div
      style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
      className={
        isMenuOpen ? "select-text-div-shown" : "select-text-div-hidden"
      }
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
      >
        {text}
      </textarea>
      <div className="select-text-info-div">
        <div className="select-text-info">
          <h5 style={{ marginRight: "3rem" }}>Words: {words}</h5>
          <h5>Characters: {chars}</h5>
        </div>

        <button
          onClick={() => {
            dispatch({
              type: "SELECT_CUSTOM_TEXT",
              payload: text,
            });
            dispatch({
              type: "SET_SELECT_MENU_OPEN",
              payload: false,
            });
          }}
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
  );
};

export default SelectText;
