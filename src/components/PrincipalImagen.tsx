import styles from "./css/PrincipalImagen.module.css";

interface Props {
  imagen: string;
}

const PrincipalImagen = ({ imagen }: Props) => {
  let ruta = "";
  if (imagen === null) {
    ruta += "Img/Perfil/PERFIL.PNG";
  } else {
    if (imagen !== "") {
      ruta += imagen;
    } else {
      ruta += "Img/Perfil/PERFIL.PNG";
    }
  }

  return (
    <div className={styles.principalImagen}>
      <img className={styles.imagen} src={ruta} alt={ruta} />
    </div>
  );
};

export default PrincipalImagen;
