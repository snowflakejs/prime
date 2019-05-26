import firebase from '../../firebase';

import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SET_CATEGORY_IDX,
} from '../constants/users';

// Actions
export const setCategoryIdx = data => ({ type: SET_CATEGORY_IDX, data });
export const getUsersStart = () => ({ type: GET_USERS_START });
export const getUsersSuccess = data => ({ type: GET_USERS_SUCCESS, data });
export const getUsersError = error => ({ type: GET_USERS_ERROR, error });

// Thunk Actions
export const getUsers = (category, callback) => (dispatch) => {
  dispatch(getUsersStart());
  const db = firebase.firestore();
  return (db.collection('users').where('category', '==', category).get()
    .then((snapshot) => {
      const users = [];

      snapshot.forEach((doc) => {
        const {
          name,
          email,
          roles,
          organisation,
          features,
          country,
        } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          roles,
          organisation,
          features,
          country,
        });
      });

      if (callback) {
        callback(users);
      }

      dispatch(getUsersSuccess(users));
    })
    .catch((err) => {
      dispatch(getUsersError(err));
      return (err);
    }));
};
