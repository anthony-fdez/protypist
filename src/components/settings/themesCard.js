import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const ThemesCard = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const currentTheme = useSelector((state) => state.currentThemeReducer);

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
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "dark.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "dark.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "dark.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Blue
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "darkRed.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "darkRed.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "darkRed.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Red
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "green.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "green.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "green.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Green
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "pink.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "pink.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "pink.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Pink
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "orange.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "orange.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "orange.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Orange
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "white.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "white.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "white.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              White
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "terminal.json",
                });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "terminal.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "terminal.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Terminal
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "darker.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "darker.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "darker.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Darker
            </button>

            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "amoled.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "amoled.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "amoled.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
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
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "blueLght.json",
                });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "blueLght.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "blueLght.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Blue
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "redLght.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "redLght.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "redLght.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Red
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "greenLght.json",
                });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "greenLght.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "greenLght.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Green
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "pinkLght.json",
                });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "pinkLght.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "pinkLght.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Pink
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "orangeLght.json",
                });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "orangeLght.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "orangeLght.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Orange
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "black.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "black.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "black.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Black
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "terminalLght.json",
                });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "terminalLght.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "terminalLght.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Terminal
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({ type: "SELECT_THEME", payload: "gray.json" });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "gray.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "gray.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
              }}
            >
              Gray
            </button>
            <button
              className="btn btn-themes"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
              onClick={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "whiteLght.json",
                });
                dispatch({
                  type: "SET_CURRENT_THEME",
                  payload: "whiteLght.json",
                });
              }}
              onMouseEnter={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: "whiteLght.json",
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: "SELECT_THEME",
                  payload: currentTheme,
                });
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
