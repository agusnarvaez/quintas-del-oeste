
/* import check from '../../assets/img/icons/check.svg' */

export default function ContactInputs({buttonClass,setButtonClass,text}) {

    const buttonSelection = ()=>{
        switch(buttonClass){
            case "loading": return (
                <div className="p-2">
                    <div className="spinner-border text-quintas-green" role="status"/>
                </div>
                )
            case "success": return (
                <button className="container-fluid btn btn-success px-3 my-3" type="button">Enviado</button>)
            case "error": return (
                <button className="container-fluid btn btn-danger px-3 my-3" type="button">¡Ups! Ha habido un error</button>)
        default: return (
            <button
                className="btn-quintas container-fluid border-0 bg-quintas-green d-flex justify-content-center align-items-center py-2 my-3 w-75"
                type="submit"
                >
                    <p className="text-white m-0">{text}</p>
            </button>)
        }
    }
    return (
        <>
            {
                buttonSelection()
            }
        </>
    )
}