import React from "react";
import "./keyboard.css";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    setTimeout(() => {
      if (keyPressed === true) {
        setKeyPressed(false);
      }
    }, 300);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyPressed]);

  return keyPressed;
}

function Qwerty() {
  const dispatch = useDispatch();
  const ALL_KEYS_PRESSED = useSelector((state) => state.allKeysPressed);

  const [pressed_A_Count, setPressed_A_Count] = useState(ALL_KEYS_PRESSED.a);
  const [pressed_B_Count, setPressed_B_Count] = useState(ALL_KEYS_PRESSED.b);
  const [pressed_C_Count, setPressed_C_Count] = useState(ALL_KEYS_PRESSED.c);
  const [pressed_D_Count, setPressed_D_Count] = useState(ALL_KEYS_PRESSED.d);
  const [pressed_E_Count, setPressed_E_Count] = useState(ALL_KEYS_PRESSED.e);
  const [pressed_F_Count, setPressed_F_Count] = useState(ALL_KEYS_PRESSED.f);
  const [pressed_G_Count, setPressed_G_Count] = useState(ALL_KEYS_PRESSED.g);
  const [pressed_H_Count, setPressed_H_Count] = useState(ALL_KEYS_PRESSED.h);
  const [pressed_I_Count, setPressed_I_Count] = useState(ALL_KEYS_PRESSED.i);
  const [pressed_J_Count, setPressed_J_Count] = useState(ALL_KEYS_PRESSED.j);
  const [pressed_K_Count, setPressed_K_Count] = useState(ALL_KEYS_PRESSED.k);
  const [pressed_L_Count, setPressed_L_Count] = useState(ALL_KEYS_PRESSED.l);
  const [pressed_M_Count, setPressed_M_Count] = useState(ALL_KEYS_PRESSED.m);
  const [pressed_N_Count, setPressed_N_Count] = useState(ALL_KEYS_PRESSED.n);
  const [pressed_O_Count, setPressed_O_Count] = useState(ALL_KEYS_PRESSED.o);
  const [pressed_P_Count, setPressed_P_Count] = useState(ALL_KEYS_PRESSED.p);
  const [pressed_Q_Count, setPressed_Q_Count] = useState(ALL_KEYS_PRESSED.q);
  const [pressed_R_Count, setPressed_R_Count] = useState(ALL_KEYS_PRESSED.r);
  const [pressed_S_Count, setPressed_S_Count] = useState(ALL_KEYS_PRESSED.s);
  const [pressed_T_Count, setPressed_T_Count] = useState(ALL_KEYS_PRESSED.t);
  const [pressed_U_Count, setPressed_U_Count] = useState(ALL_KEYS_PRESSED.u);
  const [pressed_V_Count, setPressed_V_Count] = useState(ALL_KEYS_PRESSED.v);
  const [pressed_W_Count, setPressed_W_Count] = useState(ALL_KEYS_PRESSED.w);
  const [pressed_X_Count, setPressed_X_Count] = useState(ALL_KEYS_PRESSED.x);
  const [pressed_Y_Count, setPressed_Y_Count] = useState(ALL_KEYS_PRESSED.y);
  const [pressed_Z_Count, setPressed_Z_Count] = useState(ALL_KEYS_PRESSED.z);
  const [pressed_1_Count, setPressed_1_Count] = useState(ALL_KEYS_PRESSED.ONE);
  const [pressed_2_Count, setPressed_2_Count] = useState(ALL_KEYS_PRESSED.TWO);
  const [pressed_3_Count, setPressed_3_Count] = useState(
    ALL_KEYS_PRESSED.THREE
  );
  const [pressed_4_Count, setPressed_4_Count] = useState(ALL_KEYS_PRESSED.FOUR);
  const [pressed_5_Count, setPressed_5_Count] = useState(ALL_KEYS_PRESSED.FIVE);
  const [pressed_6_Count, setPressed_6_Count] = useState(ALL_KEYS_PRESSED.SIX);
  const [pressed_7_Count, setPressed_7_Count] = useState(
    ALL_KEYS_PRESSED.SEVEN
  );
  const [pressed_8_Count, setPressed_8_Count] = useState(
    ALL_KEYS_PRESSED.EIGHT
  );
  const [pressed_9_Count, setPressed_9_Count] = useState(ALL_KEYS_PRESSED.NINE);
  const [pressed_0_Count, setPressed_0_Count] = useState(ALL_KEYS_PRESSED.ZERO);
  const [pressed_Space_Count, setPressed_Space_Count] = useState(
    ALL_KEYS_PRESSED.Shift
  );
  const [pressed_Shift_Count, setPressed_Shift_Count] = useState(
    ALL_KEYS_PRESSED.Space
  );

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
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
  const pressedCapitalT = useKeyPress("T");
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
  const pressedBackSpace = useKeyPress("Backspace");
  const pressedShift = useKeyPress("Shift");

  useEffect(() => {
    if (pressedA || pressedCapitalA) {
      setPressed_A_Count((pressed) => (pressed = pressed_A_Count + 1));
    } else if (pressedB || pressedCapitalB) {
      setPressed_B_Count((pressed) => (pressed = pressed_B_Count + 1));
    } else if (pressedC || pressedCapitalC) {
      setPressed_C_Count((pressed) => (pressed = pressed_C_Count + 1));
    } else if (pressedD || pressedCapitalD) {
      setPressed_D_Count((pressed) => (pressed = pressed_D_Count + 1));
    } else if (pressedE || pressedCapitalE) {
      setPressed_E_Count((pressed) => (pressed = pressed_E_Count + 1));
    } else if (pressedF || pressedCapitalF) {
      setPressed_F_Count((pressed) => (pressed = pressed_F_Count + 1));
    } else if (pressedG || pressedCapitalG) {
      setPressed_G_Count((pressed) => (pressed = pressed_G_Count + 1));
    } else if (pressedH || pressedCapitalH) {
      setPressed_H_Count((pressed) => (pressed = pressed_H_Count + 1));
    } else if (pressedI || pressedCapitalI) {
      setPressed_I_Count((pressed) => (pressed = pressed_I_Count + 1));
    } else if (pressedJ || pressedCapitalJ) {
      setPressed_J_Count((pressed) => (pressed = pressed_J_Count + 1));
    } else if (pressedK || pressedCapitalK) {
      setPressed_K_Count((pressed) => (pressed = pressed_K_Count + 1));
    } else if (pressedL || pressedCapitalL) {
      setPressed_L_Count((pressed) => (pressed = pressed_L_Count + 1));
    } else if (pressedM || pressedCapitalM) {
      setPressed_M_Count((pressed) => (pressed = pressed_M_Count + 1));
    } else if (pressedN || pressedCapitalN) {
      setPressed_N_Count((pressed) => (pressed = pressed_N_Count + 1));
    } else if (pressedO || pressedCapitalO) {
      setPressed_O_Count((pressed) => (pressed = pressed_O_Count + 1));
    } else if (pressedP || pressedCapitalP) {
      setPressed_P_Count((pressed) => (pressed = pressed_P_Count + 1));
    } else if (pressedQ || pressedCapitalQ) {
      setPressed_Q_Count((pressed) => (pressed = pressed_Q_Count + 1));
    } else if (pressedR || pressedCapitalR) {
      setPressed_R_Count((pressed) => (pressed = pressed_R_Count + 1));
    } else if (pressedS || pressedCapitalS) {
      setPressed_S_Count((pressed) => (pressed = pressed_S_Count + 1));
    } else if (pressedT || pressedCapitalT) {
      setPressed_T_Count((pressed) => (pressed = pressed_T_Count + 1));
    } else if (pressedU || pressedCapitalU) {
      setPressed_U_Count((pressed) => (pressed = pressed_U_Count + 1));
    } else if (pressedV || pressedCapitalV) {
      setPressed_V_Count((pressed) => (pressed = pressed_V_Count + 1));
    } else if (pressedW || pressedCapitalW) {
      setPressed_W_Count((pressed) => (pressed = pressed_W_Count + 1));
    } else if (pressedX || pressedCapitalX) {
      setPressed_X_Count((pressed) => (pressed = pressed_X_Count + 1));
    } else if (pressedY || pressedCapitalY) {
      setPressed_Y_Count((pressed) => (pressed = pressed_Y_Count + 1));
    } else if (pressedZ || pressedCapitalZ) {
      setPressed_Z_Count((pressed) => (pressed = pressed_Z_Count + 1));
    } else if (pressed1) {
      setPressed_1_Count((pressed) => (pressed = pressed_1_Count + 1));
    } else if (pressed2) {
      setPressed_2_Count((pressed) => (pressed = pressed_2_Count + 1));
    } else if (pressed3) {
      setPressed_3_Count((pressed) => (pressed = pressed_3_Count + 1));
    } else if (pressed4) {
      setPressed_4_Count((pressed) => (pressed = pressed_4_Count + 1));
    } else if (pressed5) {
      setPressed_5_Count((pressed) => (pressed = pressed_5_Count + 1));
    } else if (pressed6) {
      setPressed_6_Count((pressed) => (pressed = pressed_6_Count + 1));
    } else if (pressed7) {
      setPressed_7_Count((pressed) => (pressed = pressed_7_Count + 1));
    } else if (pressed8) {
      setPressed_8_Count((pressed) => (pressed = pressed_8_Count + 1));
    } else if (pressed9) {
      setPressed_9_Count((pressed) => (pressed = pressed_9_Count + 1));
    } else if (pressed0) {
      setPressed_0_Count((pressed) => (pressed = pressed_0_Count + 1));
    } else if (pressedShift) {
      setPressed_Shift_Count((pressed) => (pressed = pressed_Shift_Count + 1));
    } else if (pressedSpace) {
      setPressed_Space_Count((pressed) => (pressed = pressed_Space_Count + 1));
    }
  }, [
    pressedA,
    pressedCapitalA,
    pressedB,
    pressedCapitalB,
    pressedC,
    pressedCapitalC,
    pressedD,
    pressedCapitalD,
    pressedE,
    pressedCapitalE,
    pressedF,
    pressedCapitalF,
    pressedG,
    pressedCapitalG,
    pressedH,
    pressedCapitalH,
    pressedI,
    pressedCapitalI,
    pressedJ,
    pressedCapitalJ,
    pressedK,
    pressedCapitalK,
    pressedL,
    pressedCapitalL,
    pressedM,
    pressedCapitalM,
    pressedN,
    pressedCapitalN,
    pressedO,
    pressedCapitalO,
    pressedP,
    pressedCapitalP,
    pressedQ,
    pressedCapitalQ,
    pressedR,
    pressedCapitalR,
    pressedS,
    pressedCapitalS,
    pressedT,
    pressedCapitalT,
    pressedU,
    pressedCapitalU,
    pressedV,
    pressedCapitalV,
    pressedW,
    pressedCapitalW,
    pressedX,
    pressedCapitalX,
    pressedY,
    pressedCapitalY,
    pressedZ,
    pressedCapitalZ,
    pressed1,
    pressed2,
    pressed3,
    pressed4,
    pressed5,
    pressed6,
    pressed7,
    pressed8,
    pressed9,
    pressed0,
    pressedShift,
    pressedSpace,
  ]);

  useEffect(() => {
    dispatch({
      type: "SET_KEYS_PRESSED",
      payload: {
        a: pressed_A_Count,
        b: pressed_B_Count,
        c: pressed_C_Count,
        d: pressed_D_Count,
        e: pressed_E_Count,
        f: pressed_F_Count,
        g: pressed_G_Count,
        h: pressed_H_Count,
        i: pressed_I_Count,
        j: pressed_J_Count,
        k: pressed_K_Count,
        l: pressed_L_Count,
        m: pressed_M_Count,
        n: pressed_N_Count,
        o: pressed_O_Count,
        p: pressed_P_Count,
        q: pressed_Q_Count,
        r: pressed_R_Count,
        s: pressed_S_Count,
        t: pressed_T_Count,
        u: pressed_U_Count,
        v: pressed_V_Count,
        w: pressed_W_Count,
        x: pressed_X_Count,
        y: pressed_Y_Count,
        z: pressed_Z_Count,
        ONE: pressed_1_Count,
        TWO: pressed_2_Count,
        THREE: pressed_3_Count,
        FOUR: pressed_4_Count,
        FIVE: pressed_5_Count,
        SIX: pressed_6_Count,
        SEVEN: pressed_7_Count,
        EIGHT: pressed_8_Count,
        NINE: pressed_9_Count,
        ZERO: pressed_0_Count,
        Space: pressed_Space_Count,
        Shift: pressed_Shift_Count,
      },
    });
  }, [pressedSpace]);

  return (
    <div>
      <div
        style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
        className="keyboard"
      >
        <div className="fifth-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedAproximate || pressedBackTic
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            `~
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed1 || pressedExclamation
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            1 !
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed2 || pressedAdd ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            2 @
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed3 || pressedSharp ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            3 #
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed4 || pressedDollar
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            4 $
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed5 || pressedPerCent
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            5 %
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed6 || pressedUpArrow
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            6 ^
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed7 || pressedAnd ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            7 &
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed8 || pressedStart ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            8 *
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed9 || pressedOpenParenthesis
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            9 (
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed0 || pressedCloseParenthesis
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            0 )
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedMinus || pressedUnderScore
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            - _
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedEqual || pressedPlus
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            = +
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedBackSpace
                ? "keyboard-backspace-pressed"
                : "keyboard-backspace"
            }
          >
            Backspace
          </div>
        </div>
        <div className="forth-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-tab"
          >
            TAB
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedQ || pressedCapitalQ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Q
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedW || pressedCapitalW
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            W
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedE || pressedCapitalE
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            E
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedR || pressedCapitalR
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            R
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedT || pressedCapitalT
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            T
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedY || pressedCapitalY
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Y
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedU || pressedCapitalU
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            U
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedI || pressedCapitalI
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            I
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedO || pressedCapitalO
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            O
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedP || pressedCapitalP
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            P
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedLeftCurlyBrace || pressedLeftSquareBracket
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            [{" {"}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedRigthCurlyBrace || pressedRigthSquareBracket
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ]{" }"}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={pressedQ ? "keyboard-key-pressed" : "keyboard-key"}
          >
            \ |
          </div>
        </div>
        <div className="third-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-caps"
          >
            CAPS
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedA || pressedCapitalA
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            A
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedS || pressedCapitalS
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            S
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedD || pressedCapitalD
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            D
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedF || pressedCapitalF
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            F
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedG || pressedCapitalG
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            G
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedH || pressedCapitalH
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            H
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedJ || pressedCapitalJ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            J
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedK || pressedCapitalK
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            K
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedL || pressedCapitalL
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            L
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedColon || pressedSemiColon
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ; :
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedSingleQuote || pressedDoubleQuote
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ' "
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-enter"
          >
            ENTER
          </div>
        </div>
        <div className="second-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedShift ? "keyboard-shift-pressed" : "keyboard-shift"
            }
          >
            SHIFT
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedZ || pressedCapitalZ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Z
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedX || pressedCapitalX
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            X
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedC || pressedCapitalC
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            C
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedV || pressedCapitalV
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            V
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedB || pressedCapitalB
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            B
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedN || pressedCapitalN
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            N
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedM || pressedCapitalM
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            M
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedComma || pressedLesserThan
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            ,{" <"}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedDot || pressedBiggerThan
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            .{" >"}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedForwardSlash || pressedQuestion
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            / ?
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={"keyboard-big-shift"}
          >
            SHIFT
          </div>
        </div>
        <div className="first-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-ctrl"
          >
            CTRL
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-alt"
          >
            ALT
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedSpace ? "keyboard-space-pressed" : "keyboard-space"
            }
          >
            SPACE
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-alt"
          >
            ALT
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-ctrl"
          >
            CTRL
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qwerty;
