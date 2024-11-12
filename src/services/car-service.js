import { collection, doc, getDoc, addDoc, serverTimestamp, query, where, getDocs, onSnapshot} from "firebase/firestore";
  import { db } from "./firebase.js";
  

  //Es la que estaba en CarDetails
  export async function getCarById(carId) {
    const carDoc = doc(db, "cars", carId);
    const carSnapshot = await getDoc(carDoc);
    if (carSnapshot.exists()) {
      return { id: carSnapshot.id, ...carSnapshot.data() };
    }
    throw new Error("Auto no encontrado.");
  }

  //Es la que estaba en CarDetails
  export async function checkIfCarIsRented(carId) {
    const rentalQuery = query(
      collection(db, "rental_requests"),
      where("car_id", "==", carId)
    );
    const querySnapshot = await getDocs(rentalQuery);
    return !querySnapshot.empty && querySnapshot.docs[0].data().rented;
  }

  //Es la que estaba en Profile
  export function getUserCars(userId, callback) {
    const carsCollection = collection(db, "cars");
    const userCarsQuery = query(carsCollection, where("user_id", "==", userId));

    const unsubscribe = onSnapshot(userCarsQuery, (snapshot) => {
      const cars = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(cars);
    }, (error) => {
      console.error("Error al obtener los autos:", error);
    });

    return unsubscribe;
  }

  // Es la que estaba en Püblications
export async function getAvailableCars(loggedUserId) {
  const carsCollection = collection(db, "cars");
  const rentedCollection = collection(db, "rental_requests");

  const carsSnapshot = await getDocs(carsCollection);
  const rentedSnapshot = await getDocs(rentedCollection);

  const rentedCars = rentedSnapshot.docs
    .filter((doc) => doc.data().rented === true)
    .map((doc) => doc.data().car_id);

  return carsSnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter(
      (car) =>
        car.user_id !== loggedUserId &&
        !rentedCars.includes(car.id) &&
        car.isAvailable === true
    );
}

  // Es la que estaba en Püblications

export async function addCar(newCar) {
  const carsCollection = collection(db, "cars");
  const docRef = await addDoc(carsCollection, {
    ...newCar,
    created_at: serverTimestamp(),
  });
  return { id: docRef.id, ...newCar };
}



  