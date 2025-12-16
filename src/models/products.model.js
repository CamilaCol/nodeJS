import { db } from "../config/firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc
} from "firebase/firestore";

const NOMBRE_COLECCION = "productos";

export async function obtenerProductosModelo() {
  const referencia = collection(db, NOMBRE_COLECCION);
  const resultado = await getDocs(referencia);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
}

export async function obtenerProductoPorIdModelo(id) {
  const referencia = doc(db, NOMBRE_COLECCION, id);
  const snapshot = await getDoc(referencia);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
}

export async function crearProductoModelo(datosProducto) {
  const referencia = collection(db, NOMBRE_COLECCION);
  const docCreado = await addDoc(referencia, datosProducto);

  return { id: docCreado.id, ...datosProducto };
}

export async function actualizarProductoModelo(id, datosActualizar) {
  const referencia = doc(db, NOMBRE_COLECCION, id);

  //merge true para no pisar campos si no se envían
  await setDoc(referencia, datosActualizar, { merge: true });

  return await obtenerProductoPorIdModelo(id);
}

export async function eliminarProductoModelo(id) {
  const referencia = doc(db, NOMBRE_COLECCION, id);
  await deleteDoc(referencia);
}
