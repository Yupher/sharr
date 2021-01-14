import React, {useState, useContext} from 'react'
import UploadContext from '../context/UploadContext'

const FileUpload = () => {
  const [file, setFile] = useState(null)
  const uploadContext = useContext(UploadContext)
  let {uploadFile,uploadPercentage, abort } = uploadContext
  const onSubmit = e =>{
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', file)
    uploadFile(formData)
  }

  const onChange = e =>{
     setFile(e.target.files[0]) 
  }

  const onAbort = e =>{
    if(uploadPercentage === 0 ) return
    abort()
    setTimeout(()=>{window.location.reload()},900)
  }


  return (
    <form onSubmit={onSubmit}>
      <input  type="file" name="file" onChange={onChange}  className="upload-box"/>
      <small>the file should NOT  be more than 200 mb</small>
      <div style={{display:'flex',justifyContent:'space-between'}} >
        <input type="submit" value="Upload" className='button upload-btn'/>
        <input type="button" value="Abort" onClick={onAbort} className='button abort-btn'/> 
      </div>
    
    </form>
  )
}

export default FileUpload
