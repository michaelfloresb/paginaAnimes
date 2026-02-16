import React from "react";
import styles from "./css/OpeningDetalles.module.css";

interface Props {
  ruta: string;
}

const OpeningDetalles = ({ ruta }: Props) => {
  // Extraer la ID del video de la URL de YouTube
  const videoId = obtenerVideoId(ruta);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <iframe
      src={videoUrl}
      className={styles.video}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="YouTube video"
    ></iframe>
  );
};

export default OpeningDetalles;

// Función para extraer la ID del video de la URL de YouTube
function obtenerVideoId(urlString: string) {
  try {
    const parsedUrl = new URL(urlString);

    if (
      (parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtube.com") &&
      parsedUrl.pathname === "/watch"
    ) {
      // URL normal de YouTube (formato largo)
      const searchParams = new URLSearchParams(parsedUrl.search);
      return searchParams.get("v");
    } else if (parsedUrl.hostname === "youtu.be") {
      // URL corta de YouTube (formato corto)
      return parsedUrl.pathname.substr(1);
    } else if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname.includes("/embed/")
    ) {
      // URL de YouTube con formato de inserción (embed)
      const pathSegments = parsedUrl.pathname.split("/");
      return pathSegments[pathSegments.length - 1];
    } else {
      console.error("La URL no es válida:", urlString);
      return null;
    }
  } catch (error) {
    console.error("Error al analizar la URL:", urlString, error);
    return null;
  }
}

export { OpeningDetalles };
