import React, { useState, useEffect, useRef } from "react";
import Header from "../header/header";
import displayTheArray from "../functions/displayTheArray";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import quotes from "../data/quotes.json";
import { Button } from "@material-ui/core";
import "../stats/stats.css";
import "../200/statsMenu.css";
import { Line } from "react-chartjs-2";

// Components
import Keyboard from "../inScreenKeyboard/keyboard";
import { preventUsingArrows } from "../../functions/preventUsingArrows";
import Modal from "../../helperComponents/modal/modal";

function TypingTest() {
  const dispatch = useDispatch();

  const inputRef = useRef();

  //redux reducers
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
  const isTyping = useSelector((state) => state.isTypingReducer);
  const isFocusMode = useSelector((state) => state.isFocusModeReducer);

  //state
  const [text, setText] = useState();
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);
  const [finished, setFinished] = useState(false);

  //-----------------------------------------------
  const [isFinished, setIsFinished] = useState(false);
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
  const [differenceInWPM, setDifferenceInWPM] = useState(0);
  const [differenceInErrors, setDIfferenceInErrors] = useState(0);
  const [progress, setProgress] = useState(1);
  const [realMistakes, setRealMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [textTypedId, setTextTypedId] = useState();
  const [textTypedHistory, setTextTypedHistory] = useState([]);
  const [highestSpeed, setHighestSpeed] = useState();
  const [highestSpeedDate, setHighestSpeedDate] = useState();
  const [rawWpm, setRawWpm] = useState();
  const [chartData, setChartData] = useState();

  // const [isSubmitQuoteMenuOpen, setIsSubmitQuoteOpen] = useState(false);
  const [isErrorWarningShown, setIsErrorWarningShown] = useState(false);
  const [isSuccessWarningShown, setIsSuccssWarningShown] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [instaDeathFail, setInstaDeathFail] = useState(false);
  const [wpmAverageLast10races, setWpmAverage10races] = useState();
  const [wpmAverageAllTime, setWpmAverageAllTime] = useState();
  const [averageMistakes, setAverageMistakes] = useState();
  const [highestSpeedAllTime, setHighestSpeedOfAllTime] = useState();
  const [quoteSource, setQuoteSource] = useState();
  const [highestWpm, setHighestWpm] = useState(0);
  const [lowestWpm, setLowestWpm] = useState(0);
  const [inputText, setInputText] = useState();

  useEffect(() => {
    let myTimeout;
    if (isErrorWarningShown || isSuccessWarningShown) {
      myTimeout = setTimeout(() => {
        setIsErrorWarningShown(false);
        setIsSuccssWarningShown(false);
      }, 3000);
    }
    return () => clearTimeout(myTimeout);
  }, [isErrorWarningShown, isSuccessWarningShown]);

  const [charactersTyped_raceHistory, setCharactersTyped_raceHistory] =
    useState(0);
  const [time_raceHistory, setTime_raceHistory] = useState(0);
  const [wpm_raceHistory, setWpm_raceHistory] = useState([]);
  const [mistakes_raceHistory, setMistakes_raceHistory] = useState(0);

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

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setTime_raceHistory((time_raceHistory) => time_raceHistory + 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const calculateWordsPerMinute_raceHistory = () => {
    let charactersPerSecond = charactersTyped_raceHistory / 3;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    wordsPerMinute = Math.round(wordsPerMinute * 100) / 100;

    return wordsPerMinute;
  };

  //========================================================

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

  const selectNewRandomText = () => {
    const randomNumber = Math.floor(Math.random() * quotes.length);
    setText(quotes[randomNumber]);
    setTextTypedId(quotes[randomNumber].id);
    setQuoteSource(quotes[randomNumber].source);

    setIsLoading(false);
  };

  useEffect(() => {
    selectNewRandomText();
  }, [newGame, jwt]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/statistics", {
          headers: headers,
        })
        .then((response) => {
          setWpmAverage10races(response.data.wpmAverageLast10Races);
          setWpmAverageAllTime(response.data.wpmAverageAllTime);
          setAverageMistakes(response.data.averageMistakes);
          setHighestSpeedOfAllTime(response.data.highestSpeedAllTime);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [jwt]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = {
        Authorization: jwt,
      };
      const data = {
        textTypedId: textTypedId,
      };

      axios
        .post("https://protypist.herokuapp.com/users/getRaceScores", data, {
          headers: headers,
        })
        .then((res) => {
          setTextTypedHistory(res.data);
          getTheHighestSpeedForARace(res.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [textTypedId]);

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
  }, [newGame, finished, instaDeathFail]);

  useEffect(() => {
    if (finished === true) {
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
  }, [charactersTyped, textArrayCharacters, finished, instaDeathFail]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch({
        type: "SET_PREVIOUS_ERRORS_TYPING_GAME",
        payload: latestErrors,
      });
    }

    const last10races = parseInt(wpmAverageLast10races);

    const valueToCompare =
      wpmAverageLast10races === 0 ? wpmAverageAllTime : last10races;

    const differenceWPM = Math.round((latestWPM - valueToCompare) * 100) / 100;
    const differenceErrors =
      Math.round((latestErrors - averageMistakes) * 100) / 100;

    setDIfferenceInErrors(differenceErrors);
    setDifferenceInWPM(differenceWPM);
  }, [isRunning, wpmAverageAllTime, averageMistakes]);

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
    setNewGame(false);
    setInstaDeathFail(false);
  }, [newGame, instaDeathFail]);

  //real errors
  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      if (progress <= charactersTyped) {
        setProgress((progress) => progress + 1);
      }

      if (charactersTyped === progress) {
        if (infoAboutCharacter[charactersTyped - 1] === false) {
          setRealMistakes((mistake) => (mistake = realMistakes + 1));
        }
      }
    }
  }, [charactersTyped]);

  //========= Calculate words per minute //

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    wordsPerMinute = Math.round(wordsPerMinute * 100) / 100;

    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };

  const getAndCheckTheInput = (e) => {
    if (realTimeWPM) {
      calculateWordsPerMinute();
    }
    if (finished) {
      e = "";
    }
    if (mistakes > 10) {
      setMistakesAlert(true);
    } else if (mistakes < 10) {
      setMistakesAlert(false);
    }

    if (realMistakes === 1 && instaDeath) {
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
      setSeconds(0);
      setSecondsStats(0);
      setMinutes(0);
      setTimeSeconds(0);
      setCharactersTyped(0);
      setMistakes(0);
      setRealMistakes(0);
      setProgress(1);
      calculateAccuracy();
      setInstaDeathFail(true);
      setInputText("");
      e = "";

      dispatch({
        type: "SET_LATEST_WPM",
        payload: calculateWordsPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_ERRORS_TYPING_GAME",
        payload: realMistakes,
      });
    } else if (e.length === textArrayCharacters.length && mistakes < 10) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e = "";
      setIsRunning(false);
      setFinished(true);
      setIsFinished(true);
      calculateAccuracy();
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

    setCharactersTyped(e.length);

    if (textArrayCharacters) {
      const array = infoAboutCharacter;

      infoAboutCharacter.forEach((item, index) => {
        if (index < e.length) return null;

        array[index] = null;
      });

      if (infoAboutCharacter[e.length] !== null) {
        array[e.length] = null;
        setInfoAboutCharacter(array);
      } else if (e[e.length - 1] === textArrayCharacters[e.length - 1]) {
        array[e.length - 1] = true;

        setInfoAboutCharacter(array);
      } else if (e[e.length - 1] !== textArrayCharacters[e.length - 1]) {
        array[e.length - 1] = false;

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
    } else if (isRunning === false && isFinished === false) {
      let time = timeSeconds;
      setTimeSeconds(time);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      dispatch({
        type: "SET_IS_TEST_RUNNING",
        payload: isRunning,
      });
    } else {
      dispatch({
        type: "SET_IS_TEST_RUNNING",
        payload: false,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

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

      setAccuracy(accuracy);
      return accuracy;
    }
  };

  const getTheHighestSpeedForARace = (data) => {
    if (data.length === 0) {
      setHighestSpeed("No Data");
      setHighestSpeedDate("No Data");
      return 0;
    }

    let speed = 0;
    let date = "";

    for (let i = 0; i < data.length; i++) {
      if (data[i].wpm > speed) {
        speed = data[i].wpm;
        date = data[i].date;
      }
      setHighestSpeed(speed);
      setHighestSpeedDate(date);
    }
  };

  const successWarning = () => {
    return (
      <div
        style={{ left: "200px" }}
        className={
          isSuccessWarningShown
            ? "success-warning-shown bg-primary"
            : "success-warning-hidden bg-primary"
        }
      >
        <h5>{message}</h5>
      </div>
    );
  };

  const errorWarning = () => {
    return (
      <div
        style={{ left: "200px" }}
        className={
          isErrorWarningShown
            ? "error-warning-shown bg-danger"
            : "error-warning-hidden bg-danger"
        }
      >
        <h4 style={{ marginRight: "10px" }}>
          <strong>Error: </strong>
        </h4>
        <h5>{message}</h5>
      </div>
    );
  };

  const resetData = () => {
    setWpm_raceHistory([]);
    setTime_raceHistory(0);
    setCharactersTyped_raceHistory(0);
    setSpanArray(blankSpanArray);
    setInfoAboutCharacter(blankInfoArray);
    setFinished(false);
    setIsFinished(false);
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

  const handleCloseFinishedModal = () => {
    setFinished(false);
  };

  const statsMenu = () => {
    return (
      <Modal isOpen={isFinished} handleClose={handleCloseFinishedModal}>
        <div
          style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
          className={isFinished ? "stats-menu-shown" : "stats-menu-hidden"}
        >
          <h2>Results</h2>
          <br></br>
          <i
            onClick={() => resetData()}
            style={{ position: "absolute", top: "20px", right: "30px" }}
            className="close-icon-login fas fa-times fa-2x"
          ></i>
          <div
            style={{
              padding: "0rem 2rem 2rem 2rem",
              height: "60%",
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
            <hr></hr>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ display: "flex", alignItems: "center" }}>
                Source: {quoteSource}
              </h4>
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    setWpm_raceHistory([]);
                    setTime_raceHistory(0);
                    setCharactersTyped_raceHistory(0);
                    setSpanArray(blankSpanArray);
                    setInfoAboutCharacter(blankInfoArray);
                    setFinished(false);
                    setIsFinished(false);
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
                    setInputText("");
                  }}
                  className="mr-3"
                  style={{
                    backgroundColor: colorFiles.primaryColor,
                    color: "white",
                    border: "none",
                  }}
                >
                  <i className="fas fa-reply mr-2"></i>
                  Type Again
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setWpm_raceHistory([]);
                    setTime_raceHistory(0);
                    setCharactersTyped_raceHistory(0);
                    setSpanArray(blankSpanArray);
                    setInfoAboutCharacter(blankInfoArray);
                    setFinished(false);
                    setNewGame(true);
                    setRealMistakes(0);
                    calculateAccuracy();
                    setIsFinished(false);
                    setInputText("");
                  }}
                  style={{
                    backgroundColor: colorFiles.primaryColor,
                    color: "white",
                    border: "none",
                  }}
                >
                  <i className="fas fa-arrow-right mr-2"></i>
                  New Text
                </Button>
              </div>
            </div>
            <br></br>
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
        </div>
      </Modal>
    );
  };

  const displayTheStatistics = () => {
    return (
      <div className="statistics">
        <div className="d-flex">
          <h5 className="mr-1">
            WPM: {displayWPM()} {isLoggedIn && "|"}
          </h5>
          <h5
            style={
              differenceInWPM > 0
                ? { color: "rgb(41, 230, 50)" }
                : { color: "rgba(230, 41, 41)" }
            }
          >
            {isLoggedIn
              ? differenceInWPM > 0
                ? `+${differenceInWPM}`
                : differenceInWPM
              : ""}{" "}
          </h5>
        </div>
        <div className="d-flex">
          <div className="d-flex mr-5">
            <h5 className="mr-1">
              Errors: {latestErrors} {isLoggedIn && "|"}{" "}
            </h5>
            <h5
              style={
                differenceInErrors < 0
                  ? { color: "rgb(41, 230, 50)" }
                  : { color: "rgba(230, 41, 41)" }
              }
            >
              {isLoggedIn
                ? differenceInErrors > 0
                  ? `+${differenceInErrors}`
                  : differenceInErrors
                : ""}
            </h5>
          </div>
          <div className="d-flex">
            <h5 className="mr-2">Acuracy: </h5>
            <h5
              style={
                accuracy > 96
                  ? { color: "rgb(41, 230, 50)" }
                  : { color: colorFiles.fontColor }
              }
            >
              {accuracy === 0 ? "..." : `${accuracy}%`}
            </h5>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWpm_raceHistory([]);
    setTime_raceHistory(0);
    setCharactersTyped_raceHistory(0);
    setSpanArray(blankSpanArray);
    setInfoAboutCharacter(blankInfoArray);
    setFinished(false);
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
    setInputText("");
    setIsRunning(false);
  };

  return (
    <animated.div style={animation} className={"TypingTest-page"}>
      <div
        onClick={() =>
          dispatch({
            type: "TOGGLE_OPENING_SIDE_MENU",
          })
        }
      ></div>
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
        }}
        className={isTyping && isFocusMode ? "TypingTest-On" : "TypingTest-Off"}
      >
        {statsMenu()}
        <div
          onClick={() => resetData()}
          className={
            isFinished
              ? "darkened-background-shown"
              : "darkened-background-hidden"
          }
        ></div>
        <Header />
        {displayTheStatistics()}
        {errorWarning()}
        {successWarning()}
        <hr
          style={
            finished || !isRunning
              ? { width: "100%", backgroundColor: colorFiles.primaryColor }
              : {
                  width: calculateWithOfProgressBar() + "%",
                  backgroundColor: colorFiles.primaryColor,
                }
          }
          className="hr-progress"
        ></hr>
        <p
          className={
            mistakesAlert
              ? "alert-danger alert-warning-shown"
              : "alert-danger alert-warning-hidden"
          }
        >
          <strong>Slow Down...</strong>
          the test won't stop unless you have less than 10 mistakes
        </p>
        <div
          onClick={() => {
            inputRef.current.focus();
          }}
          className={isUserTyping ? "text-to-type" : "text-to-type-dark"}
        >
          {spanArray}
        </div>
        <div
          className={
            finished || (isTyping && isFocusMode)
              ? "keyboard-div-hidden"
              : "keyboard-div-shown"
          }
        >
          {keyboardOnScreen && <Keyboard />}
        </div>
        <Button
          variant="contained"
          onClick={() => {
            selectNewRandomText();
          }}
          style={
            isRunning || finished
              ? {
                  backgroundColor: colorFiles.primaryColor,
                  color: "white",
                  border: "none",
                  opacity: 0,
                  transition: "0.3s",
                  pointerEvents: "none",
                }
              : {
                  backgroundColor: colorFiles.primaryColor,
                  color: "white",
                  border: "none",
                  transition: "0.3s",
                  transform: "translatey(-30px)",
                }
          }
        >
          Type A Different Text
        </Button>
        <div className="input-zone">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="input-zone-form"
          >
            <input
              ref={inputRef}
              maxLength={textArrayCharacters && textArrayCharacters.length}
              autoFocus
              onFocus={() => {
                setIsUserTyping(true);
              }}
              onBlur={() => {
                setIsUserTyping(false);
              }}
              onKeyDown={(e) => {
                preventUsingArrows(e);
              }}
              onChange={(e) => {
                setInputText(e.target.value);
                getAndCheckTheInput(e.target.value);
                setCharactersTyped_raceHistory(
                  (charactersTyped_raceHistory) =>
                    charactersTyped_raceHistory + 1
                );
              }}
              value={inputText}
              placeholder="The test will begin when you start typing!"
              className="input-box"
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
    </animated.div>
  );
}

export default TypingTest;
