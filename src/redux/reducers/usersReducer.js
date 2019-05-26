import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SET_CATEGORY_IDX,
} from '../constants/users';

export const initialState = {
  users: [],
  loading: false,
  usersError: '',
  categoryIdx: 0,
  categories: ['Master Record 1', 'Master Record 2', 'Master Record 3', 'Master Record 4'],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_IDX:
      return {
        ...state,
        categoryIdx: action.data,
      };
    case GET_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.data,
        loading: false,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        usersError: action.error.message,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
