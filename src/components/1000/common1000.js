import React, { useState, useEffect } from "react";
import "./common1000.css";

import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";
import KeyboardDark from "../inScreenKeyboard/keyboard-dark";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

function Common1000() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
  const length = useSelector((state) => state.lengthReducer);
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM1000 = useSelector((state) => state.latestWPMReducer1000);
  const latestCPM1000 = useSelector((state) => state.latestCPMReducer1000);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const previousWPM = useSelector((state) => state.previousWPMReducer1000);
  const previousCPM = useSelector((state) => state.previousCPMReducer1000);
  const latestErrors = useSelector((state) => state.latestErrorsReducer1000);
  const previousErrors = useSelector(
    (state) => state.previousErrorsReducer1000
  );

  //state
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);

  //-----------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
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

  //========= Convert the plain text into arrays //

  useEffect(() => {
    let json = require("../data/1000words.json");
    let wordsArray = [];
    let infoAboutCharacterObject = [];
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * 1000);
      let randomWord = json.words[random];

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

  //========= Display all the characters to the screen //
  //========= This returns an array of spans //

  useEffect(() => {
    if (isRunning === true) {
      dispatch({
        type: "SET_PREVIOUS_WPM_1000",
        payload: latestWPM1000,
      });
      dispatch({
        type: "SET_PREVIOUS_CPM_100",
        payload: latestCPM1000,
      });
      dispatch({
        type: "SET_PREVIOUS_ERRORS_1000",
        payload: latestErrors,
      });
    }

    const differenceWPM = latestWPM1000 - previousWPM;
    const differenceCPM = latestCPM1000 - previousCPM;
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
      setCharactersTyped(0);
      calculateAccuracy();
      dispatch({
        type: "SET_LATEST_WPM_1000",
        payload: calculateWordsPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_CPM_1000",
        payload: calculateCharactersPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_ERRORS_1000",
        payload: realMistakes,
      });
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
      } else return latestWPM1000;
    } else return latestWPM1000;
  };

  const displayCPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return cpm;
      } else return latestCPM1000;
    } else return latestCPM1000;
  };

  const displayKeyboard = () => {
    if (keyboardOnScreen) {
      if (theme) {
        return <KeyboardDark />;
      } else return <Keyboard />;
    } else return null;
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

  return (
    <animated.div
      style={animation}
      className={theme ? "TypingTest-page-dark" : "TypingTest-page-light"}
    >
      <div className="TypingTest">
        <Header text="Type the 1000 most common words in English (advanced)" />
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
            <h5 className="mr-1">Characters per minute: {displayCPM()} |</h5>
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
          style={isRunning ? { opacity: 0 } : { opacity: 1 }}
          className={theme ? "white-hr" : "dark-hr"}
        ></hr>
        <hr
          style={{ width: calculateWithOfProgressBar() + "%" }}
          className={theme ? "white-hr-progress" : "dark-hr-progress"}
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
        {displayKeyboard()}
        <div className="input-zone">
          <input
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
            className="input-box-shown form-control"
          ></input>
          <p className="alert-warning alert-tip">
            <strong>Tip:</strong> you can type " //f " any time you want to
            restart the test. Or press F5, that will do too.
          </p>
        </div>
      </div>
    </animated.div>
  );
}

export default Common1000;
