import React, { useState, useEffect } from "react";
import "./TypingTest.css";

//components
import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";
import KeyboardDark from "../inScreenKeyboard/keyboard-dark";

import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function TypingTest() {
  const theme = useSelector((state) => state.darkModeReducer);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  //state
  const [text, setText] = useState(
    "This is just a text that I am typing just to test if my game is working, this is some more text to make sure the algorithem is working properly"
  );
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  //-----------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [blankSpanArray, setBlankSpanArray] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [cpm, setCPM] = useState(0);
  const [isUserTyping, setIsUserTyping] = useState(true);

  //========= Convert the plain text into arrays //

  useEffect(() => {
    const splitedText = text.split("");
    let infoAboutCharacterObject = [];
    splitedText.map((character, index) => {
      let object = null;
      infoAboutCharacterObject.push(object);
    });
    setBlankInfoArray(infoAboutCharacterObject);
    setTextArrayCharacters(splitedText);
    setInfoAboutCharacter(infoAboutCharacterObject);
  }, []);

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

  const displayTheArray = () => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        if (i === charactersTyped) {
          spanArray.push(
            <div className="blinking">{textArrayCharacters[i]}</div>
          );
        } else if (infoAboutCharacter[i] === true) {
          spanArray.push(<div className="green">{textArrayCharacters[i]}</div>);
        } else if (infoAboutCharacter[i] === false) {
          spanArray.push(<div className="red">{textArrayCharacters[i]}</div>);
        } else {
          spanArray.push(<div className="none">{textArrayCharacters[i]}</div>);
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

  //========= Calculate words per minute //

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    let charactersPerMinute = charactersPerSecond * 60;

    wordsPerMinute = Math.round(wordsPerMinute);
    charactersPerMinute = Math.round(charactersPerMinute);

    setCPM(charactersPerMinute);
    setWPM(wordsPerMinute);
  };

  //========= Check input //

  const getAndCheckTheInput = (e) => {
    if (
      e.target.value.length === textArrayCharacters.length &&
      mistakes === 0
    ) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e.target.value = "";
      setIsRunning(false);
      setNewGame(true);
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
    } else if (charactersTyped >= 1) {
      setIsRunning(true);
    }

    let inputArray = e.target.value.split(" ");
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] === "//restart") {
        e.target.value = "";
        setIsRunning(false);
        setNewGame(true);
        setSpanArray(blankSpanArray);
        setInfoAboutCharacter(blankInfoArray);
        setMistakes(0);
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

  const sideMenu = () => {
    return (
      <div
        className={
          isSideMenuOpen
            ? "whole-page-background-open"
            : "whole-page-background-closed"
        }
      >
        <div className={isSideMenuOpen ? "side-menu-open" : "side-menu-closed"}>
          <div className="side-menu-header">
            <h1>Side Menu</h1>
            <div
              onClick={() => {
                setIsSideMenuOpen(false);
              }}
              className="side-menu-close-icon"
            >
              <i class="fas fa-times fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayKeyboard = () => {
    if (keyboardOnScreen) {
      if (theme) {
        return <KeyboardDark />;
      } else return <Keyboard />;
    } else return null;
  };

  return (
    <animated.div
      style={animation}
      className={theme ? "TypingTest-page-dark" : "TypingTest-page-light"}
    >
      {sideMenu()}
      <div className="TypingTest">
        <Header text="Improve your typing skills" />
        <div
          onClick={() => {
            setIsSideMenuOpen(true);
          }}
          className="hamburger-menu"
        >
          <i class="fas fa-bars fa-2x"></i>
        </div>
        <div className="statistics">
          <h5>WPM:{wpm}</h5>
          <h5>Characters per minute:{cpm}</h5>
          <h5>Errors:{mistakes}</h5>
        </div>
        <hr className={theme ? "white-hr" : "dark-hr"}></hr>
        <p
          className={
            isRunning
              ? "alert-primary alert-hidden"
              : "alert-primary alert-shown"
          }
        >
          {isUserTyping
            ? "Start typing... Start to type the text below whenever you are ready :)"
            : "Click on the text to start typing."}
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
            className="input-box form-control"
          ></input>
          <p className="alert-warning alert-tip">
            <strong>Tip:</strong> you can type "//restart" any time you want to
            restart the test.
          </p>
        </div>
      </div>
    </animated.div>
  );
}

export default TypingTest;
