import { useState } from "react"
export default function LargeInput({field,contact,setContact}) {
    var inputClassContainerClass = "border my-2 col-12"
    var inputSuccess = "my-2 col-12 border-quintas-green"
    var inputError = "border my-2 col-12 border-2 border-danger"

    const [inputClass,setInputClass] = useState(inputClassContainerClass)

    const handleChange = (event) => {

        const { name, value } = event.target
        setContact({ ...contact, [name]: value })

        if(event.target.value.length > 0){
            field.isValid = true
        }else{
            field.isValid = false
        }
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
            <div className={inputClass}>
                <textarea
                    className={field.class}
                    id="input"
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                />
            </div>
            {field.showErrors?<p className="text-danger fw-bold">{field.error}</p>:null}
        </>
    )
}