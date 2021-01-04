import React,{useRef,useEffect, useState} from 'react'

const Links = ({url}) => {
  const [copied, setCopied] = useState('')
  const copyThis = useRef(null)
  useEffect(()=>{
    if(copied !== ''){
      setTimeout(()=>setCopied(''), 4000)
    }
  })
  const onClick = e =>{
    let text = copyThis.current.innerText
    navigator.clipboard.writeText(text)
    setCopied('copied')
  }
  return (
    <div className='links-flex' > 
      <a ref={copyThis}  rel="noreferrer noopener" target='_blank' href={url}>{url}</a>
      <div className="copy-flex">
        <button className='button button-small' onClick={onClick}>Copy</button>
        {copied !=='' ? <small>copied</small> : null }
      </div>
     
    </div>
  )
}

export default Links

