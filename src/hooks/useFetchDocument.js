import { db } from "../firebase/config";
import {
  doc, //existencia de um documento
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

//resgate de dados
export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        setDocument(docSnap.data())

        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(error.message)
        
        setLoading(true)
      }


    }
    loadDocument();
  }, [docCollection, id, cancelled]);

  //limpeza de memoria
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };

};
