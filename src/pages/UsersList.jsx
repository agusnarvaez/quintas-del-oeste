import { useEffect,useState } from 'react'
/* import {useLots}from '../../context/LotsContext'
import DeleteConfirmation from '../DeleteConfirmation'
import ReservationData from './ReservationData' */
import { getAll } from '../api/users'
import AdminHeader from '../components/Admin/AdminHeader'
import AdminFooter from '../components/Admin/AdminFooter'
import DeleteConfirmation from '../components/Admin/DeleteConfirmation'
export default function LotsList({setEditionForm,setShowForm}) {
  const [users, setUsers] = useState([])
  const [fetched, setFetched] = useState(false)
  const [showPopUp,setShowPopUp] = useState(false)
  const [userToDelete,setUserToDelete] = useState({})

  const fetchUsers = async () => {
    try{
      const response = await getAll()
      console.log(response.data.users)
      setUsers(response.data.users)
      setFetched(true)
    }catch(error){
      console.log(error)
    }
  }


  const showPopUpDelete = (lot)=>{
    setUserToDelete(lot)
    setShowPopUp(true)
  }
  const hidePopUp = ()=>{
    setShowPopUp(false)
    setUserToDelete({})
  }


  useEffect(()=>{
    if(!fetched && users.length === 0) fetchUsers()
  },[])

  return (
    <>
    <AdminHeader />
    <main className='userList-main'>
      <section className="userList lotsList text-admin-primary bg-admin-primary col-12 m-0 justify-content-center position-relative">
        <h2>USUARIOS</h2>
        <div className="lotList-table d-flex flex-column text-admin-primary bg-admin-primary">
          <ul className='lotList-header d-flex justify-content-between fw-bold text-admin-primary bg-admin-primary'>
              <li className='lotList-header-item col-1'>Nombre</li>
              <li className='lotList-header-item col-1'>Apellido</li>
              <li className='lotList-header-item col-3'>Email</li>
              <li className='lotList-header-item col-1'>Tipo</li>
              {/* <li className='lotList-header-item col-1'>Estado</li> */}
              <li className='lotList-header-item col-2'>Acciones</li>
          </ul>
          <div className='lotList-content text-admin-primary bg-admin-primary'>
              { users &&
                users.length > 0 &&
                users.sort((a, b) => a.lastName - b.lastName)
                  .map((user,i)=>{
                  return(
                    <article className='lotList-content-row d-flex justify-content-between my-3' key={i}>
                      <div className='lotList-content-item col-1 fw-bold'>{user.name}</div>
                      <div className='lotList-content-item col-1 '>{user.lastName}</div>
                      <div className='lotList-content-item col-3 '>{user.email}</div>
                      <div className='lotList-content-item col-1 position-relative '>{user.admin?"Administrador":"Cliente"}</div>
                      <div className='lotList-content-item d-flex col-2'>
                      {showPopUp&&userToDelete===user?
                        <DeleteConfirmation item={user} hidePopUp={hidePopUp} type='user' refreshList={fetchUsers}/>:
                        <>
                          {user.admin&&<button onClick={()=>showPopUpDelete(user)} className="bi bi-trash btn btn-danger ms-2" > Eliminar</button>}
                        </>
                      }
                      </div>
                    </article>)})
              }
          </div>
        </div>
      </section>
    </main>
    <AdminFooter />
    </>
  )
}