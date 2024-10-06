import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import {db} from './firebase'

export function saveCars({ user_id, email, marca, modelo, año, chasis, motor, combustible, kilometraje, patente, transmision, puertas, asientos, description }){
    const carsRef = collection(db, 'cars');
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
        created_at: serverTimestamp(),
    });
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
            }
        });
        // Invocamos el callback que nos pasaron como parámetro y le mandamos los mensajes.
        callback(messages);
    });

}