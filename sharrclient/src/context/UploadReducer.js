/* eslint-disable import/no-anonymous-default-export */
import {
  UPLOAD_FILE,
  UPLOAD_PERCENTAGE,
  SET_ALERT,
  CLEAR_ALERT,
  LOADING_LINK,
  RESET_PERCENTAG
} from './types'

export default (state, action)=>{
  switch(action.type){
    case LOADING_LINK:
      return{
        ...state,
        loading:true
      }
    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
        uploadedFile: action.payload,
        
      }
    case UPLOAD_PERCENTAGE:
      return {
        ...state,
        uploadPercentage: parseInt(Math.round((action.payload.loaded * 100)/ action.payload.total))
      }
    case RESET_PERCENTAG:
      return {
        ...state,
        uploadPercentage: 0
      }
    case SET_ALERT:
      return{
        ...state,
        alert: action.payload,
        loading: false
      }
    case CLEAR_ALERT:
      return{
        ...state,
        alert: null,
        loading: false
      }
    default:
      return state
  }
}