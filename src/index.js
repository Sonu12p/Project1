import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import store from './store/store'
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import './style/index.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
