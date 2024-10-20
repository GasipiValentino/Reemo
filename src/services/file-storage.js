import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadFile(path, file) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
}

export async function getFileURL(path) {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
}