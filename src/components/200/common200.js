import React, { useState, useEffect } from "react";
import "./common200.css";

import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";

function Common200() {
  const dispatch = useDispatch();

  //redux reducers
  const theme = useSelector((state) => state.darkModeReducer);
  const length = useSelector((state) => state.lengthReducerNormal);
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM200 = useSelector((state) => state.latestWPMReducer200);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const previousWPM = useSelector((state) => state.previousWPMReducer200);
  const latestErrors = useSelector((state) => state.latestErrorsReducer200);
  const previousErrors = useSelector((state) => state.previousErrorsReducer200);

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  //state
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);

  //-----------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
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
  const [blinking, setIsBlinking] = useState(true);

  const postTheDataToTheServer = () => {
    if (isLoggedIn) {
      const data = {
        wpm: calculateWordsPerMinute(),
        time: seconds,
        mistakes: realMistakes,
        date: getTheDate(),
      };
      const headers = {
        Authorization: jwt,
      };

      axios
        .post("https://protypist.herokuapp.com/users/statistics200", data, {
          headers: headers,
        })
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };

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

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
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
      let random = Math.floor(Math.random() * 200);
      let randomWord = json.english[random];

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
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, newGame, blinking]);

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
    const interval = setInterval(() => {
      setIsBlinking(!blinking);
    }, 500);
    return () => clearInterval(interval);
  }, [blinking, charactersTyped]);

  useEffect(() => {
    setIsBlinking(true);
  }, [charactersTyped]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch({
        type: "SET_PREVIOUS_WPM_200",
        payload: latestWPM200,
      });

      dispatch({
        type: "SET_PREVIOUS_ERRORS_200",
        payload: latestErrors,
      });
    }

    const differenceWPM = latestWPM200 - previousWPM;
    const differenceErrors = latestErrors - previousErrors;

    setDIfferenceInErrors(differenceErrors);
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
              className={"blinking"}
              style={
                blinking
                  ? {
                      color: colorFiles.noneColor,
                      borderLeft: `2px solid ${colorFiles.fontColor}`,
                    }
                  : {
                      color: colorFiles.noneColor,
                      borderLeft: `2px solid ${colorFiles.backgroundColor}`,
                    }
              }
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === true) {
          spanArray.push(
            <div
              key={"key" + i}
              className="green"
              style={{ color: colorFiles.correctColor }}
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === false) {
          spanArray.push(
            <div
              key={"key" + i}
              className="red"
              style={{
                backgroundColor: colorFiles.wrongColor,
                color: colorFiles.fontColor,
              }}
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else {
          spanArray.push(
            <div
              key={"key" + i}
              className="none"
              style={{ color: colorFiles.noneColor }}
            >
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

  useEffect(() => {
    setNewGame(false);
  }, [newGame]);

  //========= Calculate words per minute //

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    let charactersPerMinute = charactersPerSecond * 60;
    wordsPerMinute = Math.round(wordsPerMinute);
    charactersPerMinute = Math.round(charactersPerMinute);
    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };

  const calculateCharactersPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let charactersPerMinute = charactersPerSecond * 60;
    charactersPerMinute = Math.round(charactersPerMinute);

    return charactersPerMinute;
  };

  //========= Check input //

  const getAndCheckTheInput = (e) => {
    if (realTimeWPM) {
      calculateWordsPerMinute();
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
      setNewGame(true);
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
      setRealMistakes(0);
      setProgress(1);
      calculateAccuracy();
      setCharactersTyped(0);
      setSeconds(0);
      dispatch({
        type: "SET_LATEST_WPM_200",
        payload: calculateWordsPerMinute(),
      });

      dispatch({
        type: "SET_LATEST_ERRORS_200",
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

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

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

  const displayWPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return wpm;
      } else return latestWPM200;
    } else return latestWPM200;
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
    }
  };

  return (
    <animated.div style={animation} className={"TypingTest-page"}>
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
        }}
        className="TypingTest"
      >
        <Header />
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
              <h5
                style={
                  accuracy > 96
                    ? { color: "rgb(41, 230, 50)" }
                    : { color: "rgba(255, 255, 255)" }
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
        <p
          className={
            isRunning
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
        {keyboardOnScreen && <Keyboard />}
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
            className="input-box-shown"
            style={{
              color: colorFiles.fontColor,
              borderBottom: `2px solid ${colorFiles.primaryColor}`,
            }}
          ></input>
          <p className="alert-warning alert-tip">
            <strong>Tip:</strong> you can type " //f" any time you want to
            restart the test. Or press F5, that will do too.
          </p>
        </div>
      </div>
    </animated.div>
  );
}

export default Common200;
