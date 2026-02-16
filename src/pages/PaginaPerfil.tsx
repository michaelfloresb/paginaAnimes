import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../components/css/PaginaPerfil.module.css";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../interfaces/user-Interface";

const PaginaPerfil = () => {
  const [usuario, setUsuario] = useState<User>();
  const [imagenPerfil, setImagenPerfil] = useState("");
  const [imagenSesion, setImagenSesion] = useState("");
  const [divSeleccionarPerfil, setDivSeleccionarPerfil] = useState(false);
  const [divSeleccionarSesion, setDivSeleccionarSesion] = useState(false);
  const [idPerfil, setIdPerfil] = useState(0);
  const [idSesion, setIdSesion] = useState(0);
  const cantidadPerfil = Array.from({ length: 13 }, (_, index) => index + 1);
  const cantidadSesion = Array.from({ length: 15 }, (_, index) => index + 1);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [background, SetBackground] = useState(false);

  // Nombre y Password
  const nombreUsuario = (event: ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const passwordUsuario = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const obtenerLocalStorage = () => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsuario(user);
      if (user.imgPerfil === "") {
        setImagenPerfil("/Img/Perfil/PERFIL.png");
      } else {
        setImagenPerfil(user.imgPerfil);
      }

      if (user.imgSesion === "") {
        setImagenSesion("/Img/Sesion/SESION.png");
      } else {
        setImagenSesion(user.imgSesion);
      }
      setNombre("");
    }
  };

  useEffect(() => {
    obtenerLocalStorage();
  }, []);
  useEffect(() => {}, [idPerfil]);
  useEffect(() => {}, [imagenPerfil, imagenSesion]);

  if (!usuario) {
    return <p>Cargando anime...</p>; // Manejo de carga mientras se obtiene el anime
  }
  //_______________PERFIL___________________________
  const mostrarSeleccionarPerfil = () => {
    setDivSeleccionarPerfil(true);
    SetBackground(true);
  };
  const seleccionarPerfil = (perfil: number) => {
    setIdPerfil(perfil);
  };
  const btnSeleccionarPerfil = () => {
    setImagenPerfil("/Img/Perfil/PERFIL (" + idPerfil + ").png");
    setDivSeleccionarPerfil(false);
    SetBackground(false);
  };
  const cerrarSeleccionarPerfil = () => {
    setDivSeleccionarPerfil(false);
    SetBackground(false);
  };

  //____________________SESION_________________________
  const mostrarSeleccionarSesion = () => {
    setDivSeleccionarSesion(true);
    SetBackground(true);
  };
  const seleccionarSesion = (sesion: number) => {
    setIdSesion(sesion);
  };
  const btnSeleccionarSesion = () => {
    setImagenSesion("/Img/Sesion/SESION (" + idSesion + ").png");
    setDivSeleccionarSesion(false);
    SetBackground(false);
  };
  const cerrarSeleccionarSesion = () => {
    setDivSeleccionarSesion(false);
    SetBackground(false);
  };

  const guardarCambios = async () => {
    let usuarioCopia: Partial<User> = usuario;
    usuarioCopia.imgPerfil = imagenPerfil;
    usuarioCopia.imgSesion = imagenSesion;

    if (nombre !== "") {
      usuarioCopia.nombre = nombre;
    }
    if (password !== "") {
      usuarioCopia.contraseña = password;
    }

    try {
      const q = query(
        collection(db, "Usuarios"),
        where("usuario", "==", usuario.usuario)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, usuarioCopia);
      }
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("usuario");
    localStorage.setItem("usuario", JSON.stringify(usuarioCopia));
    alert("Datos Actualizados Correctamente");
    setNombre("");
    setPassword("");
  };

  return (
    <div className={styles.principal}>
      {background && <div className={styles.background}></div>}
      <div className={styles.navbar}>
        <img src="../LOGO.PNG" alt="logo" />
        <Link to={"/todos"}>
          <h1 className={styles.divTitulo}>Animes</h1>
        </Link>
      </div>
      <div className={styles.contPrincipal}>
        <div className={styles.divImgPerfil}>
          <p>Imagen Perfil</p>
          <img src={imagenPerfil} alt="" />
          <button onClick={mostrarSeleccionarPerfil}>Cambiar</button>
        </div>
        <div className={styles.divImgSesion}>
          <p>Imagen Sesion</p>
          <img src={imagenSesion} alt="" />
          <button onClick={mostrarSeleccionarSesion}>Cambiar</button>
        </div>
        <div className={styles.divDatosCambios}>
          <div className={styles.divDatos}>
            <h1>Datos</h1>
            <hr />
            <label htmlFor="inputPagPerfilNombre">Nombre : </label>
            <input
              type="text"
              name="inputPagPerfilNombre"
              id="inputPagPerfilNombre"
              value={nombre}
              onChange={nombreUsuario}
              autoComplete="new-name"
            />
            <label htmlFor="inputPagPerfilPassword">Contraseña :</label>
            <input
              type="password"
              name="inputPagPerfilPassword"
              id="inputPagPerfilPassword"
              value={password}
              onChange={passwordUsuario}
              autoComplete="new-password"
            />
          </div>
          <button className={styles.btnGuardarCambios} onClick={guardarCambios}>
            Guardar Cambios
          </button>
        </div>

        {divSeleccionarPerfil && (
          <div className={styles.divImagenesPerfil}>
            <button
              className={styles.btnCerrarPerfil}
              onClick={cerrarSeleccionarPerfil}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
            <div className={styles.divPerfiles}>
              {cantidadPerfil.map((perfil) => (
                <div
                  onClick={() => seleccionarPerfil(perfil)}
                  key={perfil}
                  className={
                    idPerfil === perfil
                      ? styles.divPerfilSeleccionado
                      : styles.divPerfil
                  }
                >
                  <img
                    src={"/Img/Perfil/PERFIL (" + perfil + ").png"}
                    alt={"/Img/Perfil/PERFIL (" + perfil + ").png"}
                  ></img>
                </div>
              ))}
            </div>
            <button
              className={styles.btnSeleccionarPerfil}
              onClick={btnSeleccionarPerfil}
            >
              Seleccionar
            </button>
          </div>
        )}

        {divSeleccionarSesion && (
          <div className={styles.divImagenesSesion}>
            <button
              className={styles.btnCerrarPerfil}
              onClick={cerrarSeleccionarSesion}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
            <div className={styles.divSesiones}>
              {cantidadSesion.map((sesion) => (
                <div
                  onClick={() => seleccionarSesion(sesion)}
                  key={sesion}
                  className={
                    idSesion === sesion
                      ? styles.divSesionSeleccionado
                      : styles.divSesion
                  }
                >
                  <img
                    src={"/Img/Sesion/SESION (" + sesion + ").png"}
                    alt={"/Img/Sesion/SESION (" + sesion + ").png"}
                  ></img>
                </div>
              ))}
            </div>
            <button
              className={styles.btnSeleccionarSesion}
              onClick={btnSeleccionarSesion}
            >
              Seleccionar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { PaginaPerfil };
