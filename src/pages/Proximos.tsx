import { Proximo } from "../interfaces/anime-interface";
import styles from "../components/css/Proximos.module.css";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { obtenerProximos } from "../Funciones/FirebaseFunciones";

const Proximos = () => {
  const [proximos, setProximos] = useState<Proximo[]>([]);
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProx = async () => {
      try {
        const prox = (await obtenerProximos()) as Proximo[];
        if (prox) {
          setProximos(prox as Proximo[]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    obtenerProx();
  }, []);

  const eliminarProximo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Proximos", id));
      console.log(`Documento con ID ${id} eliminado correctamente`);
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
      alert("Error al eliminar el proximo");
      return;
    }
    alert("Proximo eliminado correctamente");
    const prox = (await obtenerProximos()) as Proximo[];
    if (prox) {
      setProximos(prox as Proximo[]);
    }
  };

  const agregarProximo = async () => {
    if (!nombre || !url) {
      alert("Faltan Datos");
      return;
    }
    try {
      await addDoc(collection(db, "Proximos"), {
        Nombre: nombre,
        Url: url,
      });
    } catch (error) {
      alert("Error al agregar el proximo");
      console.error("Error al agregar el proximo: ", error);
      return;
    }
    alert("Proximo agregado correctamente");
    setNombre("");
    setUrl("");
    const prox = (await obtenerProximos()) as Proximo[];
    if (prox) {
      setProximos(prox as Proximo[]);
    }
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.addProximo}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagen Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className={styles.boton} onClick={() => agregarProximo()}>
          Agregar
        </button>
      </div>
      <div className={styles.proximos}>
        {proximos.map((proximo) => (
          <div key={proximo.id} className={styles.proximo}>
            <img src={proximo.Url} alt={proximo.Nombre} />
            <span>{proximo.Nombre}</span>
            <button
              className={styles.boton}
              onClick={() => eliminarProximo(proximo.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proximos;
