import { combineReducers } from "redux";

const darkModeReducer = (state = true, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return !state;
    default:
      return state;
  }
};

const themeReducer = (state = "dark.json", action) => {
  switch (action.type) {
    case "SELECT_THEME":
      return action.payload;
    default:
      return state;
  }
};

const lengthReducerNormal = (state = 25, action) => {
  switch (action.type) {
    case "SET_TEXT_LENGHT":
      return action.payload;
    default:
      return state;
  }
};
const lengthReducerAdvanced = (state = 25, action) => {
  switch (action.type) {
    case "SET_TEXT_LENGHT_ADVANCED":
      return action.payload;
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

const latestWPMReducer1000 = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_WPM_1000":
      return action.payload;
    default:
      return state;
  }
};

const previousWPMReducer1000 = (state = 0, action) => {
  switch (action.type) {
    case "SET_PREVIOUS_WPM_1000":
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

const latestErrorsReducerTypingGame = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_ERRORS_TYPING_GAME":
      return action.payload;
    default:
      return state;
  }
};

const previousErrorsReducerTypingGame = (state = 0, action) => {
  switch (action.type) {
    case "SET_PREVIOUS_ERRORS_TYPING_GAME":
      return action.payload;
    default:
      return state;
  }
};

const latestErrorsReducer200 = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_ERRORS_200":
      return action.payload;
    default:
      return state;
  }
};

const previousErrorsReducer200 = (state = 0, action) => {
  switch (action.type) {
    case "SET_PREVIOUS_ERRORS_200":
      return action.payload;
    default:
      return state;
  }
};

const latestErrorsReducer1000 = (state = 0, action) => {
  switch (action.type) {
    case "SET_LATEST_ERRORS_1000":
      return action.payload;
    default:
      return state;
  }
};

const previousErrorsReducer1000 = (state = 0, action) => {
  switch (action.type) {
    case "SET_PREVIOUS_ERRORS_1000":
      return action.payload;
    default:
      return state;
  }
};

const openSideMenuReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_OPENING_SIDE_MENU":
      return !state;
    default:
      return state;
  }
};

const openLadderBoardMenu = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_OPENING_LADDERBOARD_MENU":
      return !state;
    default:
      return state;
  }
};

const isLoggedInReducer = (state = false, action) => {
  switch (action.type) {
    case "LOG_IN_OUT":
      return action.payload;
    default:
      return state;
  }
};

const JWTreducer = (state = null, action) => {
  switch (action.type) {
    case "SET_JWT":
      return action.payload;
    default:
      return state;
  }
};

const userIdReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return action.payload;
    default:
      return state;
  }
};

const instaDeathReducer = (state = false, action) => {
  switch (action.type) {
    case "ACTIVATE_INSTA_DEATH!":
      return !state;
    default:
      return state;
  }
};

const fontFamilyReducer = (state = "Arial, sans-serif", action) => {
  switch (action.type) {
    case "CHANGE_FONT_FAMILY":
      return action.payload;
    default:
      return state;
  }
};

const testLanguageReducer = (state = "english", action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return action.payload;
    default:
      return state;
  }
};

const customText = (
  state = "This is a sample text, delete this and copy, or type, your own text.",
  action
) => {
  switch (action.type) {
    case "SELECT_CUSTOM_TEXT":
      return action.payload;
    default:
      return state;
  }
};

const selectMenuShown = (state = true, action) => {
  switch (action.type) {
    case "SET_SELECT_MENU_OPEN":
      return action.payload;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  lengthReducerAdvanced: lengthReducerAdvanced,
  themeReducer: themeReducer,
  darkModeReducer: darkModeReducer,
  lengthReducerNormal: lengthReducerNormal,
  realTimeWPMReducer: realTimeWPMReducer,
  latestWPMReducer200: latestWPMReducer200,
  latestWPMReducer1000: latestWPMReducer1000,
  keyboardOnScreenReducer: keyboardOnScreenReducer,
  latestWPMReducerTypingGame: latestWPMReducerTypingGame,
  previousWPMReducerTypingGame: previousWPMReducerTypingGame,
  previousWPMReducer1000: previousWPMReducer1000,
  previousWPMReducer200: previousWPMReducer200,
  latestErrorsReducerTypingGame: latestErrorsReducerTypingGame,
  previousErrorsReducerTypingGame: previousErrorsReducerTypingGame,
  latestErrorsReducer200: latestErrorsReducer200,
  previousErrorsReducer200: previousErrorsReducer200,
  latestErrorsReducer1000: latestErrorsReducer1000,
  previousErrorsReducer1000: previousErrorsReducer1000,
  openSideMenuReducer: openSideMenuReducer,
  isLoggedInReducer: isLoggedInReducer,
  JWTreducer: JWTreducer,
  openLadderBoardMenu: openLadderBoardMenu,
  userIdReducer: userIdReducer,
  instaDeathReducer: instaDeathReducer,
  fontFamilyReducer: fontFamilyReducer,
  testLanguageReducer: testLanguageReducer,
  customText: customText,
  selectMenuShown: selectMenuShown,
});

export default allReducers;
