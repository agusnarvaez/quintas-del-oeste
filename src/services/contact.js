
const fieldsList = [
    {
        name:"from_name",
        type:"text",
        class: "form-control col-12 border-0 p-2 border-radius-none",
        value:"",
        placeholder:"Nombre y apellido",
        isValid:false,
        showErrors:false,
        error:"Ingrese un nombre y apellido"
    },
    {
        name:"from_email",
        type:"text",
        class: "form-control col-12 border-0 p-2 border-radius-none",
        value:"",
        placeholder:"Email",
        isValid:false,
        showErrors:false,
        error:"Ingrese un email válido"
    },
    {
        name:"phone",
        type:"tel",
        class: "form-control col-12 border-0 p-2 border-radius-none",
        value:"",
        placeholder:"Ingrese un teléfono",
        isValid:false,
        showErrors:false,
        error:"Ingrese un teléfono válido"
    },
    {
        name:"message",
        type:"text",
        class: "form-control col-12 border-0 p-2 border-radius-none",
        value:"",
        placeholder:"¿Por qué deseas contactarte?",
        isValid:false,
        showErrors:false,
        error:"Ingrese un mensaje"
    },
    {
        name:"captcha",
        type:"captcha",
        class:"recaptcha",
        value:"",
        isValid:false,
        showErrors:false,
        error:"Por favor, verifique que no es un robot"
    }
]

//* Campos de EmailJS
const frmContact = {
    from_name: '',
    from_email: '',
    phone: '',
    subject: '',
    message: '',
    attachment: ''
}


export {fieldsList,frmContact}