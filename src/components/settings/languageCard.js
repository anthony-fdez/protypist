import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LanguageCard = () => {
  const dispatch = useDispatch();
  const testLanguage = useSelector((state) => state.testLanguageReducer);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const [isLanguageCardOpen, setIsLanguageCardOpen] = useState(false);

  return (
    <div className="container">
      <div
        onClick={() => {
          setIsLanguageCardOpen(!isLanguageCardOpen);
        }}
        className={
          isLanguageCardOpen
            ? "settings-card-themes-open"
            : "settings-card-themes-closed"
        }
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
      >
        <div className="theme-card-info">
          <div style={{ textAlign: "left" }}>
            <h2>Test Language</h2>
            <p>This only applies to the Top 200 test.</p>
          </div>
          <h1 className="text-languages">{testLanguage.toUpperCase()}</h1>
        </div>
        <div className="languages-top d-flex">
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "english",
              });
            }}
            className="font-button"
          >
            English
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "german",
              });
            }}
            className="font-button"
          >
            German
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "spanish",
              });
            }}
            className="font-button"
          >
            Spanish
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "dutch",
              });
            }}
            className="font-button"
          >
            Dutch
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "french",
              });
            }}
            className="font-button"
          >
            French
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "portuguese",
              });
            }}
            className="font-button"
          >
            Portuguese
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "italian",
              });
            }}
            className="font-button"
          >
            Italian
          </h4>
        </div>
        <div className="languages-bottom d-flex">
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "polish",
              });
            }}
            className="font-button"
          >
            Polish
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "thai",
              });
            }}
            className="font-button"
          >
            Thai
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "russian",
              });
            }}
            className="font-button"
          >
            Russian
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "indonesian",
              });
            }}
            className="font-button"
          >
            Indonesian
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "turkish",
              });
            }}
            className="font-button"
          >
            Turkish
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "hungarian",
              });
            }}
            className="font-button"
          >
            Hungarian
          </h4>
          <h4
            onClick={() => {
              dispatch({
                type: "CHANGE_LANGUAGE",
                payload: "norwegian",
              });
            }}
            className="font-button"
          >
            Norwegian
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LanguageCard;
