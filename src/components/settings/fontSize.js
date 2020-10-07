import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./fontFamilyCard.css";

const FontSizeCard = () => {
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.fontSizeReducer);

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
          <h2>Font Size</h2>
          <p>Select how big you want the font of the website to be.</p>
        </div>
        <div className="d-flex">
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_SIZE",
                payload: 8,
              });
            }}
            className="font-button"
          >
            8
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_SIZE",
                payload: 10,
              });
            }}
            className="font-button"
          >
            10
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_SIZE",
                payload: 12,
              });
            }}
            className="font-button"
          >
            12
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_SIZE",
                payload: 14,
              });
            }}
            className="font-button"
          >
            14
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_SIZE",
                payload: 16,
              });
            }}
            className="font-button"
          >
            16
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_SIZE",
                payload: 18,
              });
            }}
            className="font-button"
          >
            18
          </h4>
        </div>
        <h1 className="text-font-family">{fontSize}</h1>
      </div>
    </div>
  );
};

export default FontSizeCard;
