import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";

import CheckMetamask from "./components/checks/CheckMetamask";
import CheckAlert from "./components/checks/CheckAlert";
import CheckNetwork from "./components/checks/CheckNetwork";
import CheckOrganizer from "./components/checks/CheckOrganizer.jsx";
import CheckPlayer from "./components/checks/CheckPlayer";
import CheckLife from "./components/checks/CheckLife";

import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CheckMetamask>
      <CheckNetwork>
        <CheckOrganizer>
          <CheckPlayer>
            <CheckLife>
              <CheckAlert>
                <App />
              </CheckAlert>
            </CheckLife>
          </CheckPlayer>
        </CheckOrganizer>
      </CheckNetwork>
    </CheckMetamask>
  </Provider>
);
