import styles from "./css/MoreInfoItem.module.css";

interface Props {
  title: string;
  text?: string;
  clasfificacion?: boolean;
}

const MoreInfoItem = ({ title, text, clasfificacion = false }: Props) => {
  if (!text) return null;

  let tema = "container";
  let descripcion = text;

  if (clasfificacion) {
    if (text.includes("G")) {
      tema = "todos";
      descripcion = "Todo público, sin restricciones.";
    }
    if (text.includes("PG")) {
      tema = "todos";
      descripcion =
        "Público infantil, pero puede requerir supervisión de padres.";
    }
    if (text.includes("PG-13")) {
      tema = "medio";
      descripcion =
        "Mayores de 13 años, puede contener violencia leve o temas más maduros.";
    }

    if (text.includes("R - 17+")) {
      tema = "mayores";
      descripcion =
        "Mayores de 17 años, violencia intensa, lenguaje fuerte o desnudos parciales";
    }
    if (text.includes("R+")) {
      tema = "mayores";
      descripcion =
        "Mayores de 17 años, contenido con desnudos ligeros o insinuaciones sexuales.";
    }
    if (text.includes("Rx")) {
      tema = "mayores";
      descripcion = "Solo adultos; contenido sexual explícito.";
    }
  }
  if (title === "Duración") {
    descripcion = descripcion.replace("per ep", "por episodio");
  }

  return (
    <>
      {text && (
        <p className={styles[clasfificacion ? tema : "container"]}>
          {`${title} : `}
          {descripcion}
        </p>
      )}
    </>
  );
};

export default MoreInfoItem;
