import styles from "../components/css/NavSesion.module.css";
import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { NavLink } from "react-router-dom";

interface Props {
  barraExpandida: boolean;
}

const NavSesion = ({ barraExpandida }: Props) => {
  const [usuario, setusuario] = useState("");
  const [contraseña, setcontraseña] = useState("");
  const [error, setError] = useState("");
  const [isSesionVisible, setIsSesionVisible] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!usuario || !contraseña) {
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
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        if (contraseña === data.contraseña) {
          localStorage.setItem("usuario", JSON.stringify(data));
          setError("el Usuario ingreso Correctamente");
          window.location.reload();
        } else {
          setError("Contraseña incorrecta");
        }
      } else {
        setError("Usuario no encontrado");
        return;
      }
    } catch (error) {
      console.log("error al iniciar sesion", error);
      setError("hubo un error al intentar ingresar el usuario");
    }

    setcontraseña("");
    setusuario("");
  };

  const toggleSesion = () => {
    setIsSesionVisible(!isSesionVisible);
  };

  return (
    <div className={styles.content}>
      <button
        className={isSesionVisible ? styles.activo : styles.noActivo}
        onClick={toggleSesion}
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        {!barraExpandida && <p>Ingresar</p>}
      </button>

      {isSesionVisible && (
        <div
          className={
            barraExpandida ? styles.divSesion : styles.divSesionBarraExpandida
          }
        >
          <form onSubmit={handleSubmit} className={styles.formulario}>
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              value={usuario}
              id="usuario"
              onChange={(e) => setusuario(e.target.value)}
            />
            <label htmlFor="contraseña">Constraseña</label>
            <input
              type="password"
              value={contraseña}
              id="contraseña"
              onChange={(e) => setcontraseña(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}
            <input
              className={styles.btnIniciar}
              type="submit"
              value="Iniciar Sesion"
            />
          </form>
          <NavLink className={styles.btnRegistro} to="/registro">
            Registrarse
          </NavLink>
        </div>
      )}
    </div>
  );
};

export { NavSesion };
