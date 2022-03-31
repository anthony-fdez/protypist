import React, { useEffect, useState } from "react";
import "./userProfile.css";

import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

// Functions
import { formatTheTime } from "../../functions/formatTheTime";
import Modal from "../../../../helperComponents/modal/modal";
import { Button } from "@material-ui/core";
import {
  getAverage,
  getHighest,
  getRecentAverage,
  getTotalRaces,
  getTotalTime,
} from "../../functions/getTotals";

const UserProfile = ({ otherUserData, isOpen, handleClose }) => {
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../../../themes/${colors}`);

  const [selectedGameMode, setSelectedGameMode] = useState("quotes");
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [chartData, setChartData] = useState(null);

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

  useEffect(() => {
    if (!otherUserData) return;
    if (selectedGameMode === "quotes") {
      setChartData(getTheDataForTheChart(otherUserData.typingGameStatistics));
    } else if (selectedGameMode === "200") {
      setChartData(getTheDataForTheChart(otherUserData.typing200Statistics));
    } else if (selectedGameMode === "1000") {
      setChartData(getTheDataForTheChart(otherUserData.typing1000Statistics));
    }
  }, [otherUserData, selectedGameMode]);

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
            setSelectedGameMode("quotes");
          }}
          className={
            selectedGameMode === "quotes"
              ? "typing-game-button-active"
              : "typing-game-inactive"
          }
          style={
            selectedGameMode === "quotes"
              ? { backgroundColor: colorFiles.primaryColor }
              : {
                  backgroundColor: colorFiles.backgroundColor,
                  color: colorFiles.fontColor,
                }
          }
        >
          <i
            style={{ position: "absolute", left: "20px" }}
            className="fas fa-quote-left"
          ></i>
          <h4 style={{ pointerEvents: "none" }}>Quotes</h4>
        </div>
        <div
          onClick={() => {
            setSelectedGameMode("200");
          }}
          className={
            selectedGameMode === "200"
              ? "typing-game-button-active"
              : "typing-game-inactive"
          }
          style={
            selectedGameMode === "200"
              ? { backgroundColor: colorFiles.primaryColor }
              : {
                  backgroundColor: colorFiles.backgroundColor,
                  color: colorFiles.fontColor,
                }
          }
        >
          <i
            style={{ position: "absolute", left: "20px" }}
            className="fas fa-biking"
          ></i>
          <h4 style={{ pointerEvents: "none" }}>Top 200</h4>
        </div>
        <div
          onClick={() => {
            setSelectedGameMode("1000");
          }}
          className={
            selectedGameMode === "1000"
              ? "typing-game-button-active"
              : "typing-game-inactive"
          }
          style={
            selectedGameMode === "1000"
              ? { backgroundColor: colorFiles.primaryColor }
              : {
                  backgroundColor: colorFiles.backgroundColor,
                  color: colorFiles.fontColor,
                }
          }
        >
          <i
            style={{ position: "absolute", left: "20px" }}
            className="fas fa-car-side"
          ></i>
          <h4 style={{ pointerEvents: "none" }}>Top 1000</h4>
        </div>
      </div>
    );
  };

  const testHistory = ({ DATA }) => {
    if (DATA) {
      return (
        <div>
          <h3>Tests History</h3>
          <br></br>
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
              .slice(0, showFullHistory ? DATA.length : 20)
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
          {DATA.length > 20 && showFullHistory === false && (
            <div>
              {!showFullHistory && (
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowFullHistory(true);
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

  const selectCorrectTestHistory = () => {
    if (selectedGameMode === "quotes")
      return testHistory({ DATA: otherUserData.typingGameStatistics });

    if (selectedGameMode === "200")
      return testHistory({ DATA: otherUserData.typing200Statistics });

    if (selectedGameMode === "1000")
      return testHistory({ DATA: otherUserData.typing1000Statistics });
  };

  const profile = () => {
    if (!otherUserData)
      return (
        <div className="user-profile-error">
          <span>
            Unable to load the user's data at the moment, please try again later
          </span>
          <br></br>
          <Button
            variant="contained"
            style={{
              backgroundColor: colorFiles.primaryColor,
              color: "white",
            }}
            onClick={() => handleClose()}
          >
            Close
          </Button>
        </div>
      );

    if (!chartData) return;

    const wpm = chartData.wpm;
    const races = chartData.races;
    const mistakes = chartData.mistakes;

    const chartDataFormatted = {
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
              onClick={() => handleClose()}
              className="close-icon-login fas fa-times fa-2x"
            ></i>
          </div>
        </div>

        <div style={{ padding: "0rem 1rem 1rem 1rem" }}>
          <div style={{ textAlign: "center" }}>
            <div className={"all-time-div-stats"}>
              <div className="stats-box">
                <h5>Total time:</h5>
                <hr style={{ background: colorFiles.hrColor }}></hr>
                <h5 style={{ marginTop: "1rem" }}>
                  {formatTheTime(getTotalTime(otherUserData))}
                </h5>
              </div>
              <div className="stats-box">
                <h5>Races:</h5>
                <hr style={{ background: colorFiles.hrColor }}></hr>
                <h5 style={{ marginTop: "1rem" }}>
                  {getTotalRaces(otherUserData)}
                </h5>
              </div>
              <div className="stats-box">
                <h5>Highest:</h5>{" "}
                <hr style={{ background: colorFiles.hrColor }}></hr>
                <h5 style={{ marginTop: "1rem" }}>
                  {getHighest(otherUserData)}
                </h5>
              </div>
              <div className="stats-box">
                <h5>Average:</h5>{" "}
                <hr style={{ background: colorFiles.hrColor }}></hr>
                <h5 style={{ marginTop: "1rem" }}>
                  {getAverage(otherUserData)}
                </h5>
              </div>
              <div className="stats-box">
                <h5>Recent Avg:</h5>{" "}
                <hr style={{ background: colorFiles.hrColor }}></hr>
                <h5 style={{ marginTop: "1rem" }}>
                  {getRecentAverage(otherUserData)}
                </h5>
              </div>
            </div>
            <br></br>
            <div>
              <h4>Total Keystrokes: {otherUserData.total_key_strokes}</h4>
            </div>
            <br></br>
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
                data={chartDataFormatted}
              />
            </div>
          </div>
        </div>
        <br></br>
        {selectCorrectTestHistory()}
        <div style={{ padding: "1rem" }}></div>
      </div>
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} handleClose={handleClose}>
        {profile()}
      </Modal>
    </>
  );
};

export default UserProfile;
