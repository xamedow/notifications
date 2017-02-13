/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import HomePage from './containers/HomePage';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();

render(
  <Provider store={store}>
    <HomePage />
  </Provider>, document.getElementById('app')
);
