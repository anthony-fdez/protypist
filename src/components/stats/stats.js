import React, { useState, useEffect } from "react";
import "./stats.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";

function Stats() {
  const theme = useSelector((state) => state.darkModeReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  //state
  const [wpmAverage10races, setWpmAverage10races] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [wpmAverageAllTime, setWpmAverageAllTime] = useState(0);
  const [racesCompleted, setRacesCompleted] = useState(0);
  const [averageMistakes, setAverageMistakes] = useState(0);
  const [highestSpeedOfAllTime, setHighestSpeedOfAllTime] = useState(0);

  const [timeIsUp, setTimeIsUp] = useState(false);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  useEffect(() => {
    const headers = { Authorization: jwt };

    axios
      .get("http://localhost:5000/users/statistics", {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setRacesCompleted(response.data.racesCompleted);
        setTotalTime(response.data.totalTime);
        setWpmAverage10races(response.data.wpmAverageLast10Races);
        setWpmAverageAllTime(response.data.wpmAverageAllTime);
        setAverageMistakes(response.data.averageMistakes);
        setHighestSpeedOfAllTime(response.data.highestSpeedAllTime);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [jwt]);

  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      setTimeIsUp(true);
    }, 1000);
    return () => clearTimeout(myTimeOut);
  }, []);

  const formatTheTime = () => {
    let hours;
    let minutes;
    let seconds;

    if (totalTime !== undefined) {
      let time = totalTime;

      hours = Math.floor(time / 3600);
      time = time % 3600;
      minutes = Math.floor(time / 60);
      seconds = time % 60;
    }

    const formtatedTimeString = `${
      hours === 0 ? "00" : hours < 10 ? "0" + hours : hours
    }:${minutes === 0 ? "00" : minutes < 10 ? "0" + minutes : minutes}:${
      seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : seconds
    }`;

    return formtatedTimeString;
  };

  const alert = () => {
    return (
      <p className={"alert-warning mt-3"}>
        <strong>Info: </strong>
        The average Mistakes, and the Average speed for the last 10 races won't
        show untill you have completed 10 races.
      </p>
    );
  };

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
              <h5 style={{ marginTop: "1rem" }}>{formatTheTime()}</h5>
            </div>
            <div className="stats-box">
              <h5>Races Completed:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{racesCompleted}</h5>
            </div>
            <div className="stats-box">
              <h5>Highest WPM:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{highestSpeedOfAllTime}</h5>
            </div>
            <div className="stats-box">
              <h5>Average WPM:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverageAllTime * 10) / 10}
              </h5>
            </div>
            <div className="stats-box">
              <h5>WPM last 10 races:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{wpmAverage10races}</h5>
            </div>
            <div className="stats-box">
              <h5>Average Mistakes:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{averageMistakes}</h5>
            </div>
          </div>
          {racesCompleted < 10 && timeIsUp === true && alert()}
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
