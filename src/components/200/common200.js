import React, { useState, useEffect } from "react";
import "./common200.css";
import Header from "../header/header";
import Qwerty from "../inScreenKeyboard/qwerty";
import Dvorak from "../inScreenKeyboard/dvorak";
import Colemak from "../inScreenKeyboard/colemak";
import displayTheArray from "../functions/displayTheArray";
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
  const latestErrors = useSelector((state) => state.latestErrorsReducer200);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const colors = useSelector((state) => state.themeReducer);
  const instaDeath = useSelector((state) => state.instaDeathReducer);
  const colorFiles = require(`../themes/${colors}`);
  const testLanguage = useSelector((state) => state.testLanguageReducer);
  const keyboardLayout = useSelector((state) => state.selectKeyboardLayout);

  //state
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);
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
  const [wpmAverageLast10races, setWpmAverage10races] = useState();
  const [wpmAverageAllTime, setWpmAverageAllTime] = useState();
  const [averageMistakes, setAverageMistakes] = useState();
  const [highestSpeedAllTime, setHighestSpeedOfAllTime] = useState();

  const postTheDataToTheServer = () => {
    if (isLoggedIn) {
      const data = {
        wpm: calculateWordsPerMinute(),
        time: seconds,
        mistakes: realMistakes,
        date: getTheDate(),
        accuracy: calculateAccuracy(),
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
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/statistics200", {
          headers: headers,
        })
        .then((response) => {
          setWpmAverage10races(response.data.wpmAverageLast10Races200);
          setWpmAverageAllTime(response.data.wpmAverageAllTime200);
          setAverageMistakes(response.data.averageMistakes200);
          setHighestSpeedOfAllTime(response.data.highestSpeedAllTime200);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [jwt]);

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
      let random;
      let randomWord = " ";
      if (testLanguage === "english") {
        random = Math.floor(Math.random() * json.english.length);
        randomWord = json.english[random];
      } else if (testLanguage === "spanish") {
        random = Math.floor(Math.random() * json.spanish.length);
        randomWord = json.spanish[random];
      } else if (testLanguage === "german") {
        random = Math.floor(Math.random() * json.german.length);
        randomWord = json.german[random];
      } else if (testLanguage === "dutch") {
        random = Math.floor(Math.random() * json.dutch.length);
        randomWord = json.dutch[random];
      } else if (testLanguage === "french") {
        random = Math.floor(Math.random() * json.french.length);
        randomWord = json.french[random];
      } else if (testLanguage === "portuguese") {
        random = Math.floor(Math.random() * json.portuguese.length);
        randomWord = json.portuguese[random];
      } else if (testLanguage === "italian") {
        random = Math.floor(Math.random() * json.italian.length);
        randomWord = json.italian[random];
      } else if (testLanguage === "polish") {
        random = Math.floor(Math.random() * json.polish.length);
        randomWord = json.polish[random];
      } else if (testLanguage === "thai") {
        random = Math.floor(Math.random() * json.thai.length);
        randomWord = json.thai[random];
      } else if (testLanguage === "russian") {
        random = Math.floor(Math.random() * json.russian.length);
        randomWord = json.russian[random];
      } else if (testLanguage === "turkish") {
        random = Math.floor(Math.random() * json.turkish.length);
        randomWord = json.turkish[random];
      } else if (testLanguage === "hungarian") {
        random = Math.floor(Math.random() * json.hungarian.length);
        randomWord = json.hungarian[random];
      } else if (testLanguage === "norwegian") {
        random = Math.floor(Math.random() * json.norwegian.length);
        randomWord = json.norwegian[random];
      } else if (testLanguage === "indonesian") {
        random = Math.floor(Math.random() * json.indonesian.length);
        randomWord = json.indonesian[random];
      }
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
    } else
      setSpanArray(
        displayTheArray(
          textArrayCharacters,
          charactersTyped,
          colorFiles,
          infoAboutCharacter
        )
      );
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
        type: "SET_PREVIOUS_ERRORS_200",
        payload: latestErrors,
      });
    }

    const last10races = parseInt(wpmAverageLast10races);

    const valueToCompare =
      wpmAverageLast10races === 0 ? wpmAverageAllTime : last10races;

    const differenceWPM =
      Math.round((latestWPM200 - valueToCompare) * 100) / 100;
    const differenceErrors =
      Math.round((latestErrors - averageMistakes) * 100) / 100;

    setDIfferenceInErrors(differenceErrors);
    setDifferenceInWPM(differenceWPM);
  }, [isRunning, wpmAverageAllTime, averageMistakes]);

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

  useEffect(() => {
    setNewGame(false);
  }, [newGame]);

  //========= Calculate words per minute //

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    wordsPerMinute = Math.round(wordsPerMinute * 100) / 100;
    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };

  //========= Check input //

  const getAndCheckTheInput = (e) => {
    if (realTimeWPM) {
      calculateWordsPerMinute();
    }

    console.log(mistakes);

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
    } else if (
      e.target.value.length === textArrayCharacters.length &&
      mistakes < 10
    ) {
      console.log(mistakes);
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
      return accuracy;
    }
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
          <strong>Slow Down Boy</strong>
          the test won't stop unless you have less than 5 mistakes
        </p>
        <div className={changeTextToTypeClassname()}>{spanArray}</div>
        {keyboardOnScreen && keyboardLayoutSelector()}
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
            placeholder="The test will begin when you start typing!"
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
