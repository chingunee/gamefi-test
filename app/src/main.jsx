import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";

import CheckMetamask from "./components/checks/CheckMetamask";
import CheckAlert from "./components/checks/CheckAlert";
import CheckNetwork from "./components/checks/CheckNetwork";
import CheckOrganizer from "./components/checks/CheckOrganizer.jsx";

import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CheckMetamask>
      <CheckNetwork>
        <CheckOrganizer>
            <CheckAlert>
              <App />
            </CheckAlert>
        </CheckOrganizer>
      </CheckNetwork>
    </CheckMetamask>
  </Provider>
);
