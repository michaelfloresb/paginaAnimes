import styles from "./css/MenuItem.module.css";

interface Props {
  barraExpandida: boolean;
  texto: string;
  icono: keyof typeof iconos;
  activo?: boolean;
  onClick?: () => void;
}

const iconos = {
  Todo: "fa-list-ul",
  Visto: "fa-eye",
  NoVisto: "fa-eye-slash",
  Nuevos: "fa-calendar",
  Antiguos: "fa-hourglass-start",
  Musica: "fa-music",
};

const MenuItem = ({
  barraExpandida,
  texto,
  icono,
  activo = false,
  onClick,
}: Props) => {
  return (
    <button className={styles.contenedor} onClick={onClick}>
      <div className={styles.contenedorIcono}>
        <i
          className={`${iconos[icono]} fa-solid ${
            activo ? styles.iconoActivo : styles.icono
          }`}
        ></i>
      </div>
      {!barraExpandida && (
        <span className={activo ? styles.textoActivo : styles.texto}>
          {texto}
        </span>
      )}
    </button>
  );
};

export { MenuItem };
