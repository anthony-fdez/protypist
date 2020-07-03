import { combineReducers } from "redux";

const darkModeReducer = (state = true, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return !state;
    default:
      return true;
  }
};

const allReducers = combineReducers({
  darkModeReducer: darkModeReducer,
});

export default allReducers;
