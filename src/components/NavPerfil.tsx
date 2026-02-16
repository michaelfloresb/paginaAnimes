import { useEffect, useState } from "react";
import styles from "../components/css/NavPerfil.module.css";
import { NavLink } from "react-router-dom";
import { User } from "../interfaces/user-Interface";

interface Props {
  usuario: User;
  barraExpandida: boolean;
}
const NavPerfil = ({ usuario, barraExpandida }: Props) => {
  const [isPerfilVisible, setIsPerfilVisible] = useState(false);
  const [rutaImg, setRutaImg] = useState("");

  useEffect(() => {
    if (usuario.imgSesion === "") {
      setRutaImg("Img/Sesion/SESION.png");
    } else {
      setRutaImg(usuario.imgSesion);
    }
  }, [usuario.imgSesion]); // Agrega una dependencia para que se ejecute solo cuando imgPerfil cambie

  const togglePerfil = () => {
    setIsPerfilVisible(!isPerfilVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.reload();
  };

  return (
    <div className={styles.content} onClick={togglePerfil}>
      <img className={styles.contentImg} src={rutaImg} alt="navPerfil" />
      {!barraExpandida && (
        <p className={isPerfilVisible ? styles.activo : styles.noActivo}>
          {usuario.usuario}
        </p>
      )}

      {isPerfilVisible && (
        <div
          className={
            barraExpandida
              ? styles.perfilContent
              : styles.perfilContentBarraExpandida
          }
        >
          <p>{usuario.nombre}</p>
          <img
            className={styles.perfilContentImg}
            src={rutaImg}
            alt="ImagenSesion"
          />

          <NavLink className={styles.perfil} to="/perfil">
            Perfil
          </NavLink>
          <button onClick={handleLogout} className={styles.cerrar}>
            Cerrar Sesion
          </button>
        </div>
      )}
    </div>
  );
};
export { NavPerfil };
