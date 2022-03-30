import React, { useState, useEffect } from "react";
import "./common1000.css";
import Header from "../header/header";

import displayTheArray from "../functions/displayTheArray";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import "../200/statsMenu.css";
import { Line } from "react-chartjs-2";
import { Button } from "@material-ui/core";

// Components
import Keyboard from "../inScreenKeyboard/keyboard";

function Common1000() {
  const dispatch = useDispatch();

  const length = useSelector((state) => state.lengthReducerAdvanced);
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM1000 = useSelector((state) => state.latestWPMReducer1000);

  const latestErrors = useSelector((state) => state.latestErrorsReducer1000);
  const instaDeath = useSelector((state) => state.instaDeathReducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const keyboardLayout = useSelector((state) => state.selectKeyboardLayout);
  const isTyping = useSelector((state) => state.isTypingReducer);
  const isFocusMode = useSelector((state) => state.isFocusModeReducer);

  //state
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);

  //-----------------------------------------------
  const [isFinished, setIsFinished] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [secondsStats, setSecondsStats] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [blankSpanArray] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [mistakesAlert, setMistakesAlert] = useState(false);
  const [differenceInWPM, setDifferenceInWPM] = useState(0);
  const [differenceInErrors, setDIfferenceInErrors] = useState(0);
  const [progress, setProgress] = useState(1);
  const [realMistakes, setRealMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [rawWpm, setRawWpm] = useState();
  const [chartData, setChartData] = useState();
  const [wpmAverageLast10races, setWpmAverage10races] = useState();
  const [wpmAverageAllTime, setWpmAverageAllTime] = useState();
  const [averageMistakes, setAverageMistakes] = useState();
  const [highestWpm, setHighestWpm] = useState(0);
  const [lowestWpm, setLowestWpm] = useState(0);
  const [inputText, setInputText] = useState();
  const [isUserTyping, setIsUserTyping] = useState(true);

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

  const postTheDataToTheServer = () => {
    if (isLoggedIn) {
      const data = {
        wpm: calculateWordsPerMinute(),
        time: secondsStats,
        mistakes: realMistakes,
        date: getTheDate(),
        accuracy: calculateAccuracy(),
      };
      const headers = {
        Authorization: jwt,
      };

      axios
        .post("https://protypist.herokuapp.com/users/statistics1000", data, {
          headers: headers,
        })
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/statistics1000", {
          headers: headers,
        })
        .then((response) => {
          setWpmAverage10races(response.data.wpmAverageLast10Races1000);
          setWpmAverageAllTime(response.data.wpmAverageAllTime1000);
          setAverageMistakes(response.data.averageMistakes1000);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [jwt]);

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

  //========= Convert the plain text into arrays //

  useEffect(() => {
    let json = require("../data/words.json");
    let wordsArray = [];
    let infoAboutCharacterObject = [];
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * 1000);
      let randomWord = json.english_expanded[random];

      for (let i = 0; i < randomWord.length; i++) {
        wordsArray.push(randomWord[i]);
      }
      wordsArray.push(" ");
    }
    wordsArray.map((character, index) => {
      let object = null;
      infoAboutCharacterObject.push(object);
      return null;
    });
    wordsArray.pop();
    setBlankInfoArray(infoAboutCharacterObject);
    setTextArrayCharacters(wordsArray);
    setInfoAboutCharacter(infoAboutCharacterObject);
  }, [newGame, length]);

  //========= Create a blank array of spans that has all its classes set to none //

  useEffect(() => {
    if (newGame === true) {
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
  }, [charactersTyped, textArrayCharacters, newGame]);

  useEffect(() => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        spanArray.push(<div className="none">{textArrayCharacters[i]}</div>);
      }
      setInfoAboutCharacter(spanArray);
    }
  }, [newGame]);
  useEffect(() => {
    if (isRunning === true) {
      dispatch({
        type: "SET_PREVIOUS_ERRORS_1000",
        payload: latestErrors,
      });
    }

    const last10races = parseInt(wpmAverageLast10races);

    const valueToCompare =
      wpmAverageLast10races === 0 ? wpmAverageAllTime : last10races;

    const differenceWPM =
      Math.round((latestWPM1000 - valueToCompare) * 100) / 100;
    const differenceErrors =
      Math.round((latestErrors - averageMistakes) * 100) / 100;

    setDIfferenceInErrors(differenceErrors);
    setDifferenceInWPM(differenceWPM);
  }, [isRunning, wpmAverageAllTime, averageMistakes]);

  //========= Display the errors the user makes //

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
  }, [newGame]);

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
    if (mistakes > 10) {
      setMistakesAlert(true);
    } else if (mistakes < 10) {
      setMistakesAlert(false);
    }

    if (realMistakes === 1 && instaDeath) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e = "";
      setIsRunning(false);
      setNewGame(true);
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
      setRealMistakes(0);
      setProgress(1);
      calculateAccuracy();
      setCharactersTyped(0);
      setSeconds(0);
      setInputText("");
      setSecondsStats(0);

      dispatch({
        type: "SET_LATEST_WPM_1000",
        payload: calculateWordsPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_ERRORS_1000",
        payload: realMistakes,
      });
    } else if (e.length === textArrayCharacters.length && mistakes < 10) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e = "";
      setIsRunning(false);
      setIsFinished(true);
      setNewGame(true);
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
      setRealMistakes(0);
      setProgress(1);
      setCharactersTyped(0);
      calculateAccuracy();
      dispatch({
        type: "SET_LATEST_WPM_1000",
        payload: calculateWordsPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_ERRORS_1000",
        payload: realMistakes,
      });

      if (isLoggedIn) {
        postTheDataToTheServer();
      }
    } else if (charactersTyped >= 1) {
      setIsRunning(true);
    }

    let inputArray = e.split(" ");
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].search("//f") !== -1) {
        e = "";
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
      }
    }

    setCharactersTyped(e.length);
    if (textArrayCharacters) {
      console.log(e.length);
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

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

  const displayWPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return wpm;
      } else return latestWPM1000;
    } else return latestWPM1000;
  };

  const calculateWithOfProgressBar = () => {
    if (textArrayCharacters !== undefined) {
      let percent = (charactersTyped / textArrayCharacters.length) * 100;
      if (percent > 100) {
        return 100;
      }
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
    setIsFinished(false);
    setInputText("");
    setSecondsStats(0);
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
    setTimeSeconds(0);
    setCharactersTyped(0);
    setIsRunning(false);
    setMistakes(0);
    setRealMistakes(0);
    setProgress(1);
    calculateAccuracy();
    setInputText("");
    setSecondsStats(0);
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

  const statsMenu = () => {
    return (
      <div
        style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
        className={isFinished ? "stats-menu-shown" : "stats-menu-hidden"}
      >
        <h2>Results</h2>
        <i
          onClick={() => resetData()}
          style={{ position: "absolute", top: "20px", right: "30px" }}
          className="close-icon-login fas fa-times fa-2x"
        ></i>
        <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
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
      </div>
    );
  };

  return (
    <animated.div style={animation} className={"TypingTest-page"}>
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
        }}
        className={isTyping ? "TypingTest-On" : "TypingTest-Off"}
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
                : ""}
            </h5>
          </div>

          <div className="d-flex">
            <div className="d-flex mr-5">
              <h5 className="mr-1">
                Errors: {latestErrors} {isLoggedIn && "|"}
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
        <hr
          style={
            !isRunning
              ? { width: "100%", backgroundColor: colorFiles.primaryColor }
              : {
                  width: calculateWithOfProgressBar() + "%",
                  backgroundColor: colorFiles.primaryColor,
                }
          }
          className="hr-progress"
        ></hr>
        {/* <p
          className={
            isRunning
              ? "alert-primary alert-hidden"
              : "alert-primary alert-shown"
          }
        >
          {isUserTyping
            ? "Start typing... Start to type the text below whenever you are ready :)"
            : "Click on the input box to start typing."}
        </p> */}
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
        <div className={isUserTyping ? "text-to-type" : "text-to-type-dark"}>
          {spanArray}
        </div>
        <Keyboard />
        <div className="input-zone">
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
                getAndCheckTheInput(e.target.value);
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
    </animated.div>
  );
}

export default Common1000;
