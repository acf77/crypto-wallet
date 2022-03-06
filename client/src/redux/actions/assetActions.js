import {
  ADD_ASSET_SUCCESS,
  ADD_ASSET_REQUEST,
  ADD_ASSET_FAIL,
  DELETE_ASSET,
  LIST_ASSETS_REQUEST,
  LIST_ASSETS_SUCCESS,
  LIST_ASSETS_FAIL,
} from "../constants/constants";
import axios from "axios";

export const listAssets = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_ASSETS_REQUEST,
    });

    const { data } = await axios.get("http://localhost:8080/api/asset");

    dispatch({
      type: LIST_ASSETS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ASSETS_FAIL,
      payload: error.response,
    });
  }
};
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
export const assetUpdate = (editAsset, currency, qty) => async (dispatch) => {
  // try {
  //   dispatch({
  //     type: ADD_ASSET_REQUEST,
  //   });
  //   const assetRequestData = {
  //     quantity: Number(qty),
  //     asset: editAsset,
  //     currency: currency,
  //   };
  //   await axios.post(
  //     "http://localhost:8080/api/asset/update",
  //     assetRequestData
  //   );
  //   dispatch({
  //     type: ADD_ASSET_SUCCESS,
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: ADD_ASSET_FAIL,
  //     payload: error.response,
  //   });
  // }
};

export const assetDelete = (asset) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ASSET,
    });

    await axios.post("http://localhost:8080/api/asset/delete", asset);
  } catch (error) {
    dispatch({
      type: ADD_ASSET_FAIL,
      payload: error.response,
    });
  }
};
