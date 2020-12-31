import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import SideMenu from "./components/SideMenu/SideMenu";
import { BrowserRouter as Router } from "react-router-dom";
import allReducers from "./reducers/rootReducer";
import { isMobile } from "react-device-detect";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

//store
const store = createStore(
  allReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

//action

const Index = () => {
  const [openAnimation, setOpenAnimation] = useState(false);

  useEffect(() => {
    setOpenAnimation(true);
  }, []);

  const mobile = () => {
    return (
      <div
        className={openAnimation ? "mobile-warning" : "mobile-warning-loading"}
      >
        <div>
          <h1 style={{ fontSize: "90px" }}>Sorry :(</h1>
          <h4 style={{ fontSize: "40px", fontStyle: "italic" }}>
            This website was not meant to be used on mobile.
          </h4>
          <p className="info-text">
            This is a website to practice typing, and since the most people type
            in their computers it wouldn't make sense to make the site mobile
            compatible. If you want to check out the source code{" "}
            <a
              target="blank"
              style={{ fontStyle: "italic", textDecoration: "underline" }}
              href="https://github.com/anthony-fdez/protypist"
            >
              take a look at it here!
            </a>
          </p>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return mobile();
  } else
    return (
      <div className={openAnimation ? "index" : "index-loading"}>
        <Provider store={store}>
          <Router>
            <div style={{ display: "flex" }}>
              <SideMenu />
              <App />
            </div>
          </Router>
        </Provider>
      </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
