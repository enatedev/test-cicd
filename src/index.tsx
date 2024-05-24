import { render } from "preact";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import preactLogo from "./assets/preact.svg";
import OddTableComponent from "./pages/oddTableComponent";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/lib/integration/react";
import "./style.css";

export function App() {
  return (
    <HelmetProvider>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <OddTableComponent />
        </Provider>
      </PersistGate>
    </HelmetProvider>
  );
}

render(<App />, document.getElementById("app"));
