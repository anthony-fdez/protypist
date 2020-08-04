import React from "react";
import "./stats.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Stats() {
  const theme = useSelector((state) => state.darkModeReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  const statistics = () => {
    return (
      <div>
        <div className="all-time-div">
          <h4>All time statistics:</h4>
          <hr className={theme ? "white-hr" : "dark-hr"}></hr>
          <div className="all-time-div-stats">
            <div className="stats-box">
              <h5>Total time:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
            </div>
            <div className="stats-box">
              <h5>Total races:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
            </div>
            <div className="stats-box">
              <h5>Highest WPM:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
            </div>
            <div className="stats-box">
              <h5>Average WPM:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
            </div>
            <div className="stats-box">
              <h5>WPM last 10 races:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
            </div>
            <div className="stats-box">
              <h5>Average Mistakes:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const notLoggedIn = () => {
    return (
      <div className="log-in-message">
        <h2>You have to be logged in to see your statistics.</h2>
      </div>
    );
  };

  return (
    <animated.div
      style={animation}
      className={theme ? "stats-page-dark" : "stats-page-light"}
    >
      <div className={theme ? "Stats-dark" : "Stats-light"}>
        <Header text="Yous statistics!" />
        {isLoggedIn ? statistics() : notLoggedIn()}
      </div>
    </animated.div>
  );
}

export default Stats;
