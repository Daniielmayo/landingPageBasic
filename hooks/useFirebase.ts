import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAahAGdcNXFmo1kLA6cEm4sWp1sr1XX4Sg",
  authDomain: "virginia4life-343a3.firebaseapp.com",
  projectId: "virginia4life-343a3",
  storageBucket: "virginia4life-343a3.appspot.com",
  messagingSenderId: "189136178914",
  appId: "1:189136178914:web:410e32aab3dcdaee3958bb",
  measurementId: "G-MWDKCDF2H4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: File, idUrlProduct: string) {
  const storageRef = ref(storage, `products/${idUrlProduct}/product`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
}
