import React, { useState, useEffect } from "react";
import Typical from "react-typical";

import "./input.css";

//Add more words and work on making the words not reapeat!

function Input(props) {
  const [lost, setLost] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [seconds, setSeconds] = useState(9);
  const [miliseconds, setMiliseconds] = useState(0);
  const [score, setScore] = useState(0);
  const [addSecond, setAddSecond] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const [countingUpSeconds, setCountingUpSeconds] = useState(0); //the counting up seconds are to calculate the words per minut
  const [wpm, setWPM] = useState(0);
  const [keyPressed, setKeyPressed] = useState(0);

  const [words] = useState(() => {
    let randomNewWords = require("random-words");
    return randomNewWords(2000); //2000 words is probably too much but this almost makes the words not repeat
  });

  /*================== Select the random words ==================*/

  useEffect(() => {
    if (props.language === false) {
      const seletRandomWord = () => {
        let json = require("./palabras.json");
        let random = Math.floor(
          Math.random() * Math.floor(json.palabras.length)
        );
        let randomWord = json.palabras[random];
        return randomWord;
      };
      setRandomWord(seletRandomWord());
    } else {
      const seletRandomWord = () => {
        let random = Math.floor(Math.random() * Math.floor(words.length));

        let randomWord = words[random];
        return randomWord;
      };
      setRandomWord(seletRandomWord());
    }
  }, [score, lost, words, props.language]);

  /*================== Clock countdown ==================*/

  useEffect(() => {
    let intervalSeconds = null;
    let intervalMiliseconds = null;

    if (isRunning) {
      intervalMiliseconds = setInterval(() => {
        setMiliseconds((miliseconds) => miliseconds - 1);
      }, 100);
    } else if (seconds === 0) {
      setIsRunning(false);
      setLost(true);
    }
    if (miliseconds > 10) {
      setMiliseconds((miliseconds) => miliseconds - 10);
      setSeconds((seconds) => seconds + 1);
    }
    if (miliseconds <= 0) {
      setMiliseconds(9);
      setSeconds((seconds) => seconds - 1);
    }

    if (seconds < 0) {
      setLost(true);
      setIsRunning(false);
    }
    return () => {
      clearInterval(intervalSeconds);
      clearInterval(intervalMiliseconds);
    };
  }, [seconds, isRunning, miliseconds]);

  /*================== Clock counting up ==================*/

  useEffect(() => {
    let intervalSeconds = null;

    if (isRunning) {
      intervalSeconds = setInterval(() => {
        setCountingUpSeconds((countingUpSeconds) => countingUpSeconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalSeconds);
    };
  }, [countingUpSeconds, isRunning]);

  /*================== Calculate words per minute ==================*/

  useEffect(() => {
    const calculateWordPerMinute = () => {
      if (isRunning) {
        let wordsPerMinute = (score / countingUpSeconds) * 60;
        setWPM(wordsPerMinute);
      }
      if (score > highestScore) {
        setHighestScore(score);
      }
      if (isRunning === false && lost === true) {
        setCountingUpSeconds(0);
      }
    };
    calculateWordPerMinute();
  }, [score, isRunning, keyPressed]);

  /*================== Select the text to display at the befining of the game ==================*/

  const startOfTheGame = () => {
    if (isRunning) {
      return (
        <div className="time-and-word-to-type container d-flex justify-content-between">
          <h3 className="word-to-type">{randomWord.split("").join(" ")}</h3>

          <div className="">
            <h5 className={"time-left text"}>
              {seconds}:{miliseconds < 10 ? `${miliseconds}0` : miliseconds}
            </h5>
          </div>
        </div>
      );
    } else if (isRunning === false && lost === true) {
      return (
        <div>
          <h1 className="start-message">
            <Typical
              className="word-to-type"
              wraper="b"
              steps={["Game over."]}
            />
          </h1>
        </div>
      );
    } else if (isRunning === false) {
      return (
        <div className="game-over-message">
          <Typical
            className="word-to-type"
            wraper="b"
            steps={['Type "start" to begin!']}
          />
        </div>
      );
    }
  };

  /*================== Show the +1 second  ==================*/

  const selectTheAmountOfSecconds = () => {
    if (props.dificulty === "EZZY") {
      return 2;
    } else if (props.dificulty === "NORMAL") {
      return 1;
    } else if (props.dificulty === "HARD") {
      return 0.5;
    } else if (props.dificulty === "HARDER") {
      return 0.2;
    }
  };

  const displayAddingSeconds = () => {
    if (addSecond) {
      return (
        <h5 className="add-second text-success">
          {`+${selectTheAmountOfSecconds()}`} second
        </h5>
      );
    }
  };

  /*================== Change the place holder of the input box ==================*/

  const placeholderChange = () => {
    let placeholder = "";
    if (isRunning) {
      placeholder = `Type: "${randomWord}"`;
    } else if (!isRunning) {
      placeholder = 'Type "start" to begin';
    }
    return placeholder;
  };

  /*================== Check for equal word ==================*/

  const checkForEqualWord = (e) => {
    setKeyPressed((keyPressed) => {
      return keyPressed + 1;
    });
    if (isRunning) {
      if (e.target.value === randomWord) {
        e.target.value = "";
        setScore((score) => score + 1);
        if (props.dificulty === "NORMAL" || props.dificulty === "EZZY") {
          setSeconds((seconds) => seconds + selectTheAmountOfSecconds());
        } else if (props.dificulty === "HARD") {
          setMiliseconds((miliseconds) => miliseconds + 5);
        } else if (props.dificulty === "HARDER") {
          setMiliseconds((miliseconds) => miliseconds + 2);
        }
      }
    } else if (isRunning === false) {
      if (e.target.value === "start" || e.target.value === "vamo a darle") {
        setSeconds(9);
        setMiliseconds(9);
        setLost(false);
        setIsRunning(true);
        setScore(0);
        setWPM(0);
        e.target.value = "";
      }
    }
  };

  /*================== This is what makes the "1+ second" text only show up for half a second ==================*/

  useEffect(() => {
    const resolveAfter500ms = () => {
      return new Promise((resolve) => {
        setAddSecond(true);
        setTimeout(() => {
          resolve(setAddSecond(false));
        }, 500);
      });
    };
    const asyncCall = async () => {
      await resolveAfter500ms();
    };
    asyncCall();
  }, [score]);

  /*================== Render section ==================*/

  return (
    <div className="input">
      <div>{startOfTheGame()}</div>
      <div className="input">
        <input
          autoFocus
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={checkForEqualWord}
          placeholder={placeholderChange()}
          type="text"
          className={
            seconds < 3 && lost === false
              ? "transition form-control form-running-out-of-time"
              : " transition form-control form-input"
          }
        />
      </div>
      <div className="mt-3 ml-2 d-flex justify-content-between">
        <h4 className={"transition text"}>Score: {addSecond ? "+1" : score}</h4>
        <div>{displayAddingSeconds()}</div>
      </div>
      <div>
        <h5 className={"highest-score"}>Highest Score: {highestScore}</h5>
        <h5 //this is the words per minute h5, it says highest score but it doesn't matter
          className={"highest-score"}
        >
          WPM: {wpm === NaN ? "0" : wpm.toFixed(1)}
        </h5>
      </div>
    </div>
  );
}

export default Input;
