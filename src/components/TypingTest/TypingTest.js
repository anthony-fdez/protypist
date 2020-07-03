import React, { useState, useEffect } from "react";
import "./TypingTest.css";
import Header from "../header/header";
import { useSelector } from "react-redux";

function TypingTest() {
  const theme = useSelector((state) => state.darkModeReducer);
  //state
  const [text, setText] = useState(
    "Once upon a time there was a car that was so fast that no other car never even came closw to such high speeds, thats it."
  );
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState();
  const [spanArray, setSpanArray] = useState();

  useEffect(() => {
    const splitedText = text.split("");

    let infoAboutCharacterObject = [];
    splitedText.map((character, index) => {
      let object = null;
      infoAboutCharacterObject.push(object);
    });

    setTextArrayCharacters(splitedText);
    setInfoAboutCharacter(infoAboutCharacterObject);
  }, []);

  useEffect(() => {
    setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters]);

  const displayTheArray = () => {
    if (textArrayCharacters !== undefined) {
      const newArray = textArrayCharacters.map((character, index) => {
        if (textArrayCharacters[charactersTyped] === true) {
          return (
            <span className="green" key={index}>
              {character}
            </span>
          );
        } else if (textArrayCharacters[charactersTyped] === false) {
          return (
            <span className="red" key={index}>
              {character}
            </span>
          );
        } else
          return (
            <span className="none" key={index}>
              {character}
            </span>
          );
      });
      return newArray;
    }
  };

  const getAndCheckTheInput = (e) => {
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

  const checkForTheClass = () => {
    if (infoAboutCharacter[charactersTyped - 1] === true) {
      return "green";
    } else if (infoAboutCharacter[charactersTyped - 1] === false) {
      return "red";
    } else return "standard";
  };

  return (
    <div className={theme ? "TypingTest-page-dark" : "TypingTest-page-light"}>
      <div className="TypingTest">
        <Header text="Improve your typing skills" />
        <div className="text-to-type">
          <h2>{spanArray}</h2>
        </div>
        <div className="input-zone">
          <h2>Type the text above </h2>
          <input
            onChange={(e) => {
              getAndCheckTheInput(e);
            }}
            placeholder="The test will bigin when you start typing!"
            className="input-box"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default TypingTest;
