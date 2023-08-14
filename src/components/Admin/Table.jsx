import { useEffect,useState } from 'react'
/* import {useLots}from '../../../context/LotsContext' */
/* import DeleteConfirmation from '../DeleteConfirmation' */

export default function Table({title,titles,elementsList,fetchElements,setElement,setEditionForm,setShowForm}) {

  const [showPopUp,setShowPopUp] = useState(false)
  const [lotToDelete,setLotToDelete] = useState({})

  const edit = (lotToEdit)=>{
    setShowForm(true)
    setElement(lotToEdit)
    setEditionForm(true)
  }
  const showPopUpDelete = (lot)=>{
    setLotToDelete(lot)
    setShowPopUp(true)
  }
  const hidePopUp = ()=>{
    setShowPopUp(false)
    setLotToDelete({})
  }
  /* const propertyValues =(element) => Object.keys(element).map(property => {
    return (
      <div key={property} className={`lotList-content-item col-${element.size} w-bold`}>
        {element[property]}
      </div>
  );}) */
  const propertyValues = (element) => {
    return Object.keys(element).map((property, index) => {
      const titleSize = titles[index].size
      return (
        <div key={property} className={`lotList-content-item col-${titleSize} w-bold`}>
          {element[property]}
        </div>
      );
    });
  };

  useEffect(()=>{
    if(elementsList.length === 0) fetchElements()
  },[fetchElements])

  return (
    <section className="lotsList text-admin-primary bg-admin-primary col-12 m-0 justify-content-center position-relative">
      <h2>{title}</h2>
      <div className="lotList-table d-flex flex-column text-admin-primary bg-admin-primary">
        <ul className='lotList-header d-flex justify-content-between fw-bold text-admin-primary bg-admin-primary'>
          {
            titles.map((title,i)=>{
              return(
                <li className={`lotList-header-item col-${title.size}`} key={i}>{title.name}</li>
              )
            })
          }
        </ul>
        <div className='lotList-content text-admin-primary bg-admin-primary'>
            {
              elementsList
                ?.sort((a, b) => a.number - b.number)
                .map((element,i)=>{
                return(
                  <article className='lotList-content-row d-flex justify-content-between my-3' key={i}>
                    {propertyValues(element)}
                  </article>)})
            }
        </div>
      </div>
    </section>
  )
}