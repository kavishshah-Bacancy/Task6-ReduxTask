import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: [],
  error: null,
  loading: false,
};

const userApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        user: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userApiReducer;
