import React from 'react';
import { shallow } from 'enzyme';
import CardHeader from '../CardHeader';

describe('CardHeader', () => {

  test('Component should render', () => {
    const cardHeader = shallow(<CardHeader />);
    expect(cardHeader).toMatchSnapshot();
  })

  test('Component should render title and subtext', () => {
    const titleText = "Title", subtitleText = "Subtitle";
    const cardHeader = shallow(<CardHeader title={titleText} subtitle={subtitleText} />)

    const title = cardHeader.find('.card-title');
    const subTitle = cardHeader.find('.small-text');

    expect(title.text()).toBe(titleText);
    expect(subTitle.text()).toBe(subtitleText);
  })

})
