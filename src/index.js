import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import { Provider } from "react-redux";
import { loadState, saveState } from "./localStorage";
import store, { Persistor } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

store.subscribe(() => {
  saveState(store);
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate Loading={null} persistor={Persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
