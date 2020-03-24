import {GET_DATA, IS_LOADING, SET_CURRENT_PAGE,
  SET_QUANTITY_PAGE, UPDATE_DATA, UPDATE_SORT_DATA} from "./table.types";
import {fetchGetDataBig, fetchGetDataSmall} from "../../../api/api";

// actionCreators =======================================================
export const isLoading = payload => {
  return {
    type: IS_LOADING,
    payload
  }
}

export const getDataAC = payload => {
  return {
    type: GET_DATA,
    payload
  }
}

export const updateData = payload => {
  return {
    type: UPDATE_DATA,
    payload
  }
}

export const updateSortData = payload => {
  return {
    type: UPDATE_SORT_DATA,
    payload
  }
}

export const setQuantityPage = payload => {
  return {
    type: SET_QUANTITY_PAGE,
    payload
  }
}

export const setCurrentPage = payload => {
  return {
    type: SET_CURRENT_PAGE,
    payload
  }
}

const getQuantityPage = data => {
  if (data.length) { return Math.ceil(data.length / 50) }
}


// thunkCreators =======================================================
export const getDataSmall = () => dispatch => {
  dispatch(isLoading(true))
  fetchGetDataSmall()
    .then(data => {
      dispatch(setCurrentPage(1))
      dispatch(setQuantityPage(getQuantityPage(data)))
      dispatch(getDataAC(data))
      dispatch(updateSortData({id: null}))
      dispatch(isLoading(false))
    })
}

export const getDataBig = () => dispatch => {
  dispatch(isLoading(true))
  fetchGetDataBig()
    .then(data => {
      dispatch(setCurrentPage(1))
      dispatch(setQuantityPage(getQuantityPage(data)))
      dispatch(getDataAC(data))
      dispatch(updateSortData({id: null}))
      dispatch(isLoading(false))
    })
}