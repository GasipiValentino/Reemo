import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserProfileById(id) {
  const userRef = doc(db, `users/${id}`);

  const userSnapshot = await getDoc(userRef);

  return {
    id: userSnapshot.id,
    email: userSnapshot.data().email,
    userName: userSnapshot.data().userName,
    name: userSnapshot.data().name,
    lastName: userSnapshot.data().lastName,
  };
}

export async function createUserProfile(id, { email }) {
  const userRef = doc(db, `users/${id}`);

  await setDoc(userRef, { email });
}

export async function editUserProfile(id, data) {
  const userRef = doc(db, `users/${id}`);

  await updateDoc(userRef, {
    ...data,
  });
}
