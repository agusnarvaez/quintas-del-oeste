import { useRef } from "react"

import ReCAPTCHA from "react-google-recaptcha"
import credentials from "../../../../credentials.js"

export default function Captcha({field}) {

    const captcha = useRef(null)

    const onChangeCaptcha=()=>{
        if(captcha.current.getValue()){
            field.value = captcha.current.getValue()
            field.isValid = true
        }else{
            field.isValid = false
        }
    }

    return (
        <>
            <div className="container-fluid ps-5 ms-1 ms-xl-5 my-3 d-flex align-items-center">
                <ReCAPTCHA
                    ref={captcha}
                    sitekey={credentials.captchaKey}
                    onChange={onChangeCaptcha}
                />
            </div>
            {field.showErrors?<p className="errorShown">{field.error}</p>:null}
        </>
    )
}