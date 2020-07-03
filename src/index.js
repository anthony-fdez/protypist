import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import SideMenu from "./components/SideMenu/SideMenu";
import { BrowserRouter as Router } from "react-router-dom";
import allReducers from "./reducers/rootReducer";

//store
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//action

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div style={{ display: "flex" }}>
          <SideMenu />
          <App />
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
