// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getStorage, ref,uploadBytes,getDownloadURL,listAll,deleteObject } from "firebase/storage"
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

async function copyFile(srcRef, destRef) {
    const srcUrl = await getDownloadURL(srcRef);
    const response = await fetch(srcUrl);
    const blob = await response.blob();
    await uploadBytes(destRef, blob);
}

async function moveFile(srcRef, destRef) {
    await copyFile(srcRef, destRef);
    await deleteObject(srcRef);
}


export async function uploadReservationFile(file,name,id){
    //* Genero un nombre único para el archivo y lo guardo en storage
    const storageRef = ref(storage,`temp/${name}-${id}-${v4()}`)

    //* Subo el archivo a storage temp
    try{
        await  uploadBytes(storageRef,file)
        const url = await getDownloadURL(storageRef)
        return url
        //* Obtengo la url de descarga del archivo
    }catch(error){
        console.log(error)
    }
}

/* export async function moveToFolder(from,to,filePath){
    const srcRef = ref(storage,from+"/" + filePath)
    const destRef = ref(storage,to+"/" + filePath)
  // Copiar el archivo de "temp" a "final"
  srcRef.copyTo(destRef)
    .then(() => {
      // Eliminar el archivo de "temp" después de haberlo copiado
      return srcRef.delete();
    })
    .then(() => {
      console.log("Archivo movido exitosamente a la carpeta 'final'");
    })
    .catch((error) => {
      console.error("Error al mover el archivo:", error)
    })
} */
export async function moveToFolder(filePath) {
    const srcRef = ref(storage, "temp/" + filePath);
    const destRef = ref(storage, "reservation-documents/" + filePath);

    try {
      const srcUrl = await getDownloadURL(srcRef)
        await  uploadBytes(destRef,srcUrl)
        const url = await getDownloadURL(destRef)
        //* Obtengo la url de descarga del archivo
        await deleteObject(srcRef)
        console.log("Archivo cargado en 'reservation-documents' y eliminado de 'temp' exitosamente.");
        return url
      // Una vez que se ha cargado el archivo en "reservation-documents", puedes eliminarlo de "temp"
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
}

/* export async function deleteTempFiles() {
    const tempRef = ref(storage, 'temp')
    const list = await listAll(tempRef)
        .then((res) => {
            return res
        })
        .catch((error) => {
            console.log(error)
        })

    await list.items.forEach(item => {
        deleteObject(item.fullPath)
            .then(() => {
                console.log('File deleted successfully')
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error)
          })
    })

    console.log('Todos los archivos de la carpeta "temp" han sido eliminados.');
} */

export async function deleteTempFiles() {
  const tempRef = ref(storage, 'temp')
  try {
    const list = await listAll(tempRef)
    const deletePromises = list.items.map(item => {
      return deleteObject(ref(storage, item.fullPath))
    })
    await Promise.all(deletePromises);
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
        console.log('Todos los archivos de la carpeta "temp" han sido cargados en "reservation-documents".');
    }catch(error){
        console.log(error)
    }
}