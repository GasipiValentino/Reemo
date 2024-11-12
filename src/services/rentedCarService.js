import { collection,getDocs, query, where, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";
import {addAlert} from './alerts.js'

export async function fetchRentedCars(userId) {
    try {
      // Crea la consulta a firebase
      const carsCollection = collection(db, "rental_requests");
      const q = query(
        carsCollection,
        where("user_id", "==", userId),
        where("status", "==", "aceptado")
      );
      console.log("Id del usuario", userId);

      // Obtenemos los documentos de la coleccion filtrada
      const carsSnapshot = await getDocs(q);
      const rentedCarsData = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Cargar detalles del vehículo usando car_id (opcional)
      const carDetailsPromises = rentedCarsData.map(async (rental) => {
        const carRef = doc(db, "cars", rental.car_id);
        const carSnapshot = await getDoc(carRef);
        return {
          ...rental,
          car: carSnapshot.exists()
            ? { id: carSnapshot.id, ...carSnapshot.data() }
            : null,
        };
        
    });
    const carDetails = await Promise.all(carDetailsPromises);
    return carDetails;
    // return carDetailsPromises

}catch (error){
    console.error("Error al obtener los autos alquilados:", error);
    throw error;
}
};


// verificar si el auto ya está alquilado
export async function isCarAlreadyRented(carId) {
    const rentalQuery = query(
        collection(db, 'rental_requests'), 
        where('car_id', '==', carId), 
        where('rented', '==', true)
    );

  const rentalQuerySnapshot = await getDocs(rentalQuery);
  return !rentalQuerySnapshot.empty;

}

//cambia el estado de la solicitud de alquiler
export async function updateRentalStatus(reqId, newStatus){
  try {
    
    const requestRef = doc(db, 'rental_requests', reqId);
    // await updateDoc(requestRef, {status :newStatus });
    // console.log(`Se actualizo el status a ${newStatus}`)
    const updateData = {status: newStatus};

    // si el nuevo estado es aceptado, actualizamos tambien el campo rented
    if(newStatus === 'aceptado'){
      updateData.rented = true;
    }else{
      updateData.rented = false;
    }

    await updateDoc(requestRef, updateData);
    console.log(`Se actualizó el estado a ${newStatus} y rented a ${updateData.rented || false}`);

  } catch (error) {
    console.error("Error al actualizar el estado de la solicitud",  error)
    throw error
  };
}

// envia una solicitud de alquiler
export async function submitRentalRequest(rentalRequest) {
    try {
      const rentalStatus = {
        ...rentalRequest,
        status: 'pendiente',
        timestamp: new Date(),
      }

      await addDoc(collection(db, 'rental_requests'), rentalStatus);
      console.log('Solicitud de alquiler fue enviado')

      // envia la notificacion al propietario del vehiculo
      notifyOwner(rentalRequest.owner_id, rentalStatus)

    } catch (error) {
        console.error('Error al enviar la solicitud de alquiler:', error);
        throw error;
    }
}

export function notifyOwner(owner_id, rentalRequest){

// agregar la lógica de notificación, por ejemplo, enviando una alerta o mensaje
  console.log(`Notificación enviada al propietario con ID ${owner_id} sobre la solicitud de alquiler esta en: ${rentalRequest}`);
  addAlert("Se envio con exito!", "success");
  // agregar una llamada a la función `addAlert` o el sistema de noti que tenemos

}


// solicitudes de alquiler
// export async function fetchRentalRequests(userId) {
//   try {
//       const rentalRequestCollection = collection(db, 'rental_requests');
//       const rentalRequestSnapshot = await getDocs(rentalRequestCollection);

//       // Filtrar las solicitudes de alquiler por el owner_id proporcionado
//       return rentalRequestSnapshot.docs
//           .map(doc => ({ id: doc.id, ...doc.data() }))
//           .filter(request => request.owner_id === userId);
//   } catch (error) {
//       console.error("Error al obtener las solicitudes de alquiler:", error);
//       throw error; // Re-lanza el error para manejarlo en el componente si es necesario
//   }
// }




export async function fetchRentalRequests(userId){
  try {

    const rentalRequestCollection = collection(db, 'rental_requests');
    // const rentalRequestSnapshot = await getDocs(rentalRequestCollection);

    const q =  query(
      rentalRequestCollection,
      where("owner_id", "==", userId),
      where("status", "==", "pendiente")
    );

    // Obtener las solicitudes de alquiler filtradas por owner_id y status pendiente
    const rentalRequestSnapshot = await getDocs(q);
    const rentalRequests = rentalRequestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


    // const rentalRequests = rentalRequestSnapshot.docs
    //   .filter(request => request.owner_id === userId && request.status === 'pendiente');
      // .map(doc => ({ id: doc.id, ...doc.data() }))

    // console.log("Imagen del vehiculo:", this.pendingRequests[0].owner_id);

    // Obtenemos la informacion del usuario que alquila para obtener su foto de perfil

    const requestWithOwner = await Promise.all(
      rentalRequests.map( async request =>{
        const userRef = doc(db, 'users', request.user_id);
        const userSnap = await getDoc(userRef);

        // verificamos si existe el usuario en el documento
        if(userSnap.exists()){
          const userData = userSnap.data();
          console.log('datos del usuario que alquila', userData)
          return{
            ...request,
            photoURL: userData.photoURL || null,
            name: userData.name || null
          }
        }else{
          console.error(`el Usuario con Id ${request.user_id} no fue encontrado`)
          return request;
        }

      } )
    );

    return requestWithOwner;

    // const userPromises = this.pendingRequests.map( async request =>{
    //     const userRef = doc(db, 'users', request.owner_id);
    //     const userSnap = await getDoc(userRef)

    //     if(userSnap.exists()){
    //         const userData = userSnap.data();
    //         return{...request, photoURL: userData.photoURL}
    //     }else{
    //         console.warn(`Usuario con ID ${request.owner_id} no encontrado`);
    //         return request; // Devolver sin photoURL si no existe
    //     }

    // });
    // this.pendingRequests = await Promise.all(userPromises);

  } catch (error) {
    console.error("Error al obtener las solicitudes de alquiler:", error)
  }
}