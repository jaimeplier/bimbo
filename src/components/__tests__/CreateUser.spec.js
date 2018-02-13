import React from 'react';
import { shallow } from 'enzyme';
import CreateUser from '../CreateUser';
import Modal from '../Modal';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SubmitButton from '../SubmitButton.jsx';

describe('CreateUser', () => {

  test('Component shuold render', () => {
    const createUser = shallow(<CreateUser />);
    expect(createUser).toMatchSnapshot();
  })

  test('Shows modal on button click', () => {
    const createUser = shallow(<CreateUser />);
    createUser.find(RaisedButton).simulate('click');

    expect(createUser.find(Modal).prop('show')).toBe(true);
  })

  test('Manager type should render email and name input field', () => {
    const createUser = shallow(<CreateUser type="manager" />);
    createUser.find(RaisedButton).simulate('click');

    expect(createUser.find(TextField)).toHaveLength(2);
    expect(createUser.find(TextField).at(0).prop('name')).toBe('name');
    expect(createUser.find(TextField).at(1).prop('name')).toBe('email');
  })

  test('Factory type should render only name input field', () => {
    const createUser = shallow(<CreateUser type="factory" />);
    createUser.find(RaisedButton).simulate('click');

    expect(createUser.find(TextField)).toHaveLength(1);
    expect(createUser.find(TextField).at(0).prop('name')).toBe('name');
  })

})


