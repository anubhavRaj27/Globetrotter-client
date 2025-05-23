import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import { ToastProvider } from "./containers/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
