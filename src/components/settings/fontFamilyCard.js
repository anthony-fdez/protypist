import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./fontFamilyCard.css";

const FontFamilyCard = () => {
  const dispatch = useDispatch();
  const fontFamily = useSelector((state) => state.fontFamilyReducer);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const selectTheBackgroundText = () => {
    if (fontFamily === "Arial, sans-serif") {
      return "ARIAL";
    } else if (fontFamily === "monospace") {
      return "MONOSPACE";
    } else if (fontFamily === "Source Code Pro") {
      return "CODE";
    } else if (fontFamily === "cursive") {
      return "CURSIVE";
    } else if (fontFamily === "Times, Times New Roman, serif") {
      return "TIMES";
    } else if (fontFamily === "Courier New, monospace") {
      return "COURIER";
    }
  };

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
          <h2>Font family</h2>
          <p>Select what font you prefer for the site.</p>
        </div>
        <div className="d-flex">
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_FAMILY",
                payload: "Arial, sans-serif",
              });
            }}
            style={
              fontFamily === "Arial, sans-serif"
                ? {
                    color: colorFiles.primaryColor,
                    fontFamily: "Arial, sans-serif",
                  }
                : {
                    color: colorFiles.fontColor,
                    fontFamily: "Arial, sans-serif",
                  }
            }
            className="font-button"
          >
            Arial
          </h4>

          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_FAMILY",
                payload: "monospace",
              });
            }}
            style={
              fontFamily === "monospace"
                ? {
                    color: colorFiles.primaryColor,
                    fontFamily: "monospace",
                  }
                : {
                    color: colorFiles.fontColor,
                    fontFamily: "monospace",
                  }
            }
            className="font-button"
          >
            Monospace
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_FAMILY",
                payload: "Source Code Pro",
              });
            }}
            style={
              fontFamily === "Source Code Pro"
                ? {
                    color: colorFiles.primaryColor,
                    fontFamily: "Source Code Pro",
                  }
                : {
                    color: colorFiles.fontColor,
                    fontFamily: "Source Code Pro",
                  }
            }
            className="font-button"
          >
            Code
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_FAMILY",
                payload: "cursive",
              });
            }}
            style={
              fontFamily === "cursive"
                ? {
                    color: colorFiles.primaryColor,
                    fontFamily: "cursive",
                  }
                : {
                    color: colorFiles.fontColor,
                    fontFamily: "cursive",
                  }
            }
            className="font-button"
          >
            Cursive
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_FAMILY",
                payload: "Times, Times New Roman, serif",
              });
            }}
            style={
              fontFamily === "Times, Times New Roman, serif"
                ? {
                    color: colorFiles.primaryColor,
                    fontFamily: "Times, Times New Roman, serif",
                  }
                : {
                    color: colorFiles.fontColor,
                    fontFamily: "Times, Times New Roman, serif",
                  }
            }
            className="font-button"
          >
            Times
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_FONT_FAMILY",
                payload: "Courier New, monospace",
              });
            }}
            style={
              fontFamily === "Courier New, monospace"
                ? {
                    color: colorFiles.primaryColor,
                    fontFamily: "Courier New, monospace",
                  }
                : {
                    color: colorFiles.fontColor,
                    fontFamily: "Courier New, monospace",
                  }
            }
            className="font-button"
          >
            Courier
          </h4>
        </div>
        <h1 className="text-font-family">{selectTheBackgroundText()}</h1>
      </div>
    </div>
  );
};

export default FontFamilyCard;
