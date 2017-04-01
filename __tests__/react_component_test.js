import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {
  Profile,
} from '../src/components';

describe('Profile Component', () => {
  it('should have a root div', () => {
    const wrapper = shallow(<Profile/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('should have props for token', () => {
    let token = {
      email: 'kyeongmo2@gmail.com',
      name: 'Kyeongmo Noh',
    };

    const wrapper = shallow(<Profile token={token}/>);
    expect(wrapper.props().token).to.be.defined;
  });

  // it('renders children when passed in', () => {
  //   const wrapper = shallow(
  //     <MyComponent>
  //       <div className="unique" />
  //     </MyComponent>
  //   );
  //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  // });
});
