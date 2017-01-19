import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CatsPage from './components/cats/CatsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/cats" component={CatsPage} />
    <Route path="/about" component={AboutPage} />
  </Route>
);
