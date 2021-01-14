import React, { useReducer } from 'react';
import axios from 'axios';
import UploadContext from './UploadContext';
import UploadReducer from './UploadReducer';
import {
  UPLOAD_FILE,
  UPLOAD_PERCENTAGE,
  SET_ALERT,
  CLEAR_ALERT,
  RESET_PERCENTAG,
  LOADING_LINK
  
} from './types'
let cancelTokenSource = axios.CancelToken.source();
const UploadState = props =>{
  const initialState={
    loading: false,
    uploadPercentage:0,
    uploadedFile: null,
    alert: null,
  }
  const [state, dispatch] = useReducer(UploadReducer, initialState)
  const uploadFile = async file =>{
    loadingLink()

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      cancelToken : cancelTokenSource.token,
      onUploadProgress: ProgressEvent=>{
        if(ProgressEvent.total >= 200 * 1024 *1024) {
          //cancelTokenSource.cancel('Upload cancelled');
          abort()
          dispatch({type: SET_ALERT, payload: 'file too large max 200 mb'})
          setTimeout(()=>window.location.reload(), 900)
        }
        dispatch({type: UPLOAD_PERCENTAGE, payload: ProgressEvent})
      }
    }
    try {
      //console.log(file)
      let res = await axios.post('api/files/upload', file, config)
      dispatch({type: UPLOAD_FILE, payload: res.data, })
    } catch (error) {
      console.log(error.message)
      if(error.message === 'Upload cancelled') {
        return 
      } else{
        dispatch({type: SET_ALERT, payload: error.response.data.message})
      }
    }
  }
  const loadingLink = () => dispatch({type: LOADING_LINK})
  const resetPercentage = () => dispatch({type: RESET_PERCENTAG} )
  const clearAlert = ()=> dispatch({type: CLEAR_ALERT})
  const abort = () =>{  cancelTokenSource.cancel('Upload cancelled')}


return (
  <UploadContext.Provider
    value={{
      loading: state.loading,
      uploadPercentage: state.uploadPercentage,
      uploadedFile: state.uploadedFile,
      alert: state.alert,
      abort,
      uploadFile,
      clearAlert,
      resetPercentage,
    }}
  >
    {props.children}
  </UploadContext.Provider>
)
}

export default UploadState