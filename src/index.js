import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        // <Route path="user/signup" component={SignUp}/>
        // <Route path="user/signin" component={SignIn}/>
        // <Route path="user/profile" component={Profile}/>
        // <Route path="user/update" component={UserUpdate}/>
        // <Route path="post" component={Posts}/>
        // <Route path="post/upload" component={PostUpload}/>
        // <Route path="post/:id" component={Post}/>
        // <Route path="post/update" component={PostUpdate}/>
      </Route>
    </Router>
  </Provider>, rootElement
);
