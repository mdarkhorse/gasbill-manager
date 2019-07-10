import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_INFO, GET_INFO_FAILED } from "./types";

// GET INFO
export const getInfo = () => (dispatch, getState) => {
  let tag = getState().auth.user.tag;

  axios
    .get("/api/info/", {
      params: {
        tag
      },
      headers: tokenConfig(getState).headers
    })
    .then(res => {
      dispatch({
        type: GET_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_INFO_FAILED
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
