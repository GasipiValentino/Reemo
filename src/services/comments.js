import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export function saveComment({ car_id, user_id, user_email, user_name, user_photo, text }) {
  const commentRef = collection(db, "cars", car_id, "comments"); 

  try{
    addDoc(commentRef, {
      car_id,
      user_id,
      user_email,
      user_name,
      text,
      user_photo,
      createdAt: serverTimestamp(),
    });
  }catch(error){
    console.error("Error al guardar el comentario:", error)
  }
  
  
}

export function subscribeToComment(carId, callback) {

  const commentRef = collection(db, "cars", carId, "comments"); 
  const q = query(commentRef); 

  onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Comentarios con createdAt:", comments);
    callback(comments);
  });
}


