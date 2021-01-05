import React, {useState, useContext} from 'react'
import UploadContext from '../context/UploadContext'

const FileUpload = () => {
  const [file, setFile] = useState(null)
  const uploadContext = useContext(UploadContext)
  let {uploadFile} = uploadContext
  const onSubmit = e =>{
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', file)
    uploadFile(formData)
  }
  const onChange = e =>{
     setFile(e.target.files[0]) 
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="file" onChange={onChange}  className="upload-box"/>
      <small>the file should NOT  be more than 200 mb</small>
      <input type="submit" value="Upload" className='button'/>
    </form>
  )
}

export default FileUpload
