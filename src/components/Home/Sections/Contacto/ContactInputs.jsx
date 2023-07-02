import SmallInput from "./SmallInput"
import LargeInput from "./LargeInput"
import Captcha from "./Captcha"

export default function ContactInputs({fields,contact,setContact}) {

    return (
        <>
        {
            fields.map((field,key) => {
                switch(field.name){
                    case "captcha": return <Captcha field={field} key={key} />
                    case "message": return <LargeInput field={field} key={key} contact={contact}setContact={setContact}/>
                    /* case "contactSmallInput": return <SmallInput key={key} field={field} contact={contact} setContact={setContact} /> */
                    default: return <SmallInput key={key} field={field} contact={contact} setContact={setContact} />
            }})
        }
        </>
    )
}