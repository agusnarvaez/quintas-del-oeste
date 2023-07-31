
import {useEffect} from "react"

export default function CRUDNotification({showPopUp,setShowPopUp,crudStatus}) {
  const notificationClass = showPopUp?'CRUDNotification CRUDNotification__show': 'CRUDNotification CRUDNotification__hidden'
  console.log(crudStatus)
  const text = crudStatus === 'edited'? 'EDITADO' : crudStatus === 'created'? 'CREADO' : 'ELIMINADO'
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
      <h5 className='text-center display-block m-0'>SU LOTE HA SIDO {text} CORRECTAMENTE</h5>
    </div>
  )
}