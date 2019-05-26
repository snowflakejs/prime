import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({ usersReducer });

export default rootReducer;

export const findUser = (id, users) => {
  let user = {};

  if (users) {
    user = users.find(item => (item.id === id));
  }
  return user;
};
