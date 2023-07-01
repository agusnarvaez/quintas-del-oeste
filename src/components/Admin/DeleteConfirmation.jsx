import {useLots}from '../../context/LotsContext'


export default function DeleteConfirmation({lot,hidePopUp}){
  const {deleteLot} = useLots()

  return(
    <div className='popUpDelete col-10 ms-3 d-flex justify-content-between align-items-center'>
      <h6 className='col-6 fs-5 m-0'>¿SEGURO DESEAS ELIMINAR EL LOTE?</h6>
      <button onClick={()=>deleteLot(lot)} className="col-1 btn btn-danger" > SÍ</button>
      <button onClick={()=>hidePopUp()} className="col-2 btn btn-primary" >NO</button>
    </div>
    )
}
