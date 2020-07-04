import { combineReducers } from "redux";

const darkModeReducer = (state = false, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return !state;
    default:
      return false;
  }
};

const allReducers = combineReducers({
  darkModeReducer: darkModeReducer,
});

export default allReducers;
