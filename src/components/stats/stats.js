import React, { useState, useEffect } from "react";
import "./stats.css";
import Header from "../header/header";
import Ladderboard from "./ladderboard";
import formatTheTime from "../functions/formatTime";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { Line } from "react-chartjs-2";

function Stats() {
  const theme = useSelector((state) => state.darkModeReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const isLadderBoardMenuOpen = useSelector(
    (state) => state.openLadderBoardMenu
  );

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

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
  const [seeAllHistoryQuote, setSeeAllHistoryQuote] = useState(false);
  const [seeAllHistory200, setSeeAllHistory200] = useState(false);
  const [seeAllHistory1000, setSeeAllHistory1000] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [chartData200, setChartData200] = useState({});
  const [data200, setData200] = useState();

  const [chartDataTypingGame, setChartDataTypingGame] = useState([]);
  const [dataTypingGame, setDataTypingGame] = useState();

  const [chartData1000, setChartData1000] = useState({});
  const [data1000, setData1000] = useState();

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
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/me", {
          headers: headers,
        })
        .then((response) => {
          setData200(response.data.typing200Statistics);
          setData1000(response.data.typing1000Statistics);
          setDataTypingGame(response.data.typingGameStatistics);
        })
        .catch((e) => {
          setIsLoading(true);
          console.log(e.response);
        });
    }
  }, []);

  const getTheDataForTheChart = (DATA) => {
    let wpm = [];
    let races = [];
    let mistakes = [];

    if (DATA !== undefined) {
      let data = DATA;

      for (let i = 0; i < data.length; i++) {
        wpm.push(data[i].wpm);
        mistakes.push(data[i].mistakes);
        races.push(i + 1);
      }
      return { races: races, wpm: wpm, mistakes: mistakes };
    }
  };

  const chart200 = () => {
    if (data200 !== undefined) {
      const data = getTheDataForTheChart(data200);
      const wpm = data.wpm;
      const races = data.races;
      const mistakes = data.mistakes;

      setChartData200({
        labels: races,
        datasets: [
          {
            label: "Mistakes",
            data: mistakes,
            borderWidth: 4,
            backgroundColor: colorFiles.fontColor,
          },
          {
            label: "WPM",
            data: wpm,
            borderWidth: 5,
            backgroundColor: colorFiles.primaryColor,
          },
        ],
      });
    }
  };

  const chart1000 = () => {
    if (data1000 !== undefined) {
      const data = getTheDataForTheChart(data1000);
      const wpm = data.wpm;
      const races = data.races;
      const mistakes = data.mistakes;

      setChartData1000({
        labels: races,
        datasets: [
          {
            label: "Mistakes",
            data: mistakes,
            borderWidth: 4,
            backgroundColor: colorFiles.fontColor,
          },
          {
            label: "WPM",
            data: wpm,
            borderWidth: 5,
            backgroundColor: colorFiles.primaryColor,
          },
        ],
      });
    }
  };

  const chartTypingGame = () => {
    if (dataTypingGame !== undefined) {
      const data = getTheDataForTheChart(dataTypingGame);
      const wpm = data.wpm;
      const races = data.races;
      const mistakes = data.mistakes;

      setChartDataTypingGame({
        labels: races,
        datasets: [
          {
            label: "Mistakes",
            data: mistakes,
            borderWidth: 4,
            backgroundColor: colorFiles.fontColor,
          },
          {
            label: "WPM",
            data: wpm,
            borderWidth: 5,
            backgroundColor: colorFiles.primaryColor,
          },
        ],
      });
    }
  };

  const loadingComponent = () => {
    return (
      <div
        style={{
          color: colorFiles.fontColor,
          position: "absolute",
        }}
        className={"loading-div"}
      >
        <div class="lds-ellipsis">
          <div
            style={{ background: colorFiles.fontColor }}
            className={theme ? "loading-dot-dark" : "loading-dot-light"}
          ></div>
          <div
            style={{ background: colorFiles.fontColor }}
            className={theme ? "loading-dot-dark" : "loading-dot-light"}
          ></div>
          <div
            style={{ background: colorFiles.fontColor }}
            className={theme ? "loading-dot-dark" : "loading-dot-light"}
          ></div>
          <div
            style={{ background: colorFiles.fontColor }}
            className={theme ? "loading-dot-dark" : "loading-dot-light"}
          ></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    chart200();
    chartTypingGame();
    chart1000();
  }, [data200, data1000, dataTypingGame]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      axios
        .get("https://protypist.herokuapp.com/users/statistics", {
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
          setIsLoading(true);
          console.log(e.response);
        });
    }
  }, [jwt]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      axios
        .get("https://protypist.herokuapp.com/users/statistics200", {
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
    }
  }, [jwt]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/statistics1000", {
          headers: headers,
        })
        .then((response) => {
          setRacesCompleted1000(response.data.racesCompleted1000);
          setTotalTime1000(response.data.totalTime1000);
          setWpmAverage10races1000(response.data.wpmAverageLast10Races1000);
          setWpmAverageAllTime1000(response.data.wpmAverageAllTime1000);
          setAverageMistakes1000(response.data.averageMistakes1000);
          setHighestSpeedOfAllTime1000(response.data.highestSpeedAllTime1000);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else {
      setIsLoading(false);
    }
  }, [jwt]);

  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      setTimeIsUp(true);
    }, 1000);
    return () => clearTimeout(myTimeOut);
  }, []);

  const alert = () => {
    return (
      <p className={"alert-warning alert-not-enough-races"}>
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
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
        >
          <div className="d-flex">
            <h4>Quotes Statistics:</h4>
            <div className="loading-div-stats">
              {isLoading && loadingComponent()}
            </div>
          </div>

          <hr className={theme ? "white-hr" : "dark-hr"}></hr>
          <div className={"all-time-div-stats"}>
            <div className="stats-box">
              <h5>Total time:</h5>
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>{formatTheTime(totalTime)}</h5>
            </div>
            <div className="stats-box">
              <h5>Races:</h5>
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>{racesCompleted}</h5>
            </div>
            <div className="stats-box">
              <h5>Highest:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>{highestSpeedOfAllTime}</h5>
            </div>
            <div className="stats-box">
              <h5>Average:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverageAllTime * 100) / 100}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Recent Avg:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverage10races * 100) / 100}
              </h5>
            </div>
          </div>
          <div className="chart">
            <Line
              options={{
                responsive: true,
                title: { text: "Words Per Minute ", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                      },
                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 15,
                      },

                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                },
                annotation: {
                  annotations: [
                    {
                      type: "line",
                      mode: "horizontal",
                      scaleID: "y-axis-0",
                      value: 200,
                      borderColor: "rgb(75, 192, 192)",
                      borderWidth: 4,
                      label: {
                        enabled: false,
                        content: "Test label",
                      },
                    },
                  ],
                },
              }}
              data={chartDataTypingGame}
            />
          </div>
          <hr style={{ background: colorFiles.hrColor }}></hr>
          {!isLoading && testHistoryQuote(dataTypingGame)}
          {racesCompleted < 10 && timeIsUp === true && alert()}
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
              ? "typing-game-statistics-div-shown"
              : "typing-game-statistics-div-hidden"
          }
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
        >
          <div className="d-flex">
            <h4>200 Common Statistics:</h4>
            <div className="loading-div-stats">
              {isLoading && loadingComponent()}
            </div>
          </div>
          <hr style={{ background: colorFiles.hrColor }}></hr>
          <div className={"all-time-div-stats"}>
            <div className="stats-box">
              <h5>Total time:</h5>
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {formatTheTime(totalTime200)}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Races:</h5>
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>{racesCompleted200}</h5>
            </div>
            <div className="stats-box">
              <h5>Highest:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>{highestSpeedOfAllTime200}</h5>
            </div>
            <div className="stats-box">
              <h5>Average:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverageAllTime200 * 100) / 100}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Recent Avg:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverage10races200 * 100) / 100}
              </h5>
            </div>
          </div>
          <div className="chart">
            <Line
              options={{
                responsive: true,
                title: { text: "Words Per Minute ", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                      },
                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 15,
                      },

                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                },
              }}
              data={chartData200}
            />
          </div>
          <hr style={{ background: colorFiles.hrColor }}></hr>
          {!isLoading && testHistory200(data200)}
          {racesCompleted200 < 10 && timeIsUp === true && alert()}
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
              ? "typing-game-statistics-div-shown"
              : "typing-game-statistics-div-hidden"
          }
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
        >
          <div className="d-flex">
            <h4>1000 Common Statistics:</h4>
            <div className="loading-div-stats">
              {isLoading && loadingComponent()}
            </div>
          </div>
          <hr style={{ background: colorFiles.hrColor }}></hr>
          <div className={"all-time-div-stats"}>
            <div className="stats-box">
              <h5>Total time:</h5>
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {formatTheTime(totalTime1000)}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Races:</h5>
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>{racesCompleted1000}</h5>
            </div>
            <div className="stats-box">
              <h5>Highest:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>{highestSpeedOfAllTime1000}</h5>
            </div>
            <div className="stats-box">
              <h5>Average:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverageAllTime1000 * 100) / 100}
              </h5>
            </div>
            <div className="stats-box">
              <h5>Recent Avg:</h5>{" "}
              <hr style={{ background: colorFiles.hrColor }}></hr>
              <h5 style={{ marginTop: "1rem" }}>
                {Math.round(wpmAverage10races1000 * 100) / 100}
              </h5>
            </div>
          </div>
          <div className="chart">
            <Line
              options={{
                responsive: true,
                title: { text: "Words Per Minute ", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                      },
                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 15,
                      },

                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                },
              }}
              data={chartData1000}
            />
          </div>
          <hr style={{ background: colorFiles.hrColor }}></hr>
          {!isLoading && testHistory200(data1000)}
          {racesCompleted1000 < 10 && timeIsUp === true && alert()}
        </div>
      </div>
    );
  };

  const testHistory200 = (DATA) => {
    return (
      <div>
        <h3>Tests History</h3>
        <div style={{ position: "relative", width: "60%", margin: "auto" }}>
          <div className="test-history-item">
            <h4 style={{ position: "absolute", left: "0vw" }}>Test #</h4>
            <h4 style={{ position: "absolute", left: "14vw" }}>wpm</h4>
            <h4 style={{ position: "absolute", left: "28vw" }}>Time</h4>
            <h4 style={{ position: "absolute", right: "0vw" }}>Mistakes</h4>
          </div>
        </div>
        <div className="tests-history">
          {DATA !== undefined &&
            DATA.slice(0)
              .reverse()
              .slice(0, seeAllHistory200 ? DATA.length : 20)
              .map((data, index) => {
                return (
                  <div
                    style={
                      index % 2 === 0
                        ? {
                            backgroundColor: colorFiles.backgroundColor,
                            position: "relative",
                          }
                        : { position: "relative" }
                    }
                    className="test-history-item"
                    key={index}
                  >
                    <h4 style={{ paddingLeft: "1vw" }}>{data.raceNumber}</h4>
                    <h4 style={{ position: "absolute", left: "13vw" }}>
                      {data.wpm}wpm
                    </h4>
                    <h4 style={{ position: "absolute", left: "28vw" }}>
                      {data.time}s
                    </h4>
                    <h4 style={{ position: "absolute", right: "1vw" }}>
                      {" "}
                      {data.mistakes}
                    </h4>
                  </div>
                );
              })}
        </div>
        <div>
          {!seeAllHistory200 && (
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSeeAllHistory200(true);
              }}
            >
              See all
            </h3>
          )}
        </div>
      </div>
    );
  };

  const testHistory1000 = (DATA) => {
    return (
      <div>
        <h3>Tests History</h3>
        <div style={{ position: "relative", width: "60%", margin: "auto" }}>
          <div className="test-history-item">
            <h4 style={{ position: "absolute", left: "0vw" }}>Test #</h4>
            <h4 style={{ position: "absolute", left: "14vw" }}>wpm</h4>
            <h4 style={{ position: "absolute", left: "28vw" }}>Time</h4>
            <h4 style={{ position: "absolute", right: "0vw" }}>Mistakes</h4>
          </div>
        </div>
        <div className="tests-history">
          {DATA !== undefined &&
            DATA.slice(0)
              .reverse()
              .slice(0, seeAllHistory1000 ? DATA.length : 20)
              .map((data, index) => {
                return (
                  <div
                    style={
                      index % 2 === 0
                        ? {
                            backgroundColor: colorFiles.backgroundColor,
                            position: "relative",
                          }
                        : { position: "relative" }
                    }
                    className="test-history-item"
                    key={index}
                  >
                    <h4 style={{ paddingLeft: "1vw" }}>{data.raceNumber}</h4>
                    <h4 style={{ position: "absolute", left: "13vw" }}>
                      {data.wpm}wpm
                    </h4>
                    <h4 style={{ position: "absolute", left: "28vw" }}>
                      {data.time}s
                    </h4>
                    <h4 style={{ position: "absolute", right: "1vw" }}>
                      {" "}
                      {data.mistakes}
                    </h4>
                  </div>
                );
              })}
        </div>
        <div>
          {!seeAllHistory1000 && (
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSeeAllHistory1000(true);
              }}
            >
              See all
            </h3>
          )}
        </div>
      </div>
    );
  };
  const testHistoryQuote = (DATA) => {
    return (
      <div>
        <h3>Tests History</h3>
        <div style={{ position: "relative", width: "60%", margin: "auto" }}>
          <div className="test-history-item">
            <h4 style={{ position: "absolute", left: "0vw" }}>Test #</h4>
            <h4 style={{ position: "absolute", left: "14vw" }}>wpm</h4>
            <h4 style={{ position: "absolute", left: "28vw" }}>Time</h4>
            <h4 style={{ position: "absolute", right: "0vw" }}>Mistakes</h4>
          </div>
        </div>
        <div className="tests-history">
          {DATA !== undefined &&
            DATA.slice(0)
              .reverse()
              .slice(0, seeAllHistoryQuote ? DATA.length : 20)
              .map((data, index) => {
                return (
                  <div
                    style={
                      index % 2 === 0
                        ? {
                            backgroundColor: colorFiles.backgroundColor,
                            position: "relative",
                          }
                        : { position: "relative" }
                    }
                    className="test-history-item"
                    key={index}
                  >
                    <h4 style={{ paddingLeft: "1vw" }}>{data.raceNumber}</h4>
                    <h4 style={{ position: "absolute", left: "13vw" }}>
                      {data.wpm}wpm
                    </h4>
                    <h4 style={{ position: "absolute", left: "28vw" }}>
                      {data.time}s
                    </h4>
                    <h4 style={{ position: "absolute", right: "1vw" }}>
                      {" "}
                      {data.mistakes}
                    </h4>
                  </div>
                );
              })}
        </div>
        <div>
          {!seeAllHistoryQuote && (
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSeeAllHistoryQuote(true);
              }}
            >
              See all
            </h3>
          )}
        </div>
      </div>
    );
  };

  const notLoggedIn = () => {
    return (
      <div style={{ color: colorFiles.fontColor }} className="log-in-message">
        <h4>Log in to see your statistics and the leaderboard.</h4>
      </div>
    );
  };

  return (
    <animated.div style={animation} className={"stats-page"}>
      {isLoggedIn && <Ladderboard isShown={isLadderBoardMenuOpen} />}

      <div
        style={{ backgroundColor: colorFiles.backgroundColor }}
        className={"Stats"}
      >
        <Header text="Yous statistics!" />
        <div className="statistics-select-buttons">
          <div
            onClick={() => {
              setIsTypingGameStatisticsShown(true);
              setIsTyping200StatisticsShown(false);
              setIsTyping1000StatisticsShown(false);
              setSeeAllHistory1000(false);
              setSeeAllHistory200(false);
              setSeeAllHistoryQuote(false);
            }}
            className={
              isTypingGameStatisticsShown
                ? "typing-game-button-active"
                : "typing-game-inactive"
            }
            style={
              isTypingGameStatisticsShown
                ? { backgroundColor: colorFiles.primaryColor }
                : {
                    backgroundColor: colorFiles.secondaryBackgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            <h4 style={{ pointerEvents: "none" }}>TypingGame</h4>
          </div>
          <div
            onClick={() => {
              setIsTypingGameStatisticsShown(false);
              setIsTyping200StatisticsShown(true);
              setIsTyping1000StatisticsShown(false);
              setSeeAllHistory1000(false);
              setSeeAllHistory200(false);
              setSeeAllHistoryQuote(false);
            }}
            className={
              isTyping200StatisticsShown
                ? "typing-game-button-active"
                : "typing-game-inactive"
            }
            style={
              isTyping200StatisticsShown
                ? { backgroundColor: colorFiles.primaryColor }
                : {
                    backgroundColor: colorFiles.secondaryBackgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            <h4 style={{ pointerEvents: "none" }}>Top 200</h4>
          </div>
          <div
            onClick={() => {
              setIsTypingGameStatisticsShown(false);
              setIsTyping200StatisticsShown(false);
              setIsTyping1000StatisticsShown(true);
              setSeeAllHistory1000(false);
              setSeeAllHistory200(false);
              setSeeAllHistoryQuote(false);
            }}
            className={
              isTyping1000StatisticsShown
                ? "typing-game-button-active"
                : "typing-game-inactive"
            }
            style={
              isTyping1000StatisticsShown
                ? { backgroundColor: colorFiles.primaryColor }
                : {
                    backgroundColor: colorFiles.secondaryBackgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            <h4 style={{ pointerEvents: "none" }}>Top 1000</h4>
          </div>
        </div>
        <hr style={{ background: colorFiles.hrColor }}></hr>
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
