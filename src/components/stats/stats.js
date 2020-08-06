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

  //state TypingGame
  const [wpmAverage10races, setWpmAverage10races] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [wpmAverageAllTime, setWpmAverageAllTime] = useState(0);
  const [racesCompleted, setRacesCompleted] = useState(0);
  const [averageMistakes, setAverageMistakes] = useState(0);
  const [highestSpeedOfAllTime, setHighestSpeedOfAllTime] = useState(0);

  //state 200
  const [wpmAverage10races200, setWpmAverage10races200] = useState(0);
  const [totalTime200, setTotalTime200] = useState(0);
  const [wpmAverageAllTime200, setWpmAverageAllTime200] = useState(0);
  const [racesCompleted200, setRacesCompleted200] = useState(0);
  const [averageMistakes200, setAverageMistakes200] = useState(0);
  const [highestSpeedOfAllTime200, setHighestSpeedOfAllTime200] = useState(0);

  const [wpmAverage10races1000, setWpmAverage10races1000] = useState(0);
  const [totalTime1000, setTotalTime1000] = useState(0);
  const [wpmAverageAllTime1000, setWpmAverageAllTime1000] = useState(0);
  const [racesCompleted1000, setRacesCompleted1000] = useState(0);
  const [averageMistakes1000, setAverageMistakes1000] = useState(0);
  const [highestSpeedOfAllTime1000, setHighestSpeedOfAllTime1000] = useState(0);

  const [
    isTypingGameStatisticsShown,
    setIsTypingGameStatisticsShown,
  ] = useState(true);
  const [isTyping200StatisticsShown, setIsTyping200StatisticsShown] = useState(
    false
  );
  const [
    isTyping1000StatisticsShown,
    setIsTyping1000StatisticsShown,
  ] = useState(false);

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
    const headers = { Authorization: jwt };

    axios
      .get("http://localhost:5000/users/statistics200", {
        headers: headers,
      })
      .then((response) => {
        setRacesCompleted200(response.data.racesCompleted200);
        setTotalTime200(response.data.totalTime200);
        setWpmAverage10races200(response.data.wpmAverageLast10Races200);
        setWpmAverageAllTime200(response.data.wpmAverageAllTime200);
        setAverageMistakes200(response.data.averageMistakes200);
        setHighestSpeedOfAllTime200(response.data.highestSpeedAllTime200);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [jwt]);

  useEffect(() => {
    const headers = { Authorization: jwt };

    axios
      .get("http://localhost:5000/users/statistics1000", {
        headers: headers,
      })
      .then((response) => {
        setRacesCompleted1000(response.data.racesCompleted1000);
        setTotalTime1000(response.data.totalTime1000);
        setWpmAverage10races1000(response.data.wpmAverageLast10Races1000);
        setWpmAverageAllTime1000(response.data.wpmAverageAllTime1000);
        setAverageMistakes1000(response.data.averageMistakes1000);
        setHighestSpeedOfAllTime1000(response.data.highestSpeedAllTime1000);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [jwt]);

  const formatTheTime = (time) => {
    let hours;
    let minutes;
    let seconds;

    if (time !== undefined) {
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

  const alert = (races) => {
    return (
      <p
        className={
          races < 10
            ? "alert-warning alert-not-enough-races-shown"
            : "alert-warning alert-not-enough-races-hidden"
        }
      >
        <strong>Info: </strong>
        The average Mistakes, and the Average speed for the last 10 races won't
        show untill you have completed 10 races.
      </p>
    );
  };

  const statisticsTypingGameComponent = () => {
    return (
      <div key="statisticsTypingGame">
        <div
          className={
            isTypingGameStatisticsShown
              ? "typing-game-statistics-div-shown"
              : "typing-game-statistics-div-hidden"
          }
        >
          <h4>Typing Test Statistics:</h4>
          <hr className={theme ? "white-hr" : "dark-hr"}></hr>
          <div className="all-time-div-stats">
            <div className="stats-box">
              <h5>Total time:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{formatTheTime(totalTime)}</h5>
            </div>
            <div className="stats-box">
              <h5>Races:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{racesCompleted}</h5>
            </div>
            <div className="stats-box">
              <h5>Highest:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{highestSpeedOfAllTime}</h5>
            </div>
            <div className="stats-box">
              <h5>Average:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverageAllTime * 10) / 10}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Recent Avg:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{wpmAverage10races}</h5>
            </div>
            <div className="stats-box">
              <h5>Mistakes Avg:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{averageMistakes}</h5>
            </div>
          </div>
          {alert(racesCompleted)}
        </div>
      </div>
    );
  };

  const statistics200Component = () => {
    return (
      <div key="statistics200">
        <div
          className={
            isTyping200StatisticsShown
              ? "typing-200-statistics-div-shown"
              : "typing-200-statistics-div-hidden"
          }
        >
          <h4>200 Most Common Words Statistics:</h4>
          <hr className={theme ? "white-hr" : "dark-hr"}></hr>
          <div className="all-time-div-stats">
            <div className="stats-box">
              <h5>Total time:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {formatTheTime(totalTime200)}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Races:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{racesCompleted200}</h5>
            </div>
            <div className="stats-box">
              <h5>Highest:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{highestSpeedOfAllTime200}</h5>
            </div>
            <div className="stats-box">
              <h5>Average:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverageAllTime200 * 10) / 10}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Recent Avg:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{wpmAverage10races200}</h5>
            </div>
            <div className="stats-box">
              <h5>Avg Mistakes:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{averageMistakes200}</h5>
            </div>
          </div>
          {alert(racesCompleted200)}
        </div>
      </div>
    );
  };

  const statistics1000Component = () => {
    return (
      <div key="statistics100">
        <div
          className={
            isTyping1000StatisticsShown
              ? "typing-1000-statistics-div-shown"
              : "typing-1000-statistics-div-hidden"
          }
        >
          <h4>1000 Most Common Words Statistics:</h4>
          <hr className={theme ? "white-hr" : "dark-hr"}></hr>
          <div className="all-time-div-stats">
            <div className="stats-box">
              <h5>Total time:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {formatTheTime(totalTime1000)}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Races:</h5>
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{racesCompleted1000}</h5>
            </div>
            <div className="stats-box">
              <h5>Highest:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{highestSpeedOfAllTime1000}</h5>
            </div>
            <div className="stats-box">
              <h5>Average:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverageAllTime1000 * 10) / 10}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Recent Avg:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{wpmAverage10races1000}</h5>
            </div>
            <div className="stats-box">
              <h5>Avg Mistakes:</h5>{" "}
              <hr className={theme ? "white-hr" : "dark-hr"}></hr>
              <h5 style={{ marginTop: "1rem" }}>{averageMistakes1000}</h5>
            </div>
          </div>
          {alert(racesCompleted1000)}
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
        <div className="statistics-select-buttons">
          <div
            onClick={() => {
              setIsTypingGameStatisticsShown(true);
              setIsTyping200StatisticsShown(false);
              setIsTyping1000StatisticsShown(false);
            }}
            className={
              isTypingGameStatisticsShown
                ? "typing-game-button-active bg-primary"
                : "typing-game-inactive"
            }
          >
            <h4>TypingGame</h4>
          </div>
          <div
            onClick={() => {
              setIsTypingGameStatisticsShown(false);
              setIsTyping200StatisticsShown(true);
              setIsTyping1000StatisticsShown(false);
            }}
            className={
              isTyping200StatisticsShown
                ? "top-200-button-active bg-primary"
                : "top-200-inactive"
            }
          >
            <h4>Top 200</h4>
          </div>
          <div
            onClick={() => {
              setIsTypingGameStatisticsShown(false);
              setIsTyping200StatisticsShown(false);
              setIsTyping1000StatisticsShown(true);
            }}
            className={
              isTyping1000StatisticsShown
                ? "top-1000-button-active bg-primary"
                : "top-1000-inactive"
            }
          >
            <h4>Top 1000</h4>
          </div>
        </div>
        <hr className={theme ? "white-hr" : "dark-hr"}></hr>
        <div className="all-statistics-div">
          {isLoggedIn
            ? [
                statisticsTypingGameComponent(),
                statistics200Component(),
                statistics1000Component(),
              ]
            : notLoggedIn()}
        </div>
      </div>
    </animated.div>
  );
}

export default Stats;