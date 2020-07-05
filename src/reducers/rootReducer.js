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

const latestWPMReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_WPM":
      return action.payload;
    default:
      return state;
  }
};

const latestCPMReducer = (state = 0, action) => {
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
  latestWPMReducer: latestWPMReducer,
  latestCPMReducer: latestCPMReducer,
});

export default allReducers;
