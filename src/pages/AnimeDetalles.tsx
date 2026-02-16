import styles from "../components/css/AnimeDetalles.module.css";
import { OpeningDetalles } from "../components/OpeningDetalles";
import { CopiarEnlace } from "../components/CopiarEnlace";
import { TituloAnime } from "../components/TituloAnime";
import { AnimeInfo } from "../components/AnimeInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AnimeCategorias } from "../components/AnimeCategorias";
import {
  Anime,
  CharacterData,
  MyAnimeDb,
  PictureAnimeType,
} from "../interfaces/anime-interface";
import { User } from "../interfaces/user-Interface";
import { NavTitulo } from "../components/NavTitulo";
import MoreInfoCard from "../components/MoreInfoCard";

interface Props {
  datos: MyAnimeDb[];
}

const AnimeDetalles = ({ datos }: Props) => {
  const { id } = useParams();
  const [anime, setAnime] = useState<MyAnimeDb>();
  const [usuario, setUsuario] = useState<User>();
  const [isSesionIniciada, setIsSesionIniciada] = useState(false);
  const [visto, setVisto] = useState(false);
  const [animeMal, setAnimeMal] = useState<Anime>();
  const [characters, setCharacters] = useState<CharacterData[]>();
  const [pictures, setPicures] = useState<PictureAnimeType[]>([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const para = id.split("-");
      if (para[1] === "true") {
        setVisto(true);
      } else {
        setVisto(false);
      }
    }
  }, [id]);

  useEffect(() => {
    datos.forEach((dato) => {
      let url: string[] = [];

      if (id) {
        url = id.split("-");
      }

      if (Number(dato.id) === Number(url[0])) {
        setAnime(dato);
        obtenerCharacter(dato);
      }
    });
  }, [id, datos]);

  const obtenerCharacter = async (anime: MyAnimeDb) => {
    if (anime?.mal_id) {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${anime.mal_id}/full`,
        );
        const data = await response.json();
        setAnimeMal(data.data);

        try {
          const response = await fetch(
            `https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`,
          );
          const data = await response.json();

          let characterData = data.data as CharacterData[];
          setCharacters(characterData);
        } catch (error) {
          console.log(error);
        }

        try {
          const response = await fetch(
            `https://api.jikan.moe/v4/anime/${anime.mal_id}/pictures`,
          );
          const data = await response.json();
          if (data.data) {
            console.log("existen pictures");
            setPicures(data.data);
          } else {
            console.log("no existen pictures");
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setImagenSeleccionada(anime?.imagen!);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const obtenerLocalStorage = () => {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsuario(user);
        setIsSesionIniciada(true);
      }
    };
    obtenerLocalStorage();
  }, []);
  // Función para manejar el cambio de estado de 'visto'
  const handleCheckboxChange = async () => {
    if (!usuario || !anime) return;

    try {
      const q = query(
        collection(db, "Usuarios"),
        where("usuario", "==", usuario.usuario),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const data = querySnapshot.docs[0].data();
        const animesVistos = data.animesVistos || [];

        if (visto) {
          const index = animesVistos.indexOf(anime.id);
          if (index > -1) {
            animesVistos.splice(index, 1);
          }
        } else {
          if (!animesVistos.includes(anime.id)) {
            animesVistos.push(anime.id);
          }
        }

        await updateDoc(docRef, { animesVistos });

        const ActualizarUsuario = {
          nombre: usuario.nombre,
          usuario: usuario.usuario,
          animesVistos: animesVistos,
          contraseña: usuario.contraseña,
          imgPerfil: usuario.imgPerfil,
          imgSesion: usuario.imgSesion,
        };
        localStorage.removeItem("usuario");

        localStorage.setItem("usuario", JSON.stringify(ActualizarUsuario));

        setVisto(!visto); // Invertir el estado de 'visto'
      }
    } catch (error) {
      console.error("Error al actualizar el estado 'visto':", error);
    }
  };

  const mostrarImagenAleatoria = () => {
    if (pictures) {
      const indiceAleatorio = Math.floor(Math.random() * pictures.length);
      const imagenSeleccionada = pictures[indiceAleatorio];
      const urlDeImagen = imagenSeleccionada.jpg.large_image_url;
      return urlDeImagen;
    } else {
      setImagenSeleccionada(anime?.imagen!);
      return anime?.imagen!;
    }
  };

  if (isLoading) {
    return <p>Cargando anime...</p>; // Manejo de carga mientras se obtiene el anime
  }

  return (
    <div className={styles.divPrincipal}>
      <div className={styles.izquierda}>
        <div className={styles.ContTitulo}>
          <NavTitulo pagina={"animeDetalles"} />
        </div>
        <div className={styles.divTitulos}>
          {animeMal?.title ? (
            <TituloAnime titulo={animeMal?.title} tipo="nombre" />
          ) : (
            <TituloAnime titulo={anime?.title!} tipo="nombre" />
          )}
          {animeMal?.title_japanese && (
            <TituloAnime titulo={animeMal?.title_japanese} tipo="temp" />
          )}
          {animeMal?.title_english && (
            <TituloAnime titulo={animeMal?.title_english} tipo="temp" />
          )}
        </div>

        <img
          className={styles.imagenAnime}
          src={
            pictures.length > 0
              ? imagenSeleccionada !== ""
                ? imagenSeleccionada
                : mostrarImagenAleatoria()
              : anime?.imagen
          }
          alt={animeMal?.images.jpg.image_url}
        />
        <div className={styles.idTemp}>
          <TituloAnime
            titulo={
              anime?.temporada.includes("TEMP")
                ? "TEMPORADA " + anime.temporada.split(" ")[1]
                : anime?.temporada!
            }
            tipo="temp"
          />
          <TituloAnime titulo={"ID: " + anime?.id!} tipo="id" />
        </div>
        {anime?.mal_id && (
          <div className={styles.animeCategorias}>
            <AnimeCategorias categorias={animeMal?.genres!} />
          </div>
        )}
        {isSesionIniciada && (
          <div className={styles.check} id="checkDiv">
            <input
              className={styles.divCheck}
              type="checkbox"
              id="check"
              checked={visto}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check" className={styles.labelCheck}>
              Toggle
            </label>
          </div>
        )}
      </div>

      <div className={styles.derecha}>
        <div className={styles.divCharacters}>
          {characters?.map((item, index) => (
            <div className={styles.characterCard} key={index}>
              <img
                className={styles.characterImg}
                src={item.character.images.jpg.image_url}
                alt={item.character.images.jpg.image_url}
              />
              <span className={styles.characterText}>
                {item.character.name}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.openingAndInfo}>
          <OpeningDetalles ruta={anime?.opening!} />
          {animeMal && <MoreInfoCard animeMal={animeMal} />}
          {isSesionIniciada && (
            <div className={styles.info}>
              {anime?.comentarios && (
                <h2 className={styles.comentarios}>{anime.comentarios}</h2>
              )}
              <AnimeInfo titulo="Descarga : " />
              <CopiarEnlace descarga={anime?.descarga!} />

              <AnimeInfo titulo="Contraseña :" />
              <CopiarEnlace descarga={anime?.password ? anime.password : ""} />
            </div>
          )}
        </div>
        <div className={styles.separador}></div>
        <div className={styles.pictures}>
          {pictures?.map((item, index) => (
            <div
              key={index}
              onClick={() => setImagenSeleccionada(item.jpg.large_image_url)}
            >
              <img src={item.jpg.image_url} alt={item.jpg.image_url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { AnimeDetalles };
