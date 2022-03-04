import {
  ADD_ASSET_SUCCESS,
  ADD_ASSET_REQUEST,
  ADD_ASSET_FAIL,
  DELETE_ASSET,
} from "../constants/constants";
import axios from "axios";

export const assetAdd = (asset, currency, qty) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ASSET_REQUEST,
    });
    const assetRequestData = {
      quantity: Number(qty),
      asset: asset,
      currency: currency,
    };

    await axios.post("http://localhost:8080/api/asset", assetRequestData);

    dispatch({
      type: ADD_ASSET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADD_ASSET_FAIL,
      payload: error.response,
    });
  }
};

export const assetDelete = (asset) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ASSET,
    });

    await axios.post("http://localhost:8080/api/asset/delete", {
      id: asset._id,
    });
  } catch (error) {
    dispatch({
      type: ADD_ASSET_FAIL,
      payload: error.response,
    });
  }
};
