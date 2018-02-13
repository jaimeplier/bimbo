import React from 'react';
import { shallow } from 'enzyme';
import ActionPlansInfo from '../ActionPlansInfo';
import { fromJS } from 'immutable';

describe('ActionPlansInfo', () => {

  test('Component should render', () => {
    const actionPlansInfo = shallow(<ActionPlansInfo />);
    expect(actionPlansInfo).toMatchSnapshot();
  })

  test('Component should render metrics', () => {
    const actionPlansInfo = shallow(
      <ActionPlansInfo metrics={fromJS({created: 10, completed: 10, pending: 10})} />
    )
    expect(actionPlansInfo).toMatchSnapshot();
  })

})


