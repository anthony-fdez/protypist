import React, { useState, useEffect } from "react";
import "./replayText.css";
import { useSelector, useDispatch } from "react-redux";
import Qwerty from "../inScreenKeyboard/qwerty";
import Dvorak from "../inScreenKeyboard/dvorak";
import Colemak from "../inScreenKeyboard/colemak";
import quotes from "../data/quotes.json";
import displayTheArray from "../functions/displayTheArray";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const ReplayText = () => {
  const dispatch = useDispatch();

  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM = useSelector((state) => state.latestWPMReducerTypingGame);
  const latestErrors = useSelector(
    (state) => state.latestErrorsReducerTypingGame
  );
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const instaDeath = useSelector((state) => state.instaDeathReducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const keyboardLayout = useSelector((state) => state.selectKeyboardLayout);

  //state
  const [text, setText] = useState();
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);

  //-----------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [secondsStats, setSecondsStats] = useState(0);

  const [minutes, setMinutes] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [blankSpanArray] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [isUserTyping, setIsUserTyping] = useState(true);
  const [mistakesAlert, setMistakesAlert] = useState(false);

  const [progress, setProgress] = useState(1);
  const [realMistakes, setRealMistakes] = useState(0);
  const [textTypedId, setTextTypedId] = useState();
  const [accuracy, setAccuracy] = useState(0);

  const [isFinished, setIsFinished] = useState(false);
  const [rawWpm, setRawWpm] = useState();
  const [chartData, setChartData] = useState();
  const [highestWpm, setHighestWpm] = useState(0);
  const [lowestWpm, setLowestWpm] = useState(0);
  const [inputText, setInputText] = useState();
  const [
    charactersTyped_raceHistory,
    setCharactersTyped_raceHistory,
  ] = useState(0);
  const [time_raceHistory, setTime_raceHistory] = useState(0);
  const [wpm_raceHistory, setWpm_raceHistory] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [instaDeathFail, setInstaDeathFail] = useState(false);
  const isReplayComponentShown = useSelector(
    (state) => state.replayComponentShown
  );
  const [fastestRace, setFastestRace] = useState();

  const replayData = useSelector((state) => state.replayDataReducer);

  useEffect(() => {
    if (replayData) {
      if (replayData[0].textTypedId - 1 < 3000) {
        setText(quotes[replayData[0].textTypedId - 1]);
        setTextTypedId(quotes[replayData[0].textTypedId - 1].id);
      } else;

      setIsLoading(false);
    }
  }, [replayData]);

  useEffect(() => {
    if (isRunning) {
      setWpm_raceHistory(
        wpm_raceHistory.concat({
          wpm: calculateWordsPerMinute_raceHistory(),
          time: time_raceHistory,
        })
      );
      setCharactersTyped_raceHistory(0);
    }
  }, [time_raceHistory]);

  const calculateWordsPerMinute_raceHistory = () => {
    let charactersPerSecond = charactersTyped_raceHistory / 3;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    wordsPerMinute = Math.round(wordsPerMinute * 100) / 100;

    return wordsPerMinute;
  };

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setTime_raceHistory((time_raceHistory) => time_raceHistory + 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const getTheDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formatedTime = `${
      hour === 0 ? "00" : hour < 10 ? "0" + hour : hour
    }:${minute === 0 ? "00" : minute < 10 ? "0" + minute : minute} - ${
      month === 0 ? "00" : month < 10 ? "0" + month : month
    }/${day === 0 ? "00" : day < 10 ? "0" + day : day}/${year}`;

    return formatedTime;
  };

  const postTheDataToTheServer = () => {
    if (isLoggedIn) {
      const data = {
        wpm: calculateWordsPerMinute(),
        time: secondsStats,
        mistakes: realMistakes,
        textTypedId: textTypedId,
        date: getTheDate(),
        accuracy: calculateAccuracy(),
      };

      const headers = {
        Authorization: jwt,
      };

      axios
        .post("https://protypist.herokuapp.com/users/statistics", data, {
          headers: headers,
        })
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (isFinished) {
      const DATA = { _id: replayData[0].textTypedId };
      const headers = {
        Authorization: jwt,
      };

      axios
        .post("https://protypist.herokuapp.com/text/findById", DATA, {
          headers: headers,
        })
        .then((response) => {
          dispatch({
            type: "SET_REPLAY_DATA",
            payload: response.data,
          });
        });
    }
  }, [isFinished, newGame]);

  useEffect(() => {
    if (text !== undefined) {
      const splitedText = text.text.split("");
      let infoAboutCharacterObject = [];
      splitedText.map((character, index) => {
        let object = null;
        infoAboutCharacterObject.push(object);
        return null;
      });
      setBlankInfoArray(infoAboutCharacterObject);
      setTextArrayCharacters(splitedText);
      setInfoAboutCharacter(infoAboutCharacterObject);
    }
  }, [text]);

  useEffect(() => {
    if (newGame || instaDeathFail) {
      setSpanArray(blankSpanArray);
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, newGame, instaDeathFail]);

  useEffect(() => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        spanArray.push(
          <div style={{ color: colorFiles.noneColor }} className="none">
            {textArrayCharacters[i]}
          </div>
        );
      }
      setInfoAboutCharacter(spanArray);
    }
  }, [newGame, isFinished, instaDeathFail]);

  useEffect(() => {
    if (isFinished === true) {
      setSpanArray(blankSpanArray);
    } else {
      setSpanArray(
        displayTheArray(
          textArrayCharacters,
          charactersTyped,
          colorFiles,
          infoAboutCharacter
        )
      );
    }
  }, [charactersTyped, textArrayCharacters, isFinished, instaDeathFail]);

  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      let errors = 0;
      for (let i = 0; i < infoAboutCharacter.length; i++) {
        if (infoAboutCharacter[i] === false) {
          errors++;
        }
      }
      setMistakes(errors);
    }
  }, [charactersTyped]);

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    wordsPerMinute = Math.round(wordsPerMinute * 100) / 100;
    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };

  useEffect(() => {
    setNewGame(false);
    setInstaDeathFail(false);
  }, [newGame, instaDeathFail]);

  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      let errors = 0;
      for (let i = 0; i < infoAboutCharacter.length; i++) {
        if (infoAboutCharacter[i] === false) {
          errors++;
        }
      }
      setMistakes(errors);
    }
  }, [charactersTyped]);

  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      if (progress <= charactersTyped) {
        setProgress((progress) => progress + 1);
      }

      for (let i = 0; i < progress; i++) {
        if (charactersTyped === progress) {
          if (infoAboutCharacter[i] === false) {
            setRealMistakes((mistake) => (mistake = realMistakes + 1));
          }
        }
      }
    }
  }, [charactersTyped]);

  const getAndCheckTheInput = (e) => {
    if (realTimeWPM) {
      calculateWordsPerMinute();
    }
    if (isFinished) {
      e.target.value = "";
    }
    if (mistakes > 10) {
      setMistakesAlert(true);
    } else if (mistakes < 10) {
      setMistakesAlert(false);
    }

    if (realMistakes === 1 && instaDeath) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e.target.value = "";
      setIsRunning(false);
      setNewGame(true);
      setIsFinished(true);
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
      setRealMistakes(0);
      setProgress(1);
      calculateAccuracy();
      setCharactersTyped(0);
      setInputText("");
      setSeconds(0);
      setSecondsStats(0);
      dispatch({
        type: "SET_LATEST_WPM",
        payload: calculateWordsPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_ERRORS_TYPING_GAME",
        payload: realMistakes,
      });
    } else if (
      e.target.value.length === textArrayCharacters.length &&
      mistakes < 10
    ) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e.target.value = "";
      setIsRunning(false);
      setNewGame(true);
      setIsFinished(true);
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
      setRealMistakes(0);
      setProgress(1);
      calculateAccuracy();
      setCharactersTyped(0);
      setInputText("");

      dispatch({
        type: "SET_LATEST_WPM",
        payload: calculateWordsPerMinute(),
      });

      dispatch({
        type: "SET_LATEST_ERRORS_TYPING_GAME",
        payload: realMistakes,
      });

      if (isLoggedIn) {
        postTheDataToTheServer();
      }
    } else if (charactersTyped >= 1) {
      setIsRunning(true);
    }

    let inputArray = e.target.value.split(" ");
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].search("//f") !== -1) {
        e.target.value = "";
        setSpanArray(blankSpanArray);
        setInfoAboutCharacter(blankInfoArray);
        setIsFinished(true);
        setSeconds(0);
        setSecondsStats(0);
        setMinutes(0);
        setTimeSeconds(0);
        setCharactersTyped(0);
        setIsRunning(false);
        setMistakes(0);
        setRealMistakes(0);
        setProgress(1);
        calculateAccuracy();
      }
    }

    setCharactersTyped(e.target.value.length);
    if (textArrayCharacters !== undefined) {
      if (
        infoAboutCharacter[e.target.value.length] === false ||
        infoAboutCharacter[e.target.value.length] === true
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = null;
        array[e.target.value.length] = arrayItem;
        setInfoAboutCharacter(array);
      } else if (
        e.target.value[e.target.value.length - 1] ===
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = true;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
      } else if (
        e.target.value[e.target.value.length - 1] !==
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = false;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setTimeSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(interval);
    } else if (isRunning === false) {
      let time = timeSeconds;
      setTimeSeconds(time);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setSecondsStats((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  const displayWPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return wpm;
      } else return latestWPM;
    } else return latestWPM;
  };

  const calculateWithOfProgressBar = () => {
    if (textArrayCharacters !== undefined) {
      let percent = (charactersTyped / textArrayCharacters.length) * 100;
      return percent;
    }
  };

  const calculateAccuracy = () => {
    if (textArrayCharacters !== undefined) {
      const caractersRight = textArrayCharacters.length - realMistakes;
      const accuracy = Math.floor(
        (caractersRight / textArrayCharacters.length) * 100
      );

      return accuracy;
    }
  };

  const handleThemInTheFinishedPage = () => {
    if (isFinished) {
      return "about-the-text-shown-replay";
    } else return "about-the-text-hidden-replay";
  };

  const keyboardLayoutSelector = () => {
    if (keyboardLayout === "QWERTY") {
      return <Qwerty />;
    } else if (keyboardLayout === "DVORAK") {
      return <Dvorak />;
    } else if (keyboardLayout === "COLEMAK") {
      return <Colemak />;
    } else return <Qwerty />;
  };

  const resetData = () => {
    setWpm_raceHistory([]);
    setTime_raceHistory(0);
    setCharactersTyped_raceHistory(0);
    setIsRunning(false);
    setNewGame(true);
    setSpanArray(blankSpanArray);
    setInfoAboutCharacter(blankInfoArray);
    setCharactersTyped(0);
    setMistakes(0);
    setRealMistakes(0);
    setProgress(1);
    calculateAccuracy();
    setSeconds(0);
    setSecondsStats(0);
    setIsFinished(false);
    setInputText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWpm_raceHistory([]);
    setTime_raceHistory(0);
    setCharactersTyped_raceHistory(0);
    setSpanArray(blankSpanArray);
    setInfoAboutCharacter(blankInfoArray);
    setIsFinished(false);
    setSeconds(0);
    setSecondsStats(0);
    setTimeSeconds(0);
    setCharactersTyped(0);
    setIsRunning(false);
    setMistakes(0);
    setRealMistakes(0);
    setProgress(1);
    calculateAccuracy();
    setInputText("");
  };

  useEffect(() => {
    if (wpm_raceHistory.length !== 0) {
      let wpm = [];
      let time = [];

      for (let i = 0; i < wpm_raceHistory.length; i++) {
        wpm.push(wpm_raceHistory[i].wpm);
        time.push(wpm_raceHistory[i].time);
      }

      let wpmCount = 0;
      for (let i = 0; i < wpm.length; i++) {
        wpmCount = wpmCount + wpm[i];
      }

      let highest = 0;
      let lowest = 1000;

      for (let i = 0; i < wpm.length; i++) {
        if (wpm[i] > highest) {
          highest = wpm[i];
        }

        if (wpm[i] < lowest) {
          lowest = wpm[i];
        }
      }

      setHighestWpm(highest);
      setLowestWpm(lowest);

      const raw = wpmCount / wpm.length;

      setRawWpm(raw);

      const data = {
        labels: time,
        datasets: [
          {
            label: "Raw WPM",
            data: wpm,
            borderWidth: 5,
            backgroundColor: colorFiles.primaryColor,
          },
        ],
      };

      setChartData(data);
    }
  }, [isFinished]);

  useEffect(() => {
    if (wpm_raceHistory.length !== 0) {
      let wpm = [];
      let time = [];

      for (let i = 0; i < wpm_raceHistory.length; i++) {
        wpm.push(wpm_raceHistory[i].wpm);
        time.push(wpm_raceHistory[i].time);
      }

      let wpmCount = 0;
      for (let i = 0; i < wpm.length; i++) {
        wpmCount = wpmCount + wpm[i];
      }

      let highest = 0;
      let lowest = 1000;

      for (let i = 0; i < wpm.length; i++) {
        if (wpm[i] > highest) {
          highest = wpm[i];
        }

        if (wpm[i] < lowest) {
          lowest = wpm[i];
        }
      }

      setHighestWpm(highest);
      setLowestWpm(lowest);

      const raw = wpmCount / wpm.length;

      setRawWpm(raw);

      const data = {
        labels: time,
        datasets: [
          {
            label: "Raw WPM",
            data: wpm,
            borderWidth: 5,
            backgroundColor: colorFiles.primaryColor,
          },
        ],
      };

      setChartData(data);
    }
  }, [isFinished]);

  const displayTheStatistics = () => {
    return (
      <div className="statistics">
        <div className="d-flex">
          <h5 className="mr-1">WPM: {displayWPM()}</h5>
        </div>
        <div className="d-flex">
          <div className="d-flex mr-5">
            <h5 className="mr-1">Errors: {latestErrors}</h5>
          </div>
          <div style={{ marginRight: "4rem" }} className="d-flex">
            <h5 className="mr-2">Acuracy: </h5>
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
            >
              <i
                onClick={() =>
                  dispatch({
                    type: "SET_SHOW_REPLAY_COMPONENT",
                    payload: false,
                  })
                }
                className="close-icon-login fas fa-times fa-2x"
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsFinished(false);
  }, [isReplayComponentShown]);

  useEffect(() => {
    if (replayData !== null && replayData !== undefined) {
      let fastestWPM = 0;
      replayData.map((data, index) => {
        if (data.wpm > fastestWPM) {
          fastestWPM = data.wpm;
          setFastestRace(data);
        }
      });
    }
  }, [replayData]);

  const testHistory = () => {
    return (
      <div className="info-about-text-bottom">
        <div className="info-about-text-text">
          <div
            style={{
              padding: "0rem 2rem 2rem 2rem",
              height: "350px",
              width: "100%",
              position: "relative",
            }}
          >
            <Line
              position={"absolute"}
              width={100}
              height={100}
              options={{
                maintainAspectRatio: false,
                title: { text: "Words per minute over time", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true,
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
            <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <h5>Raw WPM: {Math.round(rawWpm * 100) / 100}</h5>
              <h5>WPM: {wpm}</h5>
              <h5>|</h5>
              <h5>Time: {Math.round(seconds * 100) / 100}s</h5>
              <h5>Highest: {highestWpm}</h5>
              <h5>Lowest: {lowestWpm}</h5>
              <h5>|</h5>
              <h5>Mistakes: {latestErrors}</h5>
              <h5>Accuracy: {accuracy}%</h5>
            </div>
            <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
            {!isLoggedIn && (
              <h5
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.backgroundColor,
                }}
                className="log-in-to-save-results"
                onClick={() => {
                  dispatch({
                    type: "SET_OPEN_LOGIN_MENU",
                    payload: true,
                  });
                }}
              >
                Log in to save your results
              </h5>
            )}
          </div>

          <div style={{ marginTop: "100px" }}>
            <h4 style={{ textAlign: "center" }}>Fastest Race</h4>
            <hr
              style={{ width: "80%", backgroundColor: colorFiles.hrColor }}
            ></hr>
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
            <div className="tests-history">
              <div
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.fontColor,
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  marginTop: "1rem",
                }}
                className="test-history-item"
              >
                <h4 style={{ paddingLeft: "1vw" }}>
                  {fastestRace !== undefined && fastestRace.raceNumber}
                </h4>
                <h4 style={{ position: "absolute", right: "36vw" }}>
                  {fastestRace !== undefined && fastestRace.wpm}
                  wpm
                </h4>
                <h4 style={{ position: "absolute", right: "28vw" }}>
                  {fastestRace !== undefined && fastestRace.time}s
                </h4>
                <h4 style={{ position: "absolute", right: "12vw" }}>
                  {fastestRace !== undefined && fastestRace.mistakes}
                </h4>
                <h4 style={{ position: "absolute", right: "20vw" }}>
                  {`${fastestRace !== undefined && fastestRace.accuracy}%`}
                </h4>
                <p style={{ position: "absolute", right: "1vw", margin: 0 }}>
                  {fastestRace !== undefined && fastestRace.date}
                </p>
              </div>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: "2rem",
                }}
              >
                History for this race
              </h4>
              <hr></hr>
              <div style={{ marginBottom: "70px" }}>
                {replayData !== null &&
                  replayData
                    .slice(0)
                    .reverse()
                    .map((data, index) => {
                      return (
                        <div
                          style={
                            index % 2 === 0
                              ? {
                                  backgroundColor:
                                    colorFiles.secondaryBackgroundColor,
                                  position: "relative",
                                }
                              : {
                                  position: "relative",
                                  backgroundColor: colorFiles.backgroundColor,
                                }
                          }
                          className="test-history-item"
                          key={index}
                        >
                          <h4 style={{ paddingLeft: "1vw" }}>
                            {data.raceNumber}
                          </h4>
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
                          <p
                            style={{
                              position: "absolute",
                              right: "1vw",
                              margin: 0,
                            }}
                          >
                            {" "}
                            {data.date}
                          </p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
        className={
          isReplayComponentShown ? "replay-text-shown" : "replay-text-hidden"
        }
      >
        <Button
          variant="contained"
          onClick={() => {
            setSpanArray(blankSpanArray);
            setInfoAboutCharacter(blankInfoArray);
            setIsFinished(true);
            setSeconds(0);
            setMinutes(0);
            setTimeSeconds(0);
            setCharactersTyped(0);
            setIsRunning(false);
            setMistakes(0);
            setRealMistakes(0);
            setProgress(1);
            calculateAccuracy();
          }}
          className="btn btn-light mr-3"
          style={
            !isFinished
              ? {
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.backgroundColor,
                  position: "absolute",
                  right: "0px",
                  bottom: "30px",
                }
              : {
                  opacity: 0,
                  pointerEvents: "none",
                }
          }
        >
          Show Statistics
        </Button>
        <div>
          {!isFinished && (
            <hr
              className="hr-progress"
              style={
                isFinished || !isRunning
                  ? {
                      width: "100%",
                      backgroundColor: colorFiles.primaryColor,
                      margin: 0,
                      marginBottom: "1rem",
                      marginTop: 0,
                    }
                  : {
                      width: calculateWithOfProgressBar() + "%",
                      backgroundColor: colorFiles.primaryColor,
                      margin: 0,
                      marginBottom: "1rem",
                      marginTop: 0,
                    }
              }
            ></hr>
          )}
          <p
            className={
              mistakesAlert
                ? "alert-danger alert-warning-shown-replay"
                : "alert-danger alert-warning-hidden-replay"
            }
          >
            <strong>Slow Down...</strong>
            the test won't stop unless you have less than 10 mistakes
          </p>
          {!isFinished && displayTheStatistics()}
        </div>
        <div
          className={
            isUserTyping ? "text-to-type-reply" : "text-to-type-dark-reply"
          }
        >
          {spanArray}
        </div>
        <div className={"keyboard-div-shown-reply"}>
          {keyboardOnScreen && keyboardLayoutSelector()}
        </div>
        <div
          style={{
            backgroundColor: colorFiles.backgroundColor,
            color: colorFiles.fontColor,
          }}
          className={handleThemInTheFinishedPage()}
        >
          <div
            style={{ backgroundColor: colorFiles.backgroundColor }}
            className="about-text-header-replay"
          >
            <h4
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Results
            </h4>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setSpanArray(blankSpanArray);
                  setInfoAboutCharacter(blankInfoArray);
                  setIsFinished(false);
                  setSeconds(0);
                  setMinutes(0);
                  setTimeSeconds(0);
                  setCharactersTyped(0);
                  setIsRunning(false);
                  setMistakes(0);
                  setRealMistakes(0);
                  setProgress(1);
                  calculateAccuracy();
                }}
                className="btn btn-light mr-3"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.backgroundColor,
                }}
              >
                <i className="fas fa-reply mr-2"></i>
                Type Again
              </Button>
              <i
                onClick={() => setIsFinished(false)}
                className="close-icon-login fas fa-times fa-2x"
              ></i>
            </div>
          </div>
          {testHistory()}
        </div>
        <div className="input-zone-reply">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="input-zone-form"
          >
            <input
              maxLength={textArrayCharacters && textArrayCharacters.length}
              autoFocus
              onFocus={() => {
                setIsUserTyping(true);
              }}
              onBlur={() => {
                setIsUserTyping(false);
              }}
              onChange={(e) => {
                setInputText(e.target.value);
                getAndCheckTheInput(e);
                setCharactersTyped_raceHistory(
                  (charactersTyped_raceHistory) =>
                    charactersTyped_raceHistory + 1
                );
              }}
              value={inputText}
              placeholder="The test will begin when you start typing!"
              className={isFinished ? "input-box-hidden" : "input-box-shown"}
              style={{
                color: colorFiles.fontColor,
                borderBottom: `2px solid ${colorFiles.primaryColor}`,
              }}
            ></input>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e)}
              variant="contained"
              style={{
                backgroundColor: colorFiles.primaryColor,
                color: "white",
                border: "none",
                transition: "0.3s",
                marginLeft: "1rem",
              }}
            >
              Restart
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReplayText;
