import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: [
    {
      id: 100,
      firstName: "kavish",
      lastName: "shah",
      phone: 9876543211,
      email: "kavishshah84@gmail.com",
    },
    {
      id: 101,
      firstName: "varshil",
      lastName: "shah",
      phone: 9876543211,
      email: "varshilshah84@gmail.com",
    },
  ],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        user: [...state.user, action.payload],
        error: null,
      };
    case actionTypes.DELETE_USER:
      let updatedUser = state.user.filter((item) => item.id !== action.payload);
      return {
        ...state,
        user: updatedUser,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
