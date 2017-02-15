import React from 'react';
import {NavigationContainer} from './containers';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavigationContainer />
        // 리액트 라우터 하위 항목들이 이 props.children으로 전달된다
        {this.props.children}
      </div>
    );
  }
}
export default App;
