import { useState } from "react";
import styles from "./css/AnimeCard.module.css";
import { Link } from "react-router-dom";
import { MyAnimeDb } from "../interfaces/anime-interface";

interface Props {
  visto: boolean;
  anime: MyAnimeDb;
  style?: React.CSSProperties;
}

export function AnimeCard({ anime, visto, style }: Props) {
  const [hasError, setHasError] = useState(false);

  const imageUrl = anime.imagen;
  const displayImage = imageUrl && !hasError;
  const altText = anime?.title || anime.title || "Imagen de anime";

  return (
    <Link
      to={`/anime/${anime.id}-${visto}`}
      className={`${styles.link}`}
      style={style}
    >
      <div className={styles.imagenWrapper}>
        {displayImage && (
          <img
            src={imageUrl}
            alt={altText}
            className={styles.imagen}
            onError={(e) => {
              console.error("Error al cargar la imagen:", imageUrl, e);
              setHasError(true);
            }}
          />
        )}
      </div>
      <div className={styles.izquierda}>
        <span className={styles.title}>{anime.title}</span>
        <span className={styles.subTitle}>{anime.subTitle}</span>
      </div>
      <div className={styles.info}>
        <div className={styles.derecha}>
          <span className={styles.temporada}>
            {anime.temporada.includes("TEMP")
              ? anime.temporada.replace("TEMP", "Temporada")
              : anime.temporada}
          </span>
          <span className={styles.numeracion}>id: {anime.id}</span>
          <div
            className={visto ? styles.barraVisto : styles.barraNoVisto}
          ></div>
        </div>
      </div>
    </Link>
  );
}
