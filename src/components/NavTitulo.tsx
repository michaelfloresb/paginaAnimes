import { NavLink } from "react-router-dom";
import styles from "./css/NavTitulo.module.css";

interface Props {
  mostrarTitulo?: boolean;
  pagina?: string;
}

const NavTitulo = ({ mostrarTitulo, pagina = "no" }: Props) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Obtener el mes actual
  const mesActual = new Date().getMonth(); // 0 = Enero, 11 = Diciembre
  const nombreMes = meses[mesActual];

  return (
    <NavLink to={"/todos"} className={styles.divTitulo}>
      {pagina === "animeDetalles" ? (
        <img src={`../Img/Logos/${nombreMes}.png`} alt={`Logo ${nombreMes}`} />
      ) : (
        <img src={`Img/Logos/${nombreMes}.png`} alt={`Logo ${nombreMes}`} />
      )}

      {/**
       * 
      {mostrarTitulo && <p className={styles.titulo}>Animes</p>}
       */}
    </NavLink>
  );
};

export { NavTitulo };
