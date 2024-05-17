import axios from "axios";
import { SERVER_BASE_URL } from "../../config/config";
import { ActionTypes } from "../constants/action-types";
import { ToastContainer, toast } from "react-toastify";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/auth/login`, {
      email,
      password,
    });

    toast.success('Login Successful'); 
    dispatch({
      type: ActionTypes.AUTHENTICATED_USER,
      payload: response.data,
    });


  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      console.log(error, 'error')
      toast.error('An error occurred.');
    }
  }
};

export const registerEmployer = (inputData) => async (dispatch) => {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/auth/register`, inputData);
    
    if (response) {
      toast.success('A new employer is added!');
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

export const updateEmployer = (checked, employer, token) => async (dispatch) => {
  try {
    const response = await axios.patch(`${SERVER_BASE_URL}/users/profile/${employer.id}`, {isApproved: checked}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response) {
      toast.success('Status Updated.');
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

export const getAllEmployers = (token, productionDate) => async (dispatch) => {
  try {
    let params = { limit: 99999 };
    if (productionDate) {
      let convertedDate = productionDate.toISOString().split('T')[0];
      params.productionDate = convertedDate;
    }

    const response = await axios.get(`${SERVER_BASE_URL}/users`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response) {
      dispatch({
        type: ActionTypes.EXPLOYERS_LIST,
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


export const logoutUser = (user, refreshToken, accessToken) => async (dispatch) => {
  const response = await axios.post(`${SERVER_BASE_URL}/auth/logout  `, {user, refreshToken: refreshToken}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  dispatch({
    type: ActionTypes.LOGOUT_USER,
  });
  
};
