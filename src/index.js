import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import reducer from "./reducer";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={reducer}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);