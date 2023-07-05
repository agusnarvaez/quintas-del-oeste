// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage"
import {v4} from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import credentials from '../credentials.js'

//* Inicializar Firebase
const app = initializeApp(credentials.firebaseConfig)
export const storage = getStorage(app)

/**
 *
 * @param {File} file => Archivo a subir
 * @param {String} name => Nombre de la persona a la que pertenece el archivo
 * @param {String} id => N° de documento de la persona a la que pertenece el archivo
 * @returns {Promise<String>} => Url de descarga del archivo
 */

export async function uploadReservationFile(file,name,id){
    //* Genero un nombre único para el archivo y lo guardo en storage
    const storageRef = ref(storage,`documentos-reservas/${name}-${id}-${v4()}`)

    //* Subo el archivo a storage
    await  uploadBytes(storageRef,file)
    //* Obtengo la url de descarga del archivo
    const url = await getDownloadURL(storageRef)
    return url
}