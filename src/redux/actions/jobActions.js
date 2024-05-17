import axios from "axios";
import { SERVER_BASE_URL } from "../../config/config";
import { ActionTypes } from "../constants/action-types";
import {  toast } from "react-toastify";



export const addJob = (inputData,token) => async (dispatch) => {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/jobs`, inputData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response) {
      toast.success('A new job is added!');
      return true
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An error occurred.');
    }
  }
};


export const getAllJobs = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/jobs?limit=99999`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response){
      dispatch({
        type: ActionTypes.JOBS_LIST,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error, 'error')
      toast.error('An error occurred.');
    }
  }
};

export const getJob = (jobId, token) => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response){
      dispatch({
        type: ActionTypes.JOB,
        payload: response.data,
      });
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error, 'error')
      toast.error('An error occurred.');
    }
  }
};


