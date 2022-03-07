import {
  ADD_ASSET_SUCCESS,
  ADD_ASSET_REQUEST,
  ADD_ASSET_FAIL,
  DELETE_ASSET,
  LIST_ASSETS_REQUEST,
  LIST_ASSETS_SUCCESS,
  LIST_ASSETS_FAIL,
  EDIT_ASSETS_REQUEST,
  EDIT_ASSETS_SUCCESS,
  EDIT_ASSETS_FAIL,
} from "../constants/constants";

export const assetReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_ASSETS_REQUEST:
      return { loading: true };
    case LIST_ASSETS_SUCCESS:
      return { ...state, loading: false, assetData: action.payload };
    case LIST_ASSETS_FAIL:
      return { ...state, loading: false, assetData: action.payload };
    case ADD_ASSET_REQUEST:
      return { loading: true };
    case ADD_ASSET_SUCCESS:
      return { ...state, loading: false, assetData: action.payload };
    case ADD_ASSET_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_ASSETS_REQUEST:
      return { loading: true };
    case EDIT_ASSETS_SUCCESS:
      return { ...state, loading: false, assetData: action.payload };
    case EDIT_ASSETS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_ASSET:
      return {};
    default:
      return state;
  }
};
