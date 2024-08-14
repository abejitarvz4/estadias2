// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqT3wjvLBrRwxWs-jkMoq6Qvb2AUoV3SI",
  authDomain: "inventarioez.firebaseapp.com",
  projectId: "inventarioez",
  storageBucket: "inventarioez.appspot.com",
  messagingSenderId: "715527922450",
  appId: "1:715527922450:web:6a10cdda1ac308e14049cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const crearProducto = async (db, nombre, cantidad, precio) => {
  await addDoc(collection(db, "productos"), {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio
  });
};

export const obtenerProductos = async (db) => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  const productosArray = [];
  querySnapshot.forEach((doc) => {
    productosArray.push({ ...doc.data(), id: doc.id });
  });
  return productosArray;
};

export const actualizarProducto = async (db, id, nombre, cantidad, precio) => {
  const productRef = doc(db, "productos", id);
  await updateDoc(productRef, {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio
  });
};

export const eliminarProducto = async (db, id) => {
  await deleteDoc(doc(db, "productos", id));
};
