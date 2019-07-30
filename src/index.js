import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import { LocaleProvider } from 'antd';
import App from './App';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
ReactDOM.render(
<LocaleProvider locale={zh_CN}>
    <Router>
        <App />
    </Router>
</LocaleProvider>,
 document.getElementById('root'));
registerServiceWorker();
