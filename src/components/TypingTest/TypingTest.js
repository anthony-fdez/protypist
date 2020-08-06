import React, { useState, useEffect, useDebugValue } from "react";
import "./TypingTest.css";

//components
import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";
import KeyboardDark from "../inScreenKeyboard/keyboard-dark";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";

function TypingTest() {
  const dispatch = useDispatch();

  //redux reducers
  const theme = useSelector((state) => state.darkModeReducer);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const previousWPM = useSelector(
    (state) => state.previousWPMReducerTypingGame
  );
  const previousCPM = useSelector(
    (state) => state.previousCPMReducerTypingGame
  );
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM = useSelector((state) => state.latestWPMReducerTypingGame);
  const latestCPM = useSelector((state) => state.latestCPMReducerTypingGame);
  const latestErrors = useSelector(
    (state) => state.latestErrorsReducerTypingGame
  );
  const previousErrors = useSelector(
    (state) => state.previousErrorsReducerTypingGame
  );
  const isSideMenuOpen = useSelector((state) => state.openSideMenuReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

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
  const [cpm, setCPM] = useState(0);
  const [isUserTyping, setIsUserTyping] = useState(true);
  const [mistakesAlert, setMistakesAlert] = useState(false);
  const [differenceInWPM, setDifferenceInWPM] = useState(0);
  const [differenceInCPM, setDIfferenceInCPM] = useState(0);
  const [differenceInErrors, setDIfferenceInErrors] = useState(0);
  const [progress, setProgress] = useState(1);
  const [realMistakes, setRealMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const [textTypedId, setTextTypedId] = useState();
  const [textTypedHistory, setTextTypedHistory] = useState([]);

  const [highestSpeed, setHighestSpeed] = useState();
  const [highestSpeedDate, setHighestSpeedDate] = useState();

  //========================================================

  const postTheDataToTheServer = () => {
    const data = {
      wpm: calculateWordsPerMinute(),
      time: seconds,
      mistakes: realMistakes,
      textTypedId: textTypedId,
      date: getTheDate(),
    };
    const headers = {
      Authorization: jwt,
    };

    axios
      .post("http://localhost:5000/users/statistics", data, {
        headers: headers,
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const headers = {
      Authorization: jwt,
    };

    axios
      .get("http://localhost:5000/texts/getRandom", { headers: headers })
      .then((res) => {
        setText(res.data[0]);
        if (isLoggedIn) {
          setTextTypedId(res.data[0]._id);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [newGame]);

  useEffect(() => {
    const headers = {
      Authorization: jwt,
    };
    const data = {
      textTypedId: textTypedId,
    };

    axios
      .post("http://localhost:5000/users/getRaceScores", data, {
        headers: headers,
      })
      .then((res) => {
        setTextTypedHistory(res.data);
        getTheHighestSpeedForARace(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [isSideMenuOpen]);

  const getTheDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formatedTime = `${
      hour === 0 ? "00" : hour < 10 ? "0" + hour : hour
    }:${minute === 0 ? "00" : minute < 10 ? "0" + minute : minute} - ${
      month === 0 ? "00" : month < 10 ? "0" + month : month
    }/${day === 0 ? "00" : day < 10 ? "0" + day : day}/${year}`;

    return formatedTime;
  };

  //========================================================

  //========= Create a blank array of spans that has all its classes set to none //

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
    if (newGame === true) {
      setSpanArray(blankSpanArray);
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, newGame]);

  useEffect(() => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        spanArray.push(<div className="none">{textArrayCharacters[i]}</div>);
      }
      setInfoAboutCharacter(spanArray);
    }
  }, [newGame, finished]);

  useEffect(() => {
    if (finished === true) {
      setSpanArray(blankSpanArray);
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, finished]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch({
        type: "SET_PREVIOUS_WPM",
        payload: latestWPM,
      });
      dispatch({
        type: "SET_PREVIOUS_CPM",
        payload: latestCPM,
      });
      dispatch({
        type: "SET_PREVIOUS_ERRORS_TYPING_GAME",
        payload: latestErrors,
      });
    }

    const differenceWPM = latestWPM - previousWPM;
    const differenceCPM = latestCPM - previousCPM;
    const differenceErrors = latestErrors - previousErrors;

    setDIfferenceInErrors(differenceErrors);
    setDIfferenceInCPM(differenceCPM);
    setDifferenceInWPM(differenceWPM);
  }, [isRunning]);

  const displayTheArray = () => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        if (i === charactersTyped) {
          spanArray.push(
            <div
              key={"key" + i}
              className={theme ? "blinking-dark" : "blinking-light"}
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === true) {
          spanArray.push(
            <div key={"key" + i} className="green">
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === false) {
          spanArray.push(
            <div key={"key" + i} className="red">
              {textArrayCharacters[i]}
            </div>
          );
        } else {
          spanArray.push(
            <div key={"key" + i} className="none">
              {textArrayCharacters[i]}
            </div>
          );
        }
      }
      return spanArray;
    }
  };

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

  //real errors
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

  //========= Calculate words per minute //

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    let charactersPerMinute = charactersPerSecond * 60;
    wordsPerMinute = Math.round(wordsPerMinute);
    charactersPerMinute = Math.round(charactersPerMinute);
    setCPM(charactersPerMinute);
    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };

  const calculateCharactersPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let charactersPerMinute = charactersPerSecond * 60;
    charactersPerMinute = Math.round(charactersPerMinute);

    return charactersPerMinute;
  };

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
    if (e.target.value.length === textArrayCharacters.length && mistakes < 5) {
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
        type: "SET_LATEST_CPM",
        payload: calculateCharactersPerMinute(),
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

  const displayCPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return cpm;
      } else return latestCPM;
    } else return latestCPM;
  };

  const changeTextToTypeClassname = () => {
    if (theme) {
      if (isUserTyping) {
        return "text-to-type";
      } else return "text-to-type-dark";
    } else {
      if (isUserTyping) {
        return "text-to-type";
      } else return "text-to-type-light";
    }
  };

  const displayKeyboard = () => {
    if (keyboardOnScreen) {
      if (theme) {
        return <KeyboardDark />;
      } else return <Keyboard />;
    } else return null;
  };

  const handleThemInTheFinishedPage = () => {
    if (theme === false) {
      if (finished) {
        return "about-the-text-shown-light";
      } else return "about-the-text-hidden-light";
    } else {
      if (finished) {
        return "about-the-text-shown-dark";
      } else return "about-the-text-hidden-dark";
    }
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
    }
  };

  const getTheHighestSpeedForARace = (data) => {
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

  const displayTheHistory = () => {
    if (textTypedHistory !== undefined) {
      const data = textTypedHistory;
      return (
        <div
          className={
            theme
              ? "ml-4 mr-4 mb-4  mt-1 history-div-dark"
              : "m-4 mt-3 history-div-light"
          }
        >
          {data
            .slice(0)
            .reverse()
            .map((item, index) => {
              let isEven = false;

              if (index % 2 === 0) {
                isEven = true;
              }

              return (
                <div
                  key={index}
                  className={
                    isEven
                      ? "d-flex justify-content-between mb-1 p-2 text-white"
                      : "d-flex justify-content-between mb-1 p-2"
                  }
                >
                  <p>{item.wpm} WPM</p>
                  <p>Date: {item.date}</p>
                </div>
              );
            })}
        </div>
      );
    }
  };

  const sideMenu = () => {
    if (text !== undefined) {
      console.log(text);
      return (
        <div
          className={
            isSideMenuOpen
              ? theme
                ? "side-menu-open-dark"
                : "side-menu-open-light"
              : theme
              ? "side-menu-closed-dark"
              : "side-menu-closed-light"
          }
        >
          <div>
            <div className="side-menu-header">
              <h3>Info About Text</h3>
              <i
                onClick={() => {
                  dispatch({
                    type: "TOGGLE_OPENING_SIDE_MENU",
                  });
                }}
                className="fas fa-times fa-2x close-icon"
              ></i>
            </div>

            <hr className={theme ? "white-hr" : "dark-hr"}></hr>
          </div>
          <div className="side-menu-container">
            <div className="side-menu-picture-div">
              <img className="side-menu-picture" src={text.image}></img>
            </div>
            <hr
              style={{ width: "85%" }}
              className={theme ? "white-hr" : "dark-hr"}
            ></hr>
          </div>
          <div className="side-menu-info-container">
            <h5 className="mb-2">
              {/* This quote is from the {data.text[selectedRandomTextIndex].type}: */}
            </h5>
            <a className="link" target="blank" href={text.linkURL}>
              <h5 className="link-h5">"{text.from}"</h5>
            </a>

            <h5 className="mt-2">By: {text.by}</h5>
            <div className="d-flex justify-content-center"></div>
          </div>
          <div>
            <h4 style={{ margin: "2rem", marginBottom: 0 }}>This Text:</h4>
            <hr
              style={{ width: "85%" }}
              className={theme ? "white-hr" : "dark-hr"}
            ></hr>
            <h4 style={{ margin: "2rem", marginBottom: 0 }}>Highest</h4>
            <div
              className={
                theme
                  ? "ml-4 mr-4 mb-4 mt-1 history-div-dark bg-primary"
                  : "ml-4 mr-4 mb-4 mt-1 history-div-light"
              }
            >
              <div className={"d-flex justify-content-between  p-2"}>
                <p>{highestSpeed} WPM</p>
                <p>Date: {highestSpeedDate}</p>
              </div>
            </div>
            <h4 style={{ margin: "2rem", marginBottom: 0 }}>History</h4>
            {displayTheHistory()}
          </div>
        </div>
      );
    }
  };

  const displayTheStatistics = () => {
    return (
      <div className="statistics">
        <div className="d-flex">
          <h5 className="mr-1">WPM: {displayWPM()} |</h5>
          <h5
            style={
              differenceInWPM > 0
                ? { color: "rgb(41, 230, 50)" }
                : { color: "rgba(230, 41, 41)" }
            }
          >
            {differenceInWPM > 0 ? `+${differenceInWPM}` : differenceInWPM}
          </h5>
        </div>
        <div className="d-flex">
          <h5 className="mr-1">CPM: {displayCPM()} |</h5>
          <h5
            style={
              differenceInWPM > 0
                ? { color: "rgb(41, 230, 50)" }
                : { color: "rgba(230, 41, 41)" }
            }
          >
            {differenceInCPM > 0 ? `+${differenceInCPM}` : differenceInCPM}
          </h5>
        </div>
        <div className="d-flex">
          <div className="d-flex mr-5">
            <h5 className="mr-1">Errors: {latestErrors} |</h5>
            <h5
              style={
                differenceInErrors < 0
                  ? { color: "rgb(41, 230, 50)" }
                  : { color: "rgba(230, 41, 41)" }
              }
            >
              {differenceInErrors > 0
                ? `+${differenceInErrors}`
                : differenceInErrors}
            </h5>
          </div>
          <div className="d-flex">
            <h5 className="mr-2">Acuracy: </h5>
            <h5 style={accuracy > 96 ? { color: "rgb(41, 230, 50)" } : {}}>
              {accuracy === 0 ? "..." : `${accuracy}%`}
            </h5>
          </div>
        </div>
      </div>
    );
  };

  return (
    <animated.div
      style={animation}
      className={theme ? "TypingTest-page-dark" : "TypingTest-page-light"}
    >
      <div
        onClick={() =>
          dispatch({
            type: "TOGGLE_OPENING_SIDE_MENU",
          })
        }
        className={
          isSideMenuOpen ? "darkened-background-on" : "darkened-background-off"
        }
      ></div>
      {sideMenu()}
      <div className="TypingTest">
        <Header text="Improve your typing skills" />
        {displayTheStatistics()}
        <hr
          style={isRunning || finished ? { opacity: 0 } : { opacity: 1 }}
          className={theme ? "white-hr" : "dark-hr"}
        ></hr>
        <hr
          style={
            finished
              ? { width: "100%" }
              : { width: calculateWithOfProgressBar() + "%" }
          }
          className={theme ? "white-hr-progress" : "dark-hr-progress"}
        ></hr>
        <p
          className={
            isRunning || finished
              ? "alert-primary alert-hidden"
              : "alert-primary alert-shown"
          }
        >
          {isUserTyping
            ? "Start typing... Start to type the text below whenever you are ready :)"
            : "Click on the input box to start typing."}
        </p>
        <p
          className={
            mistakesAlert
              ? "alert-danger alert-warning-shown"
              : "alert-danger alert-warning-hidden"
          }
        >
          <strong>Slow Down Boy</strong>
          the test won't stop unless you have less than 5 mistakes
        </p>
        <div className={changeTextToTypeClassname()}>{spanArray}</div>
        <div
          className={finished ? "keyboard-div-hidden" : "keyboard-div-shown"}
        >
          {displayKeyboard()}
        </div>
        <div className={handleThemInTheFinishedPage()}>
          <div className="about-text-header">
            <h4>What you just typed:</h4>
            <div>
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
                className="btn btn-primary mr-3"
              >
                Type Again
              </button>
              <button
                onClick={() => {
                  setSpanArray(blankSpanArray);
                  setInfoAboutCharacter(blankInfoArray);
                  setFinished(false);
                  setNewGame(true);
                  setRealMistakes(0);
                  calculateAccuracy();
                }}
                className="btn btn-primary"
              >
                New Text
              </button>
            </div>
          </div>
          <div className="info-about-text-bottom">
            <div className="picture-div">
              <img className="picture-image" src={text && text.URL}></img>
            </div>
            <div className="info-about-text-text">
              <hr
                style={{ marginBottom: "1rem" }}
                className={theme ? "white-hr" : "dark-hr"}
              ></hr>
              <h5>
                This quote is from the {text && text.type}:{" "}
                <a
                  className={theme ? "linkURL" : "linkURLlight"}
                  target="blank"
                  href={text && text.linkURL}
                >
                  {text && text.from}
                </a>
              </h5>
              <br></br>
              <h5>By: {text && text.by}</h5>
              <br></br>
              <h5>
                Your time:{" "}
                {seconds < 10
                  ? `${minutes}:0${seconds}`
                  : `${minutes}:${seconds}`}
              </h5>
            </div>
          </div>
        </div>
        <div className="input-zone">
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
            placeholder="The test will bigin when you start typing!"
            className={
              finished
                ? "input-box-hidden form-control"
                : "input-box-shown form-control"
            }
          ></input>
          <p className="alert-warning alert-tip">
            <strong>Tip:</strong> you can type //f to finish the current game.
          </p>
        </div>
      </div>
    </animated.div>
  );
}

export default TypingTest;
