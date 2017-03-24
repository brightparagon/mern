import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {
  SignUpContainer,
  SignInContainer,
  PostCreateContainer,
  ListContainer,
} from './containers';
import App from './App';
import './index.css';
import '../semantic/dist/semantic.min.css';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

// ReactDOM.render(<App />, rootElement);
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ListContainer}/>
        <Route path="user/signup" component={SignUpContainer}/>
        <Route path="user/signin" component={SignInContainer}/>
        <Route path="user/profile" component={profileContainer}/>
        <Route path="post/write" component={PostCreateContainer}/>
        <Route path="post/all" component={ListContainer}/>
      </Route>
    </Router>
  </Provider>, rootElement
);
