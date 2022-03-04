import {
  ADD_ASSET_SUCCESS,
  ADD_ASSET_REQUEST,
  ADD_ASSET_FAIL,
  DELETE_ASSET,
} from "../constants/constants";

export const assetReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ASSET_REQUEST:
      return { loading: true };
    case ADD_ASSET_SUCCESS:
      return { ...state, loading: false, assetData: action.payload };
    case ADD_ASSET_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_ASSET:
      return {};
    default:
      return state;
  }
};
