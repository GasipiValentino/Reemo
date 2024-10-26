import { collection,getDocs, query, where, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../services/firebase.js";

export async function fetchRentedCars(userId) {
    try {
      // Crea la consulta a firebase
      const carsCollection = collection(db, "rental_requests");
      const q = query(
        carsCollection,
        where("user_id", "==", userId)
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

// envia una solicitud de alquiler
export async function submitRentalRequest(rentalRequest) {
    try {
        await addDoc(collection(db, 'rental_requests'), rentalRequest);
        console.log('Solicitud de alquiler fue enviado')
    } catch (error) {
        console.error('Error al enviar la solicitud de alquiler:', error);
        throw error;
    }
}