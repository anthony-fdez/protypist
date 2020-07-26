import { combineReducers } from "redux";
import { act } from "react-dom/test-utils";

const darkModeReducer = (state = false, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return !state;
    default:
      return state;
  }
};

const lengthReducer = (state = 20, action) => {
  switch (action.type) {
    case "SET_TO_20":
      return (state = 20);
    case "SET_TO_35":
      return (state = 35);
    case "SET_TO_50":
      return (state = 50);
    default:
      return state;
  }
};

const realTimeWPMReducer = (state = false, action) => {
  switch (action.type) {
    case "REAL_TIME_WPM":
      return !state;
    default:
      return state;
  }
};

const latestWPMReducer200 = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_WPM_200":
      return action.payload;
    default:
      return state;
  }
};

const previousWPMReducer200 = (state = 0, action) => {
  switch (action.type) {
    case "SET_PREVIOUS_WPM_200":
      return action.payload;
    default:
      return state;
  }
};

const latestCPMReducer200 = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_CPM_200":
      return action.payload;
    default:
      return state;
  }
};

const latestWPMReducer1000 = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_WPM_1000":
      return action.payload;
    default:
      return state;
  }
};

const latestCPMReducer1000 = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_CPM_1000":
      return action.payload;
    default:
      return state;
  }
};

const keyboardOnScreenReducer = (state = true, action) => {
  switch (action.type) {
    case "SET_KEYBOARD_ON_SCREEN":
      return !state;
    default:
      return state;
  }
};

const latestWPMReducerTypingGame = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_WPM":
      return action.payload;
    default:
      return state;
  }
};

const previousWPMReducerTypingGame = (state = 0, action) => {
  switch (action.type) {
    case "SET_PREVIOUS_WPM":
      return action.payload;
    default:
      return state;
  }
};

const latestCPMReducerTypingGame = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_CPM":
      return action.payload;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  darkModeReducer: darkModeReducer,
  lengthReducer: lengthReducer,
  realTimeWPMReducer: realTimeWPMReducer,
  latestWPMReducer200: latestWPMReducer200,
  latestCPMReducer200: latestCPMReducer200,
  latestWPMReducer1000: latestWPMReducer1000,
  latestCPMReducer1000: latestCPMReducer1000,
  keyboardOnScreenReducer: keyboardOnScreenReducer,
  latestCPMReducerTypingGame: latestCPMReducerTypingGame,
  latestWPMReducerTypingGame: latestWPMReducerTypingGame,
  previousWPMReducer200: previousWPMReducer200,
  previousWPMReducerTypingGame: previousWPMReducerTypingGame,
});

export default allReducers;
