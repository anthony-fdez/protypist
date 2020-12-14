import React from "react";
import "./ladderboard.css";
import "./otherPersonProfile.css";
import "./stats.css";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function Ladderboard(props) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const userId = useSelector((state) => state.userIdReducer);

  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("highest");
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [otherUserData, setOtherUserData] = useState(undefined);

  const [seeAllHistoryQuote, setSeeAllHistoryQuote] = useState(false);
  const [seeAllHistory200, setSeeAllHistory200] = useState(false);
  const [seeAllHistory1000, setSeeAllHistory1000] = useState(false);
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

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);
      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/highest", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [jwt]);

  const sortByWpm = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);
      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/wpm", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByHighest = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/highest", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByRaces = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/races", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByTime = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };
      setIsLoading(true);

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/time", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

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

  const getTheOtherUserData = (DATA) => {
    const headers = { Authorization: jwt };
    const data = {
      _id: DATA,
    };

    axios
      .post("https://protypist.herokuapp.com/users/getOtherUserData", data, {
        headers: headers,
      })
      .then((response) => {
        setOtherUserData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  const selectGameModeToShowComponent = () => {
    return (
      <div
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          borderBottom: "1px solid " + colorFiles.hrColor,
        }}
        className="statistics-select-buttons-leaderboard"
      >
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
                  backgroundColor: colorFiles.backgroundColor,
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
                  backgroundColor: colorFiles.backgroundColor,
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
                  backgroundColor: colorFiles.backgroundColor,
                  color: colorFiles.fontColor,
                }
          }
        >
          <h4 style={{ pointerEvents: "none" }}>Top 1000</h4>
        </div>
      </div>
    );
  };

  const testHistory200 = () => {
    if (otherUserData !== undefined) {
      let DATA = otherUserData.typing200Statistics;
      return (
        <div>
          <h3>Tests History</h3>
          <hr style={{ background: colorFiles.hrColor, width: "80%" }}></hr>
          {DATA.length !== 0 && (
            <div style={{ position: "relative", width: "80%", margin: "auto" }}>
              <div className="test-history-item">
                <h5 style={{ position: "absolute", left: "0vw" }}>Test #</h5>
                <h5 style={{ position: "absolute", right: "37vw" }}>wpm</h5>
                <h5 style={{ position: "absolute", right: "28vw" }}>Time</h5>
                <h5 style={{ position: "absolute", right: "19vw" }}>
                  Accuracy
                </h5>
                <h5 style={{ position: "absolute", right: "11vw" }}>
                  Mistakes
                </h5>
                <h5 style={{ position: "absolute", right: "2vw" }}>Date</h5>
              </div>
            </div>
          )}
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
                      <h4 style={{ position: "absolute", right: "36vw" }}>
                        {data.wpm}wpm
                      </h4>
                      <h4 style={{ position: "absolute", right: "28vw" }}>
                        {data.time}s
                      </h4>
                      <h4 style={{ position: "absolute", right: "12vw" }}>
                        {" "}
                        {data.mistakes}
                      </h4>
                      <h4 style={{ position: "absolute", right: "20vw" }}>
                        {" "}
                        {`${data.accuracy}%`}
                      </h4>
                      <p style={{ position: "absolute", right: "1vw" }}>
                        {" "}
                        {data.date}
                      </p>
                    </div>
                  );
                })}
          </div>
          {otherUserData.typing200Statistics !== undefined &&
            otherUserData.typing200Statistics.length > 20 &&
            seeAllHistory200 == false && (
              <div>
                {!seeAllHistoryQuote && (
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
            )}
          {otherUserData.typing200Statistics !== undefined &&
            otherUserData.typing200Statistics.length === 0 && (
              <div
                className="test-history-item"
                style={{
                  backgroundColor: colorFiles.backgroundColor,
                  color: colorFiles.fontColor,
                }}
              >
                <h4>Nothing to see here :(</h4>
              </div>
            )}
        </div>
      );
    }
  };

  const testHistory1000 = () => {
    if (otherUserData !== undefined) {
      let DATA = otherUserData.typing1000Statistics;

      return (
        <div>
          <h3>Tests History</h3>
          <hr style={{ background: colorFiles.hrColor, width: "80%" }}></hr>
          <div style={{ position: "relative", width: "80%", margin: "auto" }}>
            <div className="test-history-item">
              <h5 style={{ position: "absolute", left: "0vw" }}>Test #</h5>
              <h5 style={{ position: "absolute", right: "37vw" }}>wpm</h5>
              <h5 style={{ position: "absolute", right: "28vw" }}>Time</h5>
              <h5 style={{ position: "absolute", right: "19vw" }}>Accuracy</h5>
              <h5 style={{ position: "absolute", right: "11vw" }}>Mistakes</h5>
              <h5 style={{ position: "absolute", right: "2vw" }}>Date</h5>
            </div>
          </div>
          <div className="tests-history">
            {DATA.slice(0)
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
                    <h4 style={{ position: "absolute", right: "36vw" }}>
                      {data.wpm}wpm
                    </h4>
                    <h4 style={{ position: "absolute", right: "28vw" }}>
                      {data.time}s
                    </h4>
                    <h4 style={{ position: "absolute", right: "12vw" }}>
                      {" "}
                      {data.mistakes}
                    </h4>
                    <h4 style={{ position: "absolute", right: "20vw" }}>
                      {" "}
                      {`${data.accuracy}%`}
                    </h4>
                    <p style={{ position: "absolute", right: "1vw" }}>
                      {" "}
                      {data.date}
                    </p>
                  </div>
                );
              })}
          </div>
          {DATA.length > 20 && seeAllHistory1000 == false && (
            <div>
              {!seeAllHistoryQuote && (
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
          )}
          {DATA.length === 0 && (
            <div
              className="test-history-item"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
            >
              <h4>Nothing to see here :(</h4>
            </div>
          )}
        </div>
      );
    }
  };

  const testHistoryQuote = () => {
    if (otherUserData !== undefined) {
      const DATA = otherUserData.typingGameStatistics;

      return (
        <div>
          <h3>Tests History</h3>
          <hr style={{ background: colorFiles.hrColor, width: "80%" }}></hr>
          {DATA.length !== 0 && (
            <div style={{ position: "relative", width: "80%", margin: "auto" }}>
              <div className="test-history-item">
                <h5 style={{ position: "absolute", left: "0vw" }}>Test #</h5>
                <h5 style={{ position: "absolute", right: "37vw" }}>wpm</h5>
                <h5 style={{ position: "absolute", right: "28vw" }}>Time</h5>
                <h5 style={{ position: "absolute", right: "19vw" }}>
                  Accuracy
                </h5>
                <h5 style={{ position: "absolute", right: "11vw" }}>
                  Mistakes
                </h5>
                <h5 style={{ position: "absolute", right: "2vw" }}>Date</h5>
              </div>
            </div>
          )}
          <div className="tests-history">
            {DATA.slice(0)
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
                    <h4 style={{ position: "absolute", right: "36vw" }}>
                      {data.wpm}wpm
                    </h4>
                    <h4 style={{ position: "absolute", right: "28vw" }}>
                      {data.time}s
                    </h4>
                    <h4 style={{ position: "absolute", right: "12vw" }}>
                      {" "}
                      {data.mistakes}
                    </h4>
                    <h4 style={{ position: "absolute", right: "20vw" }}>
                      {" "}
                      {`${data.accuracy}%`}
                    </h4>
                    <p style={{ position: "absolute", right: "1vw" }}>
                      {" "}
                      {data.date}
                    </p>
                  </div>
                );
              })}
          </div>
          {DATA.length > 20 && seeAllHistoryQuote == false && (
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
          )}
          {DATA.length === 0 && (
            <div
              className="test-history-item"
              style={{
                backgroundColor: colorFiles.backgroundColor,
                color: colorFiles.fontColor,
              }}
            >
              <h4>Nothing to see here :(</h4>
            </div>
          )}
        </div>
      );
    }
  };

  const OtherPersonProfile = () => {
    const privateProfile = () => {
      return (
        <div
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
          className={"other-person-profile"}
        >
          <div
            style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
            className="other-user-header"
          >
            <div className="other-user-div-header">
              <h2>Name</h2>
              <i
                onClick={() => setUserProfileOpen(!userProfileOpen)}
                className="close-icon-login fas fa-times fa-2x"
              ></i>
            </div>
            <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
          </div>

          <div style={{ padding: "0rem 1rem 1rem 1rem" }}>
            <div style={{ textAlign: "center" }}>
              <h3>This is a private account</h3>
            </div>
          </div>
        </div>
      );
    };

    const otherPersonProfilePlaceHolder = () => {
      const placeHolderChartData = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "Mistakes",
            data: [2, 3, 5, 2, 34, 2, 4, 5, 2],
            borderWidth: 4,
            backgroundColor: colorFiles.fontColor,
          },
          {
            label: "WPM",
            data: [44, 58, 38, 48, 38, 48, 39, 29, 49],
            borderWidth: 5,
            backgroundColor: colorFiles.primaryColor,
          },
        ],
      };
      return (
        <div
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
          className={"other-person-profile"}
        >
          <div
            style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
            className="other-user-header"
          >
            <div className="other-user-div-header">
              <h2>Name</h2>
              <i
                onClick={() => setUserProfileOpen(!userProfileOpen)}
                className="close-icon-login fas fa-times fa-2x"
              ></i>
            </div>
            <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
          </div>

          <div style={{ padding: "0rem 1rem 1rem 1rem" }}>
            <div style={{ textAlign: "center" }}>
              <div className={"all-time-div-stats"}>
                <div className="stats-box">
                  <h5>Total time:</h5>
                  <hr style={{ background: colorFiles.hrColor }}></hr>
                  <h5 style={{ marginTop: "1rem" }}>00:00:00</h5>
                </div>
                <div className="stats-box">
                  <h5>Races:</h5>
                  <hr style={{ background: colorFiles.hrColor }}></hr>
                  <h5 style={{ marginTop: "1rem" }}>0</h5>
                </div>
                <div className="stats-box">
                  <h5>Highest:</h5>{" "}
                  <hr style={{ background: colorFiles.hrColor }}></hr>
                  <h5 style={{ marginTop: "1rem" }}>0</h5>
                </div>
                <div className="stats-box">
                  <h5>Average:</h5>{" "}
                  <hr style={{ background: colorFiles.hrColor }}></hr>
                  <h5 style={{ marginTop: "1rem" }}>0</h5>
                </div>
                <div className="stats-box">
                  <h5>Recent Avg:</h5>{" "}
                  <hr style={{ background: colorFiles.hrColor }}></hr>
                  <h5 style={{ marginTop: "1rem" }}>0</h5>
                </div>
              </div>
              {selectGameModeToShowComponent()}
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
                  data={placeHolderChartData}
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

    const otherPersonProfileTypingGame = () => {
      if (otherUserData !== undefined) {
        const data = getTheDataForTheChart(otherUserData.typingGameStatistics);
        const wpm = data.wpm;
        const races = data.races;
        const mistakes = data.mistakes;

        const chartData = {
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
        };

        return (
          <div
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={"other-person-profile"}
          >
            <div
              style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
              className="other-user-header"
            >
              <div className="other-user-div-header">
                <h2>{otherUserData.name}</h2>
                <i
                  onClick={() => setUserProfileOpen(!userProfileOpen)}
                  className="close-icon-login fas fa-times fa-2x"
                ></i>
              </div>
              <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
            </div>

            <div style={{ padding: "0rem 1rem 1rem 1rem" }}>
              <div style={{ textAlign: "center" }}>
                <div className={"all-time-div-stats"}>
                  <div className="stats-box">
                    <h5>Total time:</h5>
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {formatTheTime(otherUserData.totalTimeTyped)}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Races:</h5>
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {otherUserData.racesCompleted}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Highest:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {otherUserData.highestSpeedAllTime}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Average:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {Math.round(otherUserData.wpmAverageAllTime * 100) / 100}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Recent Avg:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {Math.round(otherUserData.wpmAverage10races * 100) / 100}
                    </h5>
                  </div>
                </div>
                {selectGameModeToShowComponent()}
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
                    data={chartData}
                  />
                </div>
              </div>
            </div>
            <hr style={{ background: colorFiles.hrColor }}></hr>
            {testHistoryQuote()}
            <div style={{ padding: "1rem" }}></div>
          </div>
        );
      }
    };

    const otherPersonProfile200 = () => {
      if (otherUserData !== undefined) {
        const data = getTheDataForTheChart(otherUserData.typing200Statistics);
        const wpm = data.wpm;
        const races = data.races;
        const mistakes = data.mistakes;

        const chartData = {
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
        };

        return (
          <div
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={"other-person-profile"}
          >
            <div
              style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
              className="other-user-header"
            >
              <div className="other-user-div-header">
                <h2>{otherUserData.name}</h2>
                <i
                  onClick={() => setUserProfileOpen(!userProfileOpen)}
                  className="close-icon-login fas fa-times fa-2x"
                ></i>
              </div>
              <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
            </div>
            <div style={{ padding: "0rem 1rem 1rem 1rem" }}>
              <div style={{ textAlign: "center" }}>
                <div className={"all-time-div-stats"}>
                  <div className="stats-box">
                    <h5>Total time:</h5>
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {formatTheTime(otherUserData.totalTimeTyped200)}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Races:</h5>
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {otherUserData.racesCompleted200}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Highest:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {otherUserData.highestSpeedAllTime200}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Average:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {Math.round(otherUserData.wpmAverageAllTime200 * 100) /
                        100}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Recent Avg:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {Math.round(
                        otherUserData.wpmAverageLast10Races200 * 100
                      ) / 100}
                    </h5>
                  </div>
                </div>
                {selectGameModeToShowComponent()}
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
                    data={chartData}
                  />
                </div>
              </div>
            </div>
            <hr style={{ background: colorFiles.hrColor }}></hr>
            {testHistory200()}
            <div style={{ padding: "1rem" }}></div>
          </div>
        );
      }
    };

    const otherPersonProfile1000 = () => {
      if (otherUserData !== undefined) {
        const data = getTheDataForTheChart(otherUserData.typing1000Statistics);
        const wpm = data.wpm;
        const races = data.races;
        const mistakes = data.mistakes;

        const chartData = {
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
        };

        return (
          <div
            style={{
              backgroundColor: colorFiles.secondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={"other-person-profile"}
          >
            <div
              style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
              className="other-user-header"
            >
              <div className="other-user-div-header">
                <h2>{otherUserData.name}</h2>
                <i
                  onClick={() => setUserProfileOpen(!userProfileOpen)}
                  className="close-icon-login fas fa-times fa-2x"
                ></i>
              </div>
              <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
            </div>

            <div style={{ padding: "0rem 1rem 1rem 1rem" }}>
              <div style={{ textAlign: "center" }}>
                <div className={"all-time-div-stats"}>
                  <div className="stats-box">
                    <h5>Total time:</h5>
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {formatTheTime(otherUserData.totalTimeTyped1000)}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Races:</h5>
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {otherUserData.racesCompleted1000}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Highest:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {otherUserData.highestSpeedAllTime1000}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Average:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {Math.round(otherUserData.wpmAverageAllTime1000 * 100) /
                        100}
                    </h5>
                  </div>
                  <div className="stats-box">
                    <h5>Recent Avg:</h5>{" "}
                    <hr style={{ background: colorFiles.hrColor }}></hr>
                    <h5 style={{ marginTop: "1rem" }}>
                      {Math.round(
                        otherUserData.wpmAverageLast10Races1000 * 100
                      ) / 100}
                    </h5>
                  </div>
                </div>
                {selectGameModeToShowComponent()}
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
                    data={chartData}
                  />
                </div>
              </div>
            </div>
            <hr style={{ background: colorFiles.hrColor }}></hr>
            {testHistory1000()}
            <div style={{ padding: "1rem" }}></div>
          </div>
        );
      }
    };

    if (otherUserData !== undefined) {
      if (otherUserData.error) {
        return privateProfile();
      } else if (isTypingGameStatisticsShown) {
        return otherPersonProfileTypingGame();
      } else if (isTyping200StatisticsShown) {
        return otherPersonProfile200();
      } else if (isTyping1000StatisticsShown) {
        return otherPersonProfile1000();
      }
    } else return otherPersonProfilePlaceHolder();
  };

  return (
    <div
      style={{
        backgroundColor: colorFiles.secondaryBackgroundColor,
        color: colorFiles.fontColor,
      }}
      className={props.isShown ? "Ladderboard-shown" : "Ladderboard-hidden"}
    >
      {userProfileOpen && <OtherPersonProfile />}
      <div
        onClick={() => setUserProfileOpen(!userProfileOpen)}
        className={userProfileOpen ? "dark-background-leaderboard" : ""}
      ></div>
      <div>
        <div className="ladderboard-header">
          <h2>Leaderboard</h2>
          {isLoading && (
            <div
              style={{
                color: colorFiles.fontColor,
              }}
              className={"loading-div-ladderboard"}
            >
              <div className="lds-ellipsis">
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className="loading-dot-dark"
                ></div>
              </div>
            </div>
          )}
        </div>

        <hr style={{ background: colorFiles.hrColor }}></hr>
        <div className="select-sort-method">
          <h4 className="mr-5">Sort by:</h4>
          <button
            onClick={() => {
              setSortBy("highest");
              sortByHighest();
            }}
            className={"btn  mr-2"}
            style={
              sortBy === "highest"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.contrastFontColor,
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            Highest
          </button>
          <button
            onClick={() => {
              setSortBy("wpm");
              sortByWpm();
            }}
            className={"btn  mr-2"}
            style={
              sortBy === "wpm"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.contrastFontColor,
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            WPM
          </button>
          <button
            onClick={() => {
              setSortBy("races");
              sortByRaces();
            }}
            className={"btn  mr-2"}
            style={
              sortBy === "races"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.contrastFontColor,
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            Races
          </button>
          <button
            onClick={() => {
              setSortBy("time");
              sortByTime();
            }}
            className={"btn  mr-2"}
            style={
              sortBy === "time"
                ? {
                    backgroundColor: colorFiles.primaryColor,
                    color: colorFiles.contrastFontColor,
                  }
                : {
                    backgroundColor: colorFiles.backgroundColor,
                    color: colorFiles.fontColor,
                  }
            }
          >
            Time
          </button>
        </div>
        <hr style={{ background: colorFiles.hrColor }}></hr>

        <i
          onClick={() => {
            dispatch({
              type: "TOGGLE_OPENING_LADDERBOARD_MENU",
            });
          }}
          className="fas fa-times fa-2x close-icon mt-3 mr-3"
        ></i>
      </div>
      <div className="ladderboard-info">
        <h5 className="ladderboard-name-info">Name</h5>
        <h5 className="ladderboard-races-info">Races</h5>
        <h5 className="ladderboard-averageWpm-info">Average</h5>
        <h5 className="ladderboard-info-higest">Highest</h5>
        <h5 className="ladderboard-time-info">Time</h5>
      </div>
      <div className="ladderboard-table">
        {data.map((user, index) => {
          return (
            <div
              onClick={() => {
                if (user.account === false) {
                  getTheOtherUserData(user._id);
                  setUserProfileOpen(!userProfileOpen);
                }
              }}
              key={index}
              className={"ladderboard-row"}
              style={
                userId === user._id
                  ? {
                      backgroundColor: colorFiles.primaryColor,
                      color: colorFiles.contrastFontColor,
                    }
                  : {
                      backgroundColor: colorFiles.backgroundColor,
                      color: colorFiles.fontColor,
                    }
              }
            >
              <h4 className="ladderboard-number-item">{index + 1}</h4>
              <h4 className="ladderboard-name-item">
                {user.name}
                {user.account === true && (
                  <i
                    style={{ transform: "scale(0.7)", marginLeft: "10px" }}
                    class="fas fa-lock"
                  ></i>
                )}
              </h4>
              <h4 className="ladderboard-races-item">{user.races}</h4>
              <h4 className="ladderboard-time-item">
                {formatTheTime(user.time)}
              </h4>
              <h4 className="ladderboard-averageWpm-item">
                {Math.round(user.averageWpm * 100) / 100}
              </h4>
              <h4 className="ladderboard-item-higest">{user.highestWpm}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ladderboard;
