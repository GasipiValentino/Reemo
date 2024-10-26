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
  const commentRef = collection(db, "comments");

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
  const commentRef = collection(db, "comments");
  const q = query(commentRef, where("car_id", "==", carId));

  onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });
}
