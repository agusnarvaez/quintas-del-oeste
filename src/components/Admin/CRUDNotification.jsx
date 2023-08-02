
import {useEffect} from "react"

export default function CRUDNotification({showPopUp,setShowPopUp,text}) {
  const notificationClass = showPopUp?'CRUDNotification CRUDNotification__show': 'CRUDNotification CRUDNotification__hidden'

  useEffect(()=>{
    if(showPopUp){
      setTimeout(()=>{
        setShowPopUp(false)
      },3000)
    }
  },[showPopUp])
  return (
    <div className={notificationClass}>
      <i className="bi bi-check fs-1"/>
      <h5 className='text-center display-block m-0'>{text}</h5>
    </div>
  )
}