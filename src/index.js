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
  ProfileContainer
} from './containers';
import App from './App';
import './index.css';
import '../semantic/dist/semantic.min.css';

import {AppContainer} from 'react-hot-loader';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Component}>
            <IndexRoute component={ListContainer}/>
            <Route path="user/signup" component={SignUpContainer}/>
            <Route path="user/signin" component={SignInContainer}/>
            <Route path="user/profile" component={ProfileContainer}/>
            <Route path="post/write" component={PostCreateContainer}/>
            <Route path="post/all" component={ListContainer}/>
          </Route>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if(module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}

// ReactDOM.render(<App />, rootElement);

// ReactDOM.render(
  // <Provider store={store}>
  //   <Router history={browserHistory}>
  //     <Route path="/" component={App}>
  //       <IndexRoute component={ListContainer}/>
  //       <Route path="user/signup" component={SignUpContainer}/>
  //       <Route path="user/signin" component={SignInContainer}/>
  //       <Route path="user/profile" component={ProfileContainer}/>
  //       <Route path="post/write" component={PostCreateContainer}/>
  //       <Route path="post/all" component={ListContainer}/>
  //     </Route>
  //   </Router>
  // </Provider>, rootElement
// );
