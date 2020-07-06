import React, { useState, useEffect } from "react";
import "./TypingTest.css";

import Header from "../header/header";

import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

function TypingTest() {
  const theme = useSelector((state) => state.darkModeReducer);
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

  const pressedA = useKeyPress("a");
  const pressedB = useKeyPress("b");
  const pressedC = useKeyPress("c");
  const pressedD = useKeyPress("d");
  const pressedE = useKeyPress("e");
  const pressedF = useKeyPress("f");
  const pressedG = useKeyPress("g");
  const pressedH = useKeyPress("h");
  const pressedI = useKeyPress("i");
  const pressedJ = useKeyPress("j");
  const pressedK = useKeyPress("k");
  const pressedL = useKeyPress("l");
  const pressedM = useKeyPress("m");
  const pressedN = useKeyPress("n");
  const pressedO = useKeyPress("o");
  const pressedP = useKeyPress("p");
  const pressedQ = useKeyPress("q");
  const pressedR = useKeyPress("r");
  const pressedS = useKeyPress("s");
  const pressedT = useKeyPress("t");
  const pressedU = useKeyPress("u");
  const pressedV = useKeyPress("v");
  const pressedW = useKeyPress("w");
  const pressedX = useKeyPress("x");
  const pressedY = useKeyPress("y");
  const pressedZ = useKeyPress("z");
  const pressedSpace = useKeyPress(" ");

  useEffect(() => {});

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
          <h3>WPM:{wpm}</h3>
          <h3>Characters per minute:{cpm}</h3>
          <h3>Errors:{mistakes}</h3>
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
        <div className="keyboard container">
          <div className="fifth-row">
            <div className="keyboard-key">`~</div>
            <div className="keyboard-key">1 !</div>
            <div className="keyboard-key">2 @</div>
            <div className="keyboard-key">3 #</div>
            <div className="keyboard-key">4 $</div>
            <div className="keyboard-key">5 %</div>
            <div className="keyboard-key">6 ^</div>
            <div className="keyboard-key">7 &</div>
            <div className="keyboard-key">8 *</div>
            <div className="keyboard-key">9 (</div>
            <div className="keyboard-key">0 )</div>
            <div className="keyboard-key">- _</div>
            <div className="keyboard-key">= +</div>
            <div className="keyboard-backspace">Backspace</div>
          </div>
          <div className="forth-row">
            <div className="keyboard-tab">TAB</div>
            <div className={pressedQ ? "keyboard-key-pressed" : "keyboard-key"}>
              Q
            </div>
            <div className="keyboard-key">W</div>
            <div className="keyboard-key">E</div>
            <div className="keyboard-key">R</div>
            <div className="keyboard-key">T</div>
            <div className="keyboard-key">Y</div>
            <div className="keyboard-key">U</div>
            <div className="keyboard-key">I</div>
            <div className="keyboard-key">O</div>
            <div className="keyboard-key">P</div>
            <div className="keyboard-key">[{" {"}</div>
            <div className="keyboard-key">]{" }"}</div>
            <div className="keyboard-key">\ |</div>
          </div>
          <div className="third-row">
            <div className="keyboard-caps">CAPS</div>
            <div className="keyboard-key">A</div>
            <div className="keyboard-key">S</div>
            <div className="keyboard-key">D</div>
            <div className="keyboard-key">F</div>
            <div className="keyboard-key">G</div>
            <div className="keyboard-key">H</div>
            <div className="keyboard-key">J</div>
            <div className="keyboard-key">K</div>
            <div className="keyboard-key">L</div>
            <div className="keyboard-key">; :</div>
            <div className="keyboard-key">' "</div>
            <div className="keyboard-enter">ENTER</div>
          </div>
          <div className="second-row">
            <div className="keyboard-shift">SHIFT</div>
            <div className="keyboard-key">Z</div>
            <div className="keyboard-key">X</div>
            <div className="keyboard-key">C</div>
            <div className="keyboard-key">V</div>
            <div className="keyboard-key">B</div>
            <div className="keyboard-key">N</div>
            <div className="keyboard-key">M</div>
            <div className="keyboard-key">,</div>
            <div className="keyboard-key">. {" <"}</div>
            <div className="keyboard-key">/ {" >"}</div>
            <div className="keyboard-big-shift">SHIFT</div>
          </div>
          <div className="first-row">
            <div className="keyboard-ctrl">CTRL</div>
            <div className="keyboard-alt">ALT</div>
            <div
              className={
                pressedSpace ? "keyboard-space-pressed" : "keyboard-space"
              }
            >
              SPACE
            </div>
            <div className="keyboard-alt">ALT</div>
            <div className="keyboard-ctrl">CTRL</div>
          </div>
        </div>
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
