import {
  GET_DATA, IS_LOADING, SET_CURRENT_PAGE, SET_QUANTITY_PAGE, UPDATE_DATA,
  UPDATE_SORT_DATA
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  data: null,
  pagination: {
    quantityPage: null,
    currentPage: 1,
    sizePage: 50
  },
  sortFields: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null
  }
}

const getDataReducer = (state = initialState, action) => {
  switch (action.type){
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case GET_DATA:
      return {
        ...state,
        data: action.payload
      }
    case UPDATE_DATA:
      return {
        ...state,
        data: action.payload
      }
    case UPDATE_SORT_DATA:
      return {
        ...state,
        sortFields: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
          ...action.payload
        }
      }
    case SET_QUANTITY_PAGE:
      return {
        ...state,
        pagination: {...state.pagination, quantityPage: action.payload}
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: {...state.pagination, currentPage: action.payload}
      }
    default:
      return state
  }

}

export default getDataReducer