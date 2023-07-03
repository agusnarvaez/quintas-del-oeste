import {useLots}from '../../context/LotsContext'

import {useState,useRef } from 'react'

export default function DeleteConfirmation({lot,hidePopUp}){
  const {deleteLot} = useLots()
  const [showUndo,setShowUndo] = useState(false)
  const [countDown, setCountDown] = useState(0)
  const intervalIdRef = useRef(null)

  const startCountDown = ()=>{
    setShowUndo(true)
    let count = 5
    setCountDown(count)
    intervalIdRef.current = setInterval(()=>{
      count--
      setCountDown(count)
      if(count===0){
        deleteLot(lot)
        clearInterval(intervalIdRef.current)
        setShowUndo(false)
        hidePopUp()
      }
    },1000)
  }
  const stopCountDown = ()=>{
    clearInterval(intervalIdRef.current)
    setShowUndo(false)
    hidePopUp()
    setCountDown(0)
  }

  return(
    <div className='popUpDelete col-12 ms-0 d-flex justify-content-between align-items-center'>
      {showUndo?
        <button className='btn btn-warning fw-bold bi bi-arrow-counterclockwise' onClick={stopCountDown}> DESHACER  {countDown}</button>
        :<div className='col-12 row flex-wrap justify-content-between m-0 p-0'>
          <h6 className='col-12 fs-6 m-0 p-0'>¿SEGURO DESEAS ELIMINAR EL LOTE?</h6>
          <button onClick={()=>startCountDown()} className="col-5 btn btn-danger" >SÍ</button>
          <button onClick={()=>hidePopUp()} className="col-5 btn btn-primary" >NO</button>
        </div>
      }
    </div>
    )
}
