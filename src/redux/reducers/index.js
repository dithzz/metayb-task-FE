import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { jobReducer } from "./jobReducer";

const reducers = combineReducers({
  auth: authReducer,
  jobs: jobReducer
});

export default reducers;
