import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./fontFamilyCard.css";

const KeyboardLayout = () => {
  const dispatch = useDispatch();
  const keyboardLayout = useSelector((state) => state.selectKeyboardLayout);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  return (
    <div style={{ cursor: "pointer" }} className="container">
      <div
        className={"settings-card-words"}
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h2>Keyboard Layout</h2>
          <p>
            Select the keyboard layout that you are more comfortable typing
            with.
          </p>
        </div>
        <div className="d-flex">
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_KEYBOARD_LAYOUT",
                payload: "QWERTY",
              });
            }}
            className="font-button"
          >
            QWERTY
          </h4>

          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_KEYBOARD_LAYOUT",
                payload: "DVORAK",
              });
            }}
            className="font-button"
          >
            DVORAK
          </h4>
        </div>
        <h1 className="text-font-family">{keyboardLayout}</h1>
      </div>
    </div>
  );
};

export default KeyboardLayout;
