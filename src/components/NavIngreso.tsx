import styles from "./css/NavIngreso.module.css";
import { NavPerfil } from "./NavPerfil";
import { NavSesion } from "./NavSesion";
import { User } from "../interfaces/user-Interface";
import { useEffect, useState } from "react";

interface Props {
  sesion: boolean;
  existeUsuario: Boolean;
  barraExpandida: boolean;
}

const NavIngreso = ({ sesion, existeUsuario, barraExpandida }: Props) => {
  const [usuario, setUsuario] = useState<User>();

  useEffect(() => {
    if (existeUsuario) {
      setUsuario(JSON.parse(localStorage.getItem("usuario")!));
    }
  }, [existeUsuario]);

  return (
    <div className={styles.navIngreso}>
      {sesion && usuario ? (
        <NavPerfil usuario={usuario} barraExpandida={barraExpandida} />
      ) : (
        <NavSesion barraExpandida={barraExpandida} />
      )}
    </div>
  );
};

export { NavIngreso };
