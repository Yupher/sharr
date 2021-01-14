import React,{ useContext, useEffect} from 'react'
import UploadContext from '../context/UploadContext'


const ProgressBar = () => {
  const uploadContext= useContext(UploadContext)
  const {uploadPercentage, resetPercentage} =  uploadContext

  useEffect(()=>{
    if(uploadPercentage === 100){
      setTimeout(()=>{
        resetPercentage()
      }, 4000)
    }
    // eslint-disable-next-line
  },[uploadPercentage])
  
  return (
    <div className='progress-bar'>
      <div className="progress-bar-value">
        {uploadPercentage}%
      </div>
      <div className="progress-bar-fill" style={{width: `${uploadPercentage}%`}}>

      </div>
    </div>
  )
}

export default ProgressBar
