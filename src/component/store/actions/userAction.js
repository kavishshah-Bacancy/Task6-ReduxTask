import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addUser = (userData) => {
  return {
    type: actionTypes.ADD_USER,
    payload: userData,
  };
};

export const deleteUser = (userid) => {
  return {
    type: actionTypes.DELETE_USER,
    payload: userid,
  };
};

export const updateUser = (users) => {
  return {
    type: actionTypes.UPDATE_USER,
    payload: users,
  };
};

export const fetchUser = () => {
  return {
    type: actionTypes.FETCH_USER,
  };
};

export const fetchUserSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload: userData,
  };
};

export const fetchUserFail = (err) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    payload: err,
  };
};

//Action Creators
export const fetchUserInit = () => {
  return (dispatch) => {
    dispatch(fetchUser());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        dispatch(fetchUserSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchUserFail(error));
      });
  };
};
