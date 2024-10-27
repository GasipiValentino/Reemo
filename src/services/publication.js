import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

async function uploadImage(file, userId, carId) {
  if (!file) return null;
  const timestamp = Date.now(); // Generar un timestamp
  const storageRef = ref(storage, `cars/${userId}/${carId}-car-${timestamp}.jpg`); 
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

export async function saveCars({ user_id, email, marca, modelo, año, chasis, motor, combustible, kilometraje, patente, transmision, puertas, asientos, description, direccion, precio, accessories }, images) {
  const carsRef = collection(db, 'cars');

  try {
    const photoURLs = [];
    for (let i = 0; i < images.length; i++) {
      const url = await uploadImage(images[i], user_id, i);
      if (url) {
        photoURLs.push(url);
      }
    }

    return addDoc(carsRef, {
      user_id,
      email,
      marca,
      modelo,
      año,
      chasis,
      motor,
      combustible,
      kilometraje,
      patente,
      transmision,
      puertas,
      asientos,
      description,
      direccion,
      precio,
      accessories: accessories || [],
      images: photoURLs, 
      created_at: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error al guardar los datos del auto:', error);
    throw error;
  }
}

export function subscribeToNewPublication(callback){
    const carsRef = collection(db, 'cars');
    const q = query(carsRef, orderBy('created_at'));

    onSnapshot(q, snapshot => {
        // Transformamos el snapshot en un array de mensajes.
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                email: doc.data().email,
                marca: doc.data().marca,
                modelo: doc.data().modelo,
                año: doc.data().año,
                chasis: doc.data().chasis,
                motor: doc.data().motor,
                combustible: doc.data().combustible,
                kilometraje: doc.data().kilometraje,
                patente: doc.data().patente,
                transmision: doc.data().transmision,
                puertas: doc.data().puertas,
                asientos: doc.data().asientos,
                description: doc.data().description,
                direccion: doc.data().direccion,
                precio: doc.data().precio,
                accessories: doc.data().accessories || []
            }
        });
        // Invocamos el callback que nos pasaron como parámetro y le mandamos los mensajes.
        callback(messages);
    });

}