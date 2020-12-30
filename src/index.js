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

  return (
    <div className={openAnimation ? "index" : "index-loading"}>
      <Provider store={store}>
        <div className="mobile-warning">
          <div>
            <h1>Sorry :(</h1>
            <h4>This website wasn't made for mobile.</h4>
          </div>
        </div>
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
