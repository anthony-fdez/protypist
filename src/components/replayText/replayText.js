import React, { useState, useEffect } from "react";
import "./replayText.css";
import { useSelector, useDispatch } from "react-redux";
import Qwerty from "../inScreenKeyboard/qwerty";
import Dvorak from "../inScreenKeyboard/dvorak";
import Colemak from "../inScreenKeyboard/colemak";
import quotes from "../data/quotes.json";
import displayTheArray from "../functions/displayTheArray";
import axios from "axios";

const ReplayText = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
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
  const [finished, setFinished] = useState(false);

  //-----------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
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

  // const [isSubmitQuoteMenuOpen, setIsSubmitQuoteOpen] = useState(false);
  const [isErrorWarningShown, setIsErrorWarningShown] = useState(false);
  const [isSuccessWarningShown, setIsSuccssWarningShown] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [instaDeathFail, setInstaDeathFail] = useState(false);
  const [wpmAverageLast10races, setWpmAverage10races] = useState();
  const [wpmAverageAllTime, setWpmAverageAllTime] = useState();
  const [averageMistakes, setAverageMistakes] = useState();
  const isReplayComponentShown = useSelector(
    (state) => state.replayComponentShown
  );
  const [fastestRace, setFastestRace] = useState();

  const replayData = useSelector((state) => state.replayDataReducer);

  useEffect(() => {
    if (replayData) {
      setText(quotes[replayData[0].textTypedId - 1]);
      setTextTypedId(quotes[replayData[0].textTypedId - 1].id);

      setIsLoading(false);
    }
  }, [replayData]);

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
        time: timeSeconds,
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
    if (replayData !== null && replayData !== undefined) {
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
  }, [finished, newGame]);

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
    if (finished) {
      e.target.value = "";
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
      setMinutes(0);
      setTimeSeconds(0);
      setCharactersTyped(0);
      setMistakes(0);
      setRealMistakes(0);
      setProgress(1);
      calculateAccuracy();
      setInstaDeathFail(true);
      e.target.value = "";

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
      mistakes < 5
    ) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e.target.value = "";
      setIsRunning(false);
      setFinished(true);
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

    let inputArray = e.target.value.split(" ");
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].search("//f") !== -1) {
        e.target.value = "";
        setSpanArray(blankSpanArray);
        setInfoAboutCharacter(blankInfoArray);
        setFinished(true);
        setSeconds(0);
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
        setTimeSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isRunning === false) {
      let time = timeSeconds;
      setTimeSeconds(time);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
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

      setAccuracy(accuracy);
      return accuracy;
    }
  };

  const handleThemInTheFinishedPage = () => {
    if (finished) {
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
    setFinished(false);
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
        <button
          onClick={() => {
            setSpanArray(blankSpanArray);
            setInfoAboutCharacter(blankInfoArray);
            setFinished(true);
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
            !finished
              ? {
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
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
        </button>
        <div>
          {!finished && (
            <hr
              className="hr-progress"
              style={
                finished || !isRunning
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

          {!finished && displayTheStatistics()}
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
              This text info
            </h4>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => {
                  setSpanArray(blankSpanArray);
                  setInfoAboutCharacter(blankInfoArray);
                  setFinished(false);
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
                  color: colorFiles.contrastFontColor,
                }}
              >
                Type Again
              </button>
              <i
                onClick={() => setFinished(false)}
                className="close-icon-login fas fa-times fa-2x"
              ></i>
            </div>
          </div>
          <div className="info-about-text-bottom">
            <div className="info-about-text-text">
              <div>
                <div
                  style={{ position: "relative", width: "80%", margin: "auto" }}
                >
                  <div className="test-history-item">
                    <h5 style={{ position: "absolute", left: "0vw" }}>
                      Test #
                    </h5>
                    <h5 style={{ position: "absolute", right: "37vw" }}>wpm</h5>
                    <h5 style={{ position: "absolute", right: "28vw" }}>
                      Time
                    </h5>
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
                      position: "relative",
                    }}
                    className="test-history-item"
                  >
                    <h5 className="text-info-race-label">Latest</h5>
                    <h4 style={{ paddingLeft: "1vw" }}>
                      {replayData !== null &&
                        replayData[replayData.length - 1].raceNumber}
                    </h4>
                    <h4 style={{ position: "absolute", right: "36vw" }}>
                      {replayData !== null &&
                        replayData[replayData.length - 1].wpm}
                      wpm
                    </h4>
                    <h4 style={{ position: "absolute", right: "28vw" }}>
                      {replayData !== null &&
                        replayData[replayData.length - 1].time}
                      s
                    </h4>
                    <h4 style={{ position: "absolute", right: "12vw" }}>
                      {" "}
                      {replayData !== null &&
                        replayData[replayData.length - 1].mistakes}
                    </h4>
                    <h4 style={{ position: "absolute", right: "20vw" }}>
                      {" "}
                      {`${
                        replayData !== null &&
                        replayData[replayData.length - 1].accuracy
                      }%`}
                    </h4>
                    <p style={{ position: "absolute", right: "1vw" }}>
                      {" "}
                      {replayData !== null &&
                        replayData[replayData.length - 1].date}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: colorFiles.primaryColor,
                      position: "relative",
                      marginTop: "1rem",
                    }}
                    className="test-history-item"
                  >
                    <h5 className="text-info-race-label">Fastest</h5>
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
                      {" "}
                      {fastestRace !== undefined && fastestRace.mistakes}
                    </h4>
                    <h4 style={{ position: "absolute", right: "20vw" }}>
                      {" "}
                      {`${fastestRace !== undefined && fastestRace.accuracy}%`}
                    </h4>
                    <p style={{ position: "absolute", right: "1vw" }}>
                      {" "}
                      {fastestRace !== undefined && fastestRace.date}
                    </p>
                  </div>
                  <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
                    History for this race
                  </h4>
                  <hr></hr>
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
                            <p style={{ position: "absolute", right: "1vw" }}>
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
        <div className="input-zone-reply">
          <input
            maxLength={textArrayCharacters && textArrayCharacters.length}
            autoFocus
            onFocus={(e) => {
              setIsUserTyping(true);
            }}
            onBlur={(e) => {
              setIsUserTyping(false);
            }}
            onChange={(e) => {
              getAndCheckTheInput(e);
            }}
            placeholder="The test will begin when you start typing!"
            className={finished ? "input-box-hidden" : "input-box-shown"}
            style={{
              color: colorFiles.fontColor,
              borderBottom: `2px solid ${colorFiles.primaryColor}`,
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ReplayText;
