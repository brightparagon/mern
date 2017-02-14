import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {SignUpContainer} from './containers';
import App from './App';
import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

// ReactDOM.render(<App />, rootElement);
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="user/signup" component={SignUpContainer}/>
      </Route>
    </Router>
  </Provider>, rootElement
);
