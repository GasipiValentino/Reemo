import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export function saveComment({ car_id, user_id, user_email, user_Name, text }) {
  // const commentRef = collection(db, "comments");
  const commentRef = collection(db, "cars", car_id, "comments"); 


  addDoc(commentRef, {
    car_id,
    user_id,
    user_email,
    user_Name,
    text,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToComment(carId, callback) {
  // const commentRef = collection(db, "comments");
  // const q = query(commentRef, where("car_id", "==", carId));

  const commentRef = collection(db, "cars", carId, "comments"); 
  const q = query(commentRef); 

  onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });
}


