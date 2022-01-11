import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules";
import { Provider } from "react-redux";
import rootSaga from "./modules/saga/RootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
