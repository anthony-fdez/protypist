import React from "react";
import "./keyboard.css";

import { useState, useEffect } from "react";

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
    setTimeout(() => {
      if (keyPressed === true) {
        setKeyPressed(false);
      }
    }, 300);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyPressed]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

function Keyboard() {
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
      <div className="keyboard">
        <div className="fifth-row">
          <div
            className={
              pressedAproximate || pressedBackTic
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            `~
          </div>
          <div
            className={
              pressed1 || pressedExclamation
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            1 !
          </div>
          <div
            className={
              pressed2 || pressedAdd ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            2 @
          </div>
          <div
            className={
              pressed3 || pressedSharp ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            3 #
          </div>
          <div
            className={
              pressed4 || pressedDollar
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            4 $
          </div>
          <div
            className={
              pressed5 || pressedPerCent
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            5 %
          </div>
          <div
            className={
              pressed6 || pressedUpArrow
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            6 ^
          </div>
          <div
            className={
              pressed7 || pressedAnd ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            7 &
          </div>
          <div
            className={
              pressed8 || pressedStart ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            8 *
          </div>
          <div
            className={
              pressed9 || pressedOpenParenthesis
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            9 (
          </div>
          <div
            className={
              pressed0 || pressedCloseParenthesis
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            0 )
          </div>
          <div
            className={
              pressedMinus || pressedUnderScore
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            - _
          </div>
          <div
            className={
              pressedEqual || pressedPlus
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            = +
          </div>
          <div
            className={
              pressedAproximate || pressedBackTic
                ? "keyboard-backspace"
                : "keyboard-backspace"
            }
          >
            Backspace
          </div>
        </div>
        <div className="forth-row">
          <div className="keyboard-tab">TAB</div>
          <div
            className={
              pressedQ || pressedCapitalQ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Q
          </div>
          <div
            className={
              pressedW || pressedCapitalW
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            W
          </div>
          <div
            className={
              pressedE || pressedCapitalE
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            E
          </div>
          <div
            className={
              pressedR || pressedCapitalR
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            R
          </div>
          <div
            className={
              pressedT || pressedCapitalT
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            T
          </div>
          <div
            className={
              pressedY || pressedCapitalY
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Y
          </div>
          <div
            className={
              pressedU || pressedCapitalU
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            U
          </div>
          <div
            className={
              pressedI || pressedCapitalI
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            I
          </div>
          <div
            className={
              pressedO || pressedCapitalO
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            O
          </div>
          <div
            className={
              pressedP || pressedCapitalP
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            P
          </div>
          <div
            className={
              pressedLeftCurlyBrace || pressedLeftSquareBracket
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            [{" {"}
          </div>
          <div
            className={
              pressedRigthCurlyBrace || pressedRigthSquareBracket
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ]{" }"}
          </div>
          <div className={pressedQ ? "keyboard-key-pressed" : "keyboard-key"}>
            \ |
          </div>
        </div>
        <div className="third-row">
          <div className="keyboard-caps">CAPS</div>
          <div
            className={
              pressedA || pressedCapitalA
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            A
          </div>
          <div
            className={
              pressedS || pressedCapitalS
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            S
          </div>
          <div
            className={
              pressedD || pressedCapitalD
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            D
          </div>
          <div
            className={
              pressedF || pressedCapitalF
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            F
          </div>
          <div
            className={
              pressedG || pressedCapitalG
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            G
          </div>
          <div
            className={
              pressedH || pressedCapitalH
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            H
          </div>
          <div
            className={
              pressedJ || pressedCapitalJ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            J
          </div>
          <div
            className={
              pressedK || pressedCapitalK
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            K
          </div>
          <div
            className={
              pressedL || pressedCapitalL
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            L
          </div>
          <div
            className={
              pressedColon || pressedSemiColon
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ; :
          </div>
          <div
            className={
              pressedSingleQuote || pressedDoubleQuote
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ' "
          </div>
          <div className="keyboard-enter">ENTER</div>
        </div>
        <div className="second-row">
          <div className="keyboard-shift">SHIFT</div>
          <div
            className={
              pressedZ || pressedCapitalZ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Z
          </div>
          <div
            className={
              pressedX || pressedCapitalX
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            X
          </div>
          <div
            className={
              pressedC || pressedCapitalC
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            C
          </div>
          <div
            className={
              pressedV || pressedCapitalV
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            V
          </div>
          <div
            className={
              pressedB || pressedCapitalB
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            B
          </div>
          <div
            className={
              pressedN || pressedCapitalN
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            N
          </div>
          <div
            className={
              pressedM || pressedCapitalM
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            M
          </div>
          <div
            className={
              pressedComma || pressedLesserThan
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ,{" <"}
          </div>
          <div
            className={
              pressedDot || pressedBiggerThan
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            .{" >"}
          </div>
          <div
            className={
              pressedForwardSlash || pressedQuestion
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            / ?
          </div>
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
    </div>
  );
}

export default Keyboard;
