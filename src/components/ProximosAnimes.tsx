import React, { useState, useEffect, useRef } from "react";
import styles from "./css/ProximosAnimes.module.css";
import { Proximo } from "../interfaces/anime-interface";

interface Props {
  images: Proximo[];
}

const ProximosAnimes = ({ images }: Props) => {
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(0);

  const imageWidth = 123; // Width of each image including margin
  const totalImages = images.length * 2; // Two copies for seamless loop

  useEffect(() => {
    const scrollContinuously = () => {
      setTranslateX((current) => {
        const containerWidth = imageWidth * totalImages;

        // Reset position when reaching the end of the images
        if (Math.abs(current) >= containerWidth / 2) {
          return 0;
        }
        return current - 1; // Speed of scrolling
      });
    };

    animationRef.current = setInterval(scrollContinuously, 16); // Approximately 60 FPS

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [imageWidth, totalImages]);

  const displayImages = [
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
  ];

  return (
    <div className={styles.contenedor}>
      <div
        ref={containerRef}
        className={styles.imgContenedor}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {displayImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl.Url}
            alt={imageUrl.Nombre}
            className={styles.imagen}
          />
        ))}
      </div>
    </div>
  );
};

export { ProximosAnimes };
