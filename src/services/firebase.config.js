// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getStorage, ref,uploadBytes,getDownloadURL,listAll,deleteObject,getMetadata } from "firebase/storage"
import {v4} from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import credentials from '../credentials.js'

//* Inicializar Firebase
const app = initializeApp(credentials.firebaseConfig.development)
export const storage = getStorage(app)

/**
 *
 * @param {File} file => Archivo a subir
 * @param {String} name => Nombre de la persona a la que pertenece el archivo
 * @param {String} id => N° de documento de la persona a la que pertenece el archivo
 * @returns {Promise<String>} => Url de descarga del archivo
 */

export async function uploadReservationFile(file, name, id) {
  const fileExtension = file.name.split('.').pop()
  console.log(file.type)
  const storageRef = ref(storage, `temp/${name}-${id}-${v4()}.${fileExtension}`)

  // Crear metadatos para el archivo
  const metadata = {
    contentType: file.type, // Especificar el tipo MIME
  }
  try {
      await uploadBytes(storageRef, file,metadata)
      const url = await getDownloadURL(storageRef)
      return url
  } catch (error) {
      console.log('Error uploading file:', error)
      throw error // Propaga el error para manejarlo en la llamada
  }
}
    export async function moveToFolder(filePath) {
        console.log('FilePath', filePath)
        const srcRef = ref(storage, "temp/" + filePath)
        const destRef = ref(storage, "reservation-documents/" + filePath)

        try {
            // Obtener los metadatos del archivo original
            const metadata = await getMetadata(srcRef)

            const srcUrl = await getDownloadURL(srcRef)
            const response = await fetch(srcUrl)
            const blob = await response.blob()

            // Subir el archivo con los metadatos originales
            await uploadBytes(destRef, blob, metadata)
            const url = await getDownloadURL(destRef)

            // Eliminar el archivo original de "temp"
            await deleteObject(srcRef)

            console.log("Archivo cargado en 'reservation-documents' y eliminado de 'temp' exitosamente.")
            return url
        } catch (error) {
            console.error("Error al cargar el archivo:", error)
        }
    }



export async function deleteTempFiles() {
  const tempRef = ref(storage, 'temp')
  try {
    const list = await listAll(tempRef)
    const deletePromises = list.items.map(item => {
      return deleteObject(ref(storage, item.fullPath))
    })
    await Promise.all(deletePromises)
    //console.log('Todos los archivos de la carpeta "temp" han sido eliminados.')
  } catch (error) {
    console.error("Error al eliminar archivos:", error)
  }
}

export async function moveReservationDocuments() {
    const tempRef = ref(storage, "temp")
    const list = await listAll(tempRef)

    const movePromises = list.items.map(item => {
      return moveToFolder(item.name)
    })
    try{
        await Promise.all(movePromises)
        console.log('Todos los archivos de la carpeta "temp" han sido cargados en "reservation-documents".')
    }catch(error){
        console.error(error)
    }
}