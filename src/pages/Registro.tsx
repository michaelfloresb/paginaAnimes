import React, { useState } from "react";
import styles from "../components/css/Registro.module.css";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Registro = () => {
  const [nombre, setnombre] = useState("");
  const [usuario, setusuario] = useState("");
  const [contraseña, setcontraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!nombre || !usuario || !contraseña) {
      setError("por favor digite todos los campos");
      return;
    }

    try {
      const q = query(
        collection(db, "Usuarios"),
        where("usuario", "==", usuario)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError("El nombre de usuario ya esta registrado");
        return;
      }

      await addDoc(collection(db, "Usuarios"), {
        nombre: nombre,
        usuario: usuario,
        contraseña: contraseña,
        imgPerfil: "",
        animesVistos: [],
      });
    } catch (error) {
      console.log("error al registrar el usuario", error);
      setError("hubo un error al intentar  ingresar el usuario");
    }
    setnombre("");
    setusuario("");
    setcontraseña("");
    setError("usuario Registrado Correctamente");
  };
  return (
    <div className={styles.content}>
      <div className={styles.navbar}>
        <img src="../LOGO.PNG" alt="logo" />
        <Link to={"/todos"}>
          <h1 className={styles.divTitulo}>Animes</h1>
        </Link>
      </div>
      <div className={styles.registro}>
        <div>
          <h1>Registro</h1>

          <div className={styles.contentImg}>
            <img
              src="https://www.gifss.com/anime-manga/images/gif-anime-71.gif"
              alt="imagenRegistro"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label htmlFor="">Nombre</label>
          <input
            type="text"
            value={nombre}
            id="nombre"
            onChange={(e) => setnombre(e.target.value)}
          />
          <label htmlFor="">Usuario</label>
          <input
            type="text"
            value={usuario}
            id="usuario"
            onChange={(e) => setusuario(e.target.value)}
          />
          <label htmlFor="">Constraseña</label>
          <input
            type="password"
            value={contraseña}
            id="contraseña"
            onChange={(e) => setcontraseña(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <input type="submit" value="Registrarse" />
        </form>
      </div>
    </div>
  );
};

export { Registro };
