import { useState } from "react"
export default function SmallInput({field,contact,setContact}) {
    var inputContainerClass = "border my-2 col-12"
    var inputSuccess = "my-2 col-12 border-quintas-green"
    var inputError = "border my-2 col-12 border-2 border-danger"

    const [inputClass,setInputClass] = useState(inputContainerClass)
    const checkEmail = (email)=>{
        if(email.includes("@")&&email.includes(".com")){
            field.isValid = true
        }else{
            field.isValid = false
        }
    }

    const handleChange = (event) => {

        const { name, value } = event.target
        setContact({ ...contact, [name]: value })
        event.target.value.length > 0 ?
            (field.name === "from_email") ?
                checkEmail(event.target.value)
            : field.isValid = true
        : field.isValid = false
    }

    const handleBlur = () => {
        if(field.isValid){
            setInputClass(inputSuccess)
            field.showErrors = false
        }else{
            setInputClass(inputError)
            field.showErrors = true
        }
    }
    return (
        <>
            <div className={inputClass} id={field.type}>
                <input
                    className={field.class}
                    id="input"
                    name={field.name}
                    placeholder={field.placeholder}
                    type={field.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                />
            </div>
            {field.showErrors?<p className="text-danger m-0 fw-bold">{field.error}</p>:null}
        </>
    )
}