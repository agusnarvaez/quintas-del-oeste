import credentials from "../credentials"

export default function WhatsappButton() {
  return (
    <div className="position-fixed whatsappButton">
      <a className='bi bi-whatsapp text-white' href={credentials.whatsappApi} target="_blank" rel="noreferrer"> </a>
    </div>
  )
}