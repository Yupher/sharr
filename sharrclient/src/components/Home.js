import React,{useContext,Fragment, useEffect} from 'react'
import FileUpload from './FileUpload'
import ProgressBar from './ProgressBar'
import Loading from './Loading'
import UploadContext from '../context/UploadContext'
import Links from './Links'

const Home = () => {
  const uploadContext = useContext(UploadContext)
  const {loading,clearAlert, alert, uploadedFile} = uploadContext
  useEffect(() => {
    if(alert !== null){
      setTimeout(() => {
        clearAlert()
      }, 5000);
    }
    // eslint-disable-next-line
  }, [alert])




  return (
    <div className='container'>
      <h1 className='title'>SHARR</h1>
      
      {
        loading === false && alert !== null  ? <p style={{fontSize:'20px', textAlign: 'center'}} >{alert}</p> : null
      }
      <FileUpload />
      <ProgressBar />
      {/* <Links    url={uploadedFile.url}  /> */}
      {uploadedFile === null && loading === false ? null: <Fragment> {uploadedFile === null && loading === true ?<Fragment>
              <Loading />
              <p style={{fontSize: '16px', textAlign:'center'}}>generating download link...</p>
            </Fragment> :   <Links  url={uploadedFile.url} />}</Fragment>  
        
       }
       
    </div>
  )
}

export default Home
