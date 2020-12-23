import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const ThemesCard = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const [isThemesCardOpen, setIsThemesCardOpen] = useState(false);

  const [hoverDarkBlue, setHoverDarkBlue] = useState(false);
  const [hoverDarkRed, setHoverDarkRed] = useState(false);
  const [hoverDarkGreen, setHoverDarkGreen] = useState(false);
  const [hoverDarkPink, setHoverDarkPink] = useState(false);
  const [hoverDarkOrange, setHoverDarkOrange] = useState(false);
  const [hoverDarkWhite, setHoverDarkWhite] = useState(false);
  const [hoverDarkTerminal, setHoverDarkTerminal] = useState(false);
  const [hoverDarkDarker, setHoverDarkDarker] = useState(false);
  const [hoverDarkAmoled, setHoverDarkAmoled] = useState(false);

  const [hoverLightBlue, setHoverLightBLue] = useState(false);
  const [hoverLightRed, setHoverLightRed] = useState(false);
  const [hoverLightGreen, setHoverLightGreen] = useState(false);
  const [hoverLightPink, setHoverLightPink] = useState(false);
  const [hoverLightOrange, setHoverlightOrange] = useState(false);
  const [hoverLightBlack, setHoverLightBlack] = useState(false);
  const [hoverLightTerminal, setHoverLightTerminal] = useState(false);
  const [hoverLightGray, setHoverLightGray] = useState(false);
  const [hoverLightWhite, setHoverLightWhite] = useState(false);

  const displayTheActualTheme = () => {
    let name = colors.split("");
    for (let i = 0; i < 5; i++) {
      name.pop();
    }

    name = name.join("");

    return name.toUpperCase();
  };

  return (
    <div className="container mt-1">
      <div
        onClick={() => {
          setIsThemesCardOpen(!isThemesCardOpen);
        }}
        className={
          isThemesCardOpen
            ? "settings-card-themes-open"
            : "settings-card-themes-closed"
        }
        style={{
          backgroundColor: colorFiles.primaryColor,
          color: colorFiles.contrastFontColor,
        }}
      >
        <div className="theme-card-info">
          <div style={{ textAlign: "left" }}>
            <h2>Theme</h2>
            <p>Change the overall theme of the app!</p>
          </div>
          <h1 className="text-themes">{displayTheActualTheme()}</h1>
        </div>
        <div className="themes-buttons">
          <div className="dark-themes">
            <h4 style={{ marginRight: "1rem" }}>Dark: </h4>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkBlue
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(0, 100, 255)",
                      color: "white",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "dark.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkBlue(true);
              }}
              onMouseLeave={() => {
                setHoverDarkBlue(false);
              }}
            >
              Blue
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkRed
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 0, 0)",
                      color: "white",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "darkRed.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkRed(true);
              }}
              onMouseLeave={() => {
                setHoverDarkRed(false);
              }}
            >
              Red
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkGreen
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(0, 255, 0)",
                      color: "black",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "green.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkGreen(true);
              }}
              onMouseLeave={() => {
                setHoverDarkGreen(false);
              }}
            >
              Green
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkPink
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 77, 210)",
                      color: "black",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "pink.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkPink(true);
              }}
              onMouseLeave={() => {
                setHoverDarkPink(false);
              }}
            >
              Pink
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkOrange
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 85, 0)",
                      color: "black",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "orange.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkOrange(true);
              }}
              onMouseLeave={() => {
                setHoverDarkOrange(false);
              }}
            >
              Orange
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkWhite
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(10, 10, 10)",
                      color: "white",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "white.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkWhite(true);
              }}
              onMouseLeave={() => {
                setHoverDarkWhite(false);
              }}
            >
              White
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkTerminal
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(0, 255, 0)",
                      color: "black",
                    }
              }
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "terminal.json",
                });
              }}
              onMouseEnter={() => {
                setHoverDarkTerminal(true);
              }}
              onMouseLeave={() => {
                setHoverDarkTerminal(false);
              }}
            >
              Terminal
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverDarkDarker
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(0, 50, 255)",
                      color: "black",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "darker.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkDarker(true);
              }}
              onMouseLeave={() => {
                setHoverDarkDarker(false);
              }}
            >
              Darker
            </button>

            <button
              className="btn btn-themes"
              style={
                !hoverDarkAmoled
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(100, 100, 100)",
                      color: "white",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "amoled.json" });
              }}
              onMouseEnter={() => {
                setHoverDarkAmoled(true);
              }}
              onMouseLeave={() => {
                setHoverDarkAmoled(false);
              }}
            >
              Amoled
            </button>
          </div>
          <hr style={{ background: colorFiles.hrColor }}></hr>
          <div className="light-themes">
            <h4 style={{ marginRight: "0.8rem" }}>Light: </h4>
            <button
              className="btn btn-themes"
              style={
                !hoverLightBlue
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(0,100,255)",
                      border: "1px solid rgb(0,100,255)",
                    }
              }
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "blueLght.json",
                });
              }}
              onMouseEnter={() => {
                setHoverLightBLue(true);
              }}
              onMouseLeave={() => {
                setHoverLightBLue(false);
              }}
            >
              Blue
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightRed
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(255,30,0)",
                      border: "1px solid rgb(255,30,0)",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "redLght.json" });
              }}
              onMouseEnter={() => {
                setHoverLightRed(true);
              }}
              onMouseLeave={() => {
                setHoverLightRed(false);
              }}
            >
              Red
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightGreen
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(0, 255, 0)",
                      border: "1px solid rgb(0, 255, 0)",
                    }
              }
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "greenLght.json",
                });
              }}
              onMouseEnter={() => {
                setHoverLightGreen(true);
              }}
              onMouseLeave={() => {
                setHoverLightGreen(false);
              }}
            >
              Green
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightPink
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(255, 77, 210)",
                      border: "1px solid rgb(255, 77, 210)",
                    }
              }
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "pinkLght.json",
                });
              }}
              onMouseEnter={() => {
                setHoverLightPink(true);
              }}
              onMouseLeave={() => {
                setHoverLightPink(false);
              }}
            >
              Pink
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightOrange
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(255, 85, 0)",
                      border: "1px solid rgb(255, 85, 0)",
                    }
              }
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "orangeLght.json",
                });
              }}
              onMouseEnter={() => {
                setHoverlightOrange(true);
              }}
              onMouseLeave={() => {
                setHoverlightOrange(false);
              }}
            >
              Orange
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightBlack
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "black",
                      border: "1px solid black",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "black.json" });
              }}
              onMouseEnter={() => {
                setHoverLightBlack(true);
              }}
              onMouseLeave={() => {
                setHoverLightBlack(false);
              }}
            >
              Black
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightTerminal
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(0,255,0)",
                      border: "1px solid rgb(0,255,0)",
                    }
              }
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "terminalLght.json",
                });
              }}
              onMouseEnter={() => {
                setHoverLightTerminal(true);
              }}
              onMouseLeave={() => {
                setHoverLightTerminal(false);
              }}
            >
              Terminal
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightGray
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgb(50,50,50)",
                      border: "1px solid rgb(50,50,50)",
                    }
              }
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "gray.json" });
              }}
              onMouseEnter={() => {
                setHoverLightGray(true);
              }}
              onMouseLeave={() => {
                setHoverLightGray(false);
              }}
            >
              Gray
            </button>
            <button
              className="btn btn-themes"
              style={
                !hoverLightWhite
                  ? {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
                  : {
                      backgroundColor: "rgb(200, 200, 200)",
                      color: "rgb(0,0,0)",
                      border: "1px solid black",
                    }
              }
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "whiteLght.json",
                });
              }}
              onMouseEnter={() => {
                setHoverLightWhite(true);
              }}
              onMouseLeave={() => {
                setHoverLightWhite(false);
              }}
            >
              White
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesCard;
