import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.AUTHENTICATED_USER:
      return { ...state, user: { ...payload } };
      
    case ActionTypes.EXPLOYERS_LIST:
      return { ...state, employersData: { ...payload } };
      case ActionTypes.LOGOUT_USER:
        return { ...state, user: {} };
    default:
      return state;
  }
};
