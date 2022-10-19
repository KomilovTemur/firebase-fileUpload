import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCh1x9puHLETahFPQzmo2rltbXnBdYRi-Q",
  authDomain: "fir-react-storage-6b5bd.firebaseapp.com",
  projectId: "fir-react-storage-6b5bd",
  storageBucket: "fir-react-storage-6b5bd.appspot.com",
  messagingSenderId: "872413132955",
  appId: "1:872413132955:web:66ea5cc23a8a353ea3ae3e"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
