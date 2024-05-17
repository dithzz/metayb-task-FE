import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const jobReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.JOBS_LIST:
      return { ...state, jobsData: { ...payload } };
      case ActionTypes.JOB:
        return { ...state, job: { ...payload } };
    default:
      return state;
  }
};
