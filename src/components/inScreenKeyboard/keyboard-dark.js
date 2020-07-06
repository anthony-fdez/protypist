import React from "react";
import "./keyboard-dark.css";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  const [clock, setClock] = useState(0);

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
    setTimeout(() => {
      if (keyPressed === true) {
        setKeyPressed(false);
      }
    }, 100);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyPressed]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

function KeyboardDark() {
  const theme = useSelector((state) => state.darkModeReducer);

  const pressedA = useKeyPress("a");
  const pressedCapitalA = useKeyPress("A");

  const pressedB = useKeyPress("b");
  const pressedCapitalB = useKeyPress("B");

  const pressedC = useKeyPress("c");
  const pressedCapitalC = useKeyPress("C");

  const pressedD = useKeyPress("d");
  const pressedCapitalD = useKeyPress("D");

  const pressedE = useKeyPress("e");
  const pressedCapitalE = useKeyPress("E");

  const pressedF = useKeyPress("f");
  const pressedCapitalF = useKeyPress("F");

  const pressedG = useKeyPress("g");
  const pressedCapitalG = useKeyPress("G");

  const pressedH = useKeyPress("h");
  const pressedCapitalH = useKeyPress("H");

  const pressedI = useKeyPress("i");
  const pressedCapitalI = useKeyPress("I");

  const pressedJ = useKeyPress("j");
  const pressedCapitalJ = useKeyPress("J");

  const pressedK = useKeyPress("k");
  const pressedCapitalK = useKeyPress("K");

  const pressedL = useKeyPress("l");
  const pressedCapitalL = useKeyPress("L");

  const pressedM = useKeyPress("m");
  const pressedCapitalM = useKeyPress("M");

  const pressedN = useKeyPress("n");
  const pressedCapitalN = useKeyPress("N");

  const pressedO = useKeyPress("o");
  const pressedCapitalO = useKeyPress("O");

  const pressedP = useKeyPress("p");
  const pressedCapitalP = useKeyPress("P");

  const pressedQ = useKeyPress("q");
  const pressedCapitalQ = useKeyPress("Q");

  const pressedR = useKeyPress("r");
  const pressedCapitalR = useKeyPress("R");

  const pressedS = useKeyPress("s");
  const pressedCapitalS = useKeyPress("S");

  const pressedT = useKeyPress("t");
  let pressedCapitalT = useKeyPress("T");

  const pressedU = useKeyPress("u");
  const pressedCapitalU = useKeyPress("U");

  const pressedV = useKeyPress("v");
  const pressedCapitalV = useKeyPress("V");

  const pressedW = useKeyPress("w");
  const pressedCapitalW = useKeyPress("W");

  const pressedX = useKeyPress("x");
  const pressedCapitalX = useKeyPress("X");

  const pressedY = useKeyPress("y");
  const pressedCapitalY = useKeyPress("Y");

  const pressedZ = useKeyPress("z");
  const pressedCapitalZ = useKeyPress("Z");

  //Numbers and simbols
  const pressed1 = useKeyPress("1");
  const pressed2 = useKeyPress("2");
  const pressed3 = useKeyPress("3");
  const pressed4 = useKeyPress("4");
  const pressed5 = useKeyPress("5");
  const pressed6 = useKeyPress("6");
  const pressed7 = useKeyPress("7");
  const pressed8 = useKeyPress("8");
  const pressed9 = useKeyPress("9");
  const pressed0 = useKeyPress("0");

  const pressedSpace = useKeyPress(" ");
  const pressedLeftSquareBracket = useKeyPress("[");
  const pressedRigthSquareBracket = useKeyPress("]");
  const pressedRigthCurlyBrace = useKeyPress("}");
  const pressedLeftCurlyBrace = useKeyPress("{");
  const pressedBackTic = useKeyPress("`");
  const pressedExclamation = useKeyPress("!");
  const pressedAdd = useKeyPress("@");
  const pressedSharp = useKeyPress("#");
  const pressedDollar = useKeyPress("$");
  const pressedPerCent = useKeyPress("%");
  const pressedUpArrow = useKeyPress("^");
  const pressedAnd = useKeyPress("&");
  const pressedStart = useKeyPress("*");
  const pressedOpenParenthesis = useKeyPress("(");
  const pressedCloseParenthesis = useKeyPress(")");
  const pressedMinus = useKeyPress("-");
  const pressedUnderScore = useKeyPress("_");
  const pressedEqual = useKeyPress("=");
  const pressedPlus = useKeyPress("+");
  const pressedAproximate = useKeyPress("~");
  const pressedColon = useKeyPress(":");
  const pressedSemiColon = useKeyPress(";");
  const pressedSingleQuote = useKeyPress("'");
  const pressedDoubleQuote = useKeyPress(`"`);
  const pressedComma = useKeyPress(",");
  const pressedDot = useKeyPress(".");
  const pressedLesserThan = useKeyPress("<");
  const pressedBiggerThan = useKeyPress(">");
  const pressedForwardSlash = useKeyPress("/");
  const pressedQuestion = useKeyPress("?");

  return (
    <div>
      <div className="KeyboardDark container">
        <div className="fifth-row">
          <div
            className={
              pressedAproximate || pressedBackTic
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            `~
          </div>
          <div
            className={
              pressed1 || pressedExclamation
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            1 !
          </div>
          <div
            className={
              pressed2 || pressedAdd
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            2 @
          </div>
          <div
            className={
              pressed3 || pressedSharp
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            3 #
          </div>
          <div
            className={
              pressed4 || pressedDollar
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            4 $
          </div>
          <div
            className={
              pressed5 || pressedPerCent
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            5 %
          </div>
          <div
            className={
              pressed6 || pressedUpArrow
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            6 ^
          </div>
          <div
            className={
              pressed7 || pressedAnd
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            7 &
          </div>
          <div
            className={
              pressed8 || pressedStart
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            8 *
          </div>
          <div
            className={
              pressed9 || pressedOpenParenthesis
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            9 (
          </div>
          <div
            className={
              pressed0 || pressedCloseParenthesis
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            0 )
          </div>
          <div
            className={
              pressedMinus || pressedUnderScore
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            - _
          </div>
          <div
            className={
              pressedEqual || pressedPlus
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            = +
          </div>
          <div
            className={
              pressedAproximate || pressedBackTic
                ? "KeyboardDark-backspace"
                : "KeyboardDark-backspace"
            }
          >
            Backspace
          </div>
        </div>
        <div className="forth-row">
          <div className="KeyboardDark-tab">TAB</div>
          <div
            className={
              pressedQ || pressedCapitalQ
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            Q
          </div>
          <div
            className={
              pressedW || pressedCapitalW
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            W
          </div>
          <div
            className={
              pressedE || pressedCapitalE
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            E
          </div>
          <div
            className={
              pressedR || pressedCapitalR
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            R
          </div>
          <div
            className={
              pressedT || pressedCapitalT
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            T
          </div>
          <div
            className={
              pressedY || pressedCapitalY
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            Y
          </div>
          <div
            className={
              pressedU || pressedCapitalU
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            U
          </div>
          <div
            className={
              pressedI || pressedCapitalI
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            I
          </div>
          <div
            className={
              pressedO || pressedCapitalO
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            O
          </div>
          <div
            className={
              pressedP || pressedCapitalP
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            P
          </div>
          <div
            className={
              pressedLeftCurlyBrace || pressedLeftSquareBracket
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            [{" {"}
          </div>
          <div
            className={
              pressedRigthCurlyBrace || pressedRigthSquareBracket
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            ]{" }"}
          </div>
          <div className={"KeyboardDark-key"}>\ |</div>
        </div>
        <div className="third-row">
          <div className="KeyboardDark-caps">CAPS</div>
          <div
            className={
              pressedA || pressedCapitalA
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            A
          </div>
          <div
            className={
              pressedS || pressedCapitalS
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            S
          </div>
          <div
            className={
              pressedD || pressedCapitalD
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            D
          </div>
          <div
            className={
              pressedF || pressedCapitalF
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            F
          </div>
          <div
            className={
              pressedG || pressedCapitalG
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            G
          </div>
          <div
            className={
              pressedH || pressedCapitalH
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            H
          </div>
          <div
            className={
              pressedJ || pressedCapitalJ
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            J
          </div>
          <div
            className={
              pressedK || pressedCapitalK
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            K
          </div>
          <div
            className={
              pressedL || pressedCapitalL
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            L
          </div>
          <div
            className={
              pressedColon || pressedSemiColon
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            ; :
          </div>
          <div
            className={
              pressedSingleQuote || pressedDoubleQuote
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            ' "
          </div>
          <div className="KeyboardDark-enter">ENTER</div>
        </div>
        <div className="second-row">
          <div className="KeyboardDark-shift">SHIFT</div>
          <div
            className={
              pressedZ || pressedCapitalZ
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            Z
          </div>
          <div
            className={
              pressedX || pressedCapitalX
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            X
          </div>
          <div
            className={
              pressedC || pressedCapitalC
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            C
          </div>
          <div
            className={
              pressedV || pressedCapitalV
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            V
          </div>
          <div
            className={
              pressedB || pressedCapitalB
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            B
          </div>
          <div
            className={
              pressedN || pressedCapitalN
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            N
          </div>
          <div
            className={
              pressedM || pressedCapitalM
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            M
          </div>
          <div
            className={
              pressedComma || pressedLesserThan
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            ,{" <"}
          </div>
          <div
            className={
              pressedDot || pressedBiggerThan
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            .{" >"}
          </div>
          <div
            className={
              pressedForwardSlash || pressedQuestion
                ? "KeyboardDark-key-pressed"
                : "KeyboardDark-key"
            }
          >
            / ?
          </div>
          <div className="KeyboardDark-big-shift">SHIFT</div>
        </div>
        <div className="first-row">
          <div className="KeyboardDark-ctrl">CTRL</div>
          <div className="KeyboardDark-alt">ALT</div>
          <div
            className={
              pressedSpace ? "KeyboardDark-space-pressed" : "KeyboardDark-space"
            }
          >
            SPACE
          </div>
          <div className="KeyboardDark-alt">ALT</div>
          <div className="KeyboardDark-ctrl">CTRL</div>
        </div>
      </div>
    </div>
  );
}

export default KeyboardDark;
