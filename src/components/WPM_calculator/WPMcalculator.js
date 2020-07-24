import React from "react";
import "./WPMcalculator.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function WPMcalculator() {
  const theme = useSelector((state) => state.darkModeReducer);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={animation}
      className={theme ? "WPMcalculator-page-dark" : "WPMcalculator-page-light"}
    >
      <div className="WPMcalculator">
        <Header text="Words Per Minute Calculator" />
        <div className="wpm-calculator container d-flex justify-content-between">
          <div className="input-item">
            <input required type="text" name="words" autoComplete="off"></input>
            <label for="words" className="label-name">
              <span className="content-name">Number of Words</span>
            </label>
          </div>
          <div className="input-item">
            <input required type="text" name="words" autoComplete="off"></input>
            <label for="words" className="label-name">
              <span className="content-name">Seconds</span>
            </label>
          </div>
        </div>
        <div className="container mt-5">
          <h2>WPM: 0</h2>
          <h2>CPM : 0</h2>
        </div>
      </div>
    </animated.div>
  );
}

export default WPMcalculator;
