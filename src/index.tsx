import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import SliderContainer from './components/SliderContainer/SliderContainer';
import slides from "./_slides";

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <SliderContainer slides={slides} />
  </React.StrictMode>,
  document.querySelector('.react-slider'),
);

serviceWorker.unregister();
