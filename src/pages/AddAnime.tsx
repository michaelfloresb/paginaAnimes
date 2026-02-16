//id	title	subTitle	temporada	mal_id	imagen	opening	descarga	password	comentarios

import { useEffect, useState } from "react";
import OpeningDetalles from "../components/OpeningDetalles";
import styles from "../components/css/AddAnime.module.css";
import { AnimeInfo } from "../components/AnimeInfo";
import { CopiarEnlace } from "../components/CopiarEnlace";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddAnime = () => {
  const [imagenUrl, setImagenUrl] = useState("");
  const [openingUrl, setOpeningUrl] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [temporada, setTemporada] = useState("");
  const [mal_id, setMal_id] = useState("");
  const [imagen, setImagen] = useState("");
  const [opening, setOpening] = useState("");
  const [descarga, setDescarga] = useState("");
  const [password, setPassword] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [todo, setTdodo] = useState("");

  useEffect(() => {
    console.log("Cambio la imagen");
    setImagenUrl(imagen);
  }, [imagen]);

  useEffect(() => {
    console.log("Cambio el opening");
    setOpeningUrl(opening);
  }, [opening]);

  const crearAnime = async () => {
    if (
      !id ||
      !title ||
      !temporada ||
      !mal_id ||
      !imagen ||
      !opening ||
      !descarga
    ) {
      alert("Faltan datos");
      return;
    }

    try {
      await addDoc(collection(db, "Animes"), {
        id: parseInt(id),
        title: title,
        subTitle: subTitle,
        temporada: temporada,
        mal_id: parseInt(mal_id),
        imagen: imagenUrl,
        opening: openingUrl,
        descarga: descarga,
        password: password,
        comentarios: comentarios,
      });
    } catch (error) {
      console.log("error al registrar el usuario", error);
      alert("error al registrar el anime");
      return;
    }
    alert("Anime Registrado Correctamente");
    setId("");
    setTitle("");
    setSubTitle("");
    setTemporada("");
    setMal_id("");
    setImagen("");
    setOpening("");
    setDescarga("");
    setPassword("");
    setComentarios("");
    setImagenUrl("");
    setOpeningUrl("");
  };

  useEffect(() => {
    if (todo !== "") {
      const todoVector = todo.split("|");
      console.log(todoVector);
      setId(todoVector[0].split("*")[1]);
      setTitle(todoVector[1].split("*")[1]);
      setSubTitle(todoVector[2].split("*")[1]);
      setTemporada(todoVector[3].split("*")[1]);
      setMal_id(todoVector[4].split("*")[1]);
      setImagen(todoVector[5].split("*")[1]);
      setOpening(todoVector[6].split("*")[1]);
      setDescarga(todoVector[7].split("*")[1]);
      setPassword(todoVector[8].split("*")[1]);
      setComentarios(todoVector[9].split("*")[1]);
    }
  }, [todo]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Agregar Anime</h1>
        <div className={styles.inputContent}>
          <label htmlFor="todo">Todos:</label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={todo}
            onChange={(e) => setTdodo(e.target.value)}
          />
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="subTitle">SubTitle:</label>
          <input
            type="text"
            id="subTitle"
            name="SubTitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
          <label htmlFor="temporada">Temporada:</label>
          <input
            type="text"
            id="temporada"
            name="temporada"
            required
            value={temporada}
            onChange={(e) => setTemporada(e.target.value)}
          />
          <label htmlFor="mal_id">Mal_id:</label>
          <input
            type="text"
            id="mal_id"
            name="mal_id"
            required
            value={mal_id}
            onChange={(e) => setMal_id(e.target.value)}
          />
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            required
            value={imagenUrl}
            onChange={(e) => setImagen(e.target.value)}
          />
          <label htmlFor="opening">Opening:</label>
          <input
            type="text"
            id="opening"
            name="opening"
            required
            value={opening}
            onChange={(e) => setOpening(e.target.value)}
          />
          <label htmlFor="descarga">Descarga:</label>
          <input
            type="text"
            id="descarga"
            name="descarga"
            required
            value={descarga}
            onChange={(e) => setDescarga(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="comentarios">Comentarios:</label>
          <input
            type="text"
            id="comentarios"
            name="comentarios"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />{" "}
        </div>

        <button className={styles.button} onClick={() => crearAnime()}>
          Agregar
        </button>
      </div>

      <div className={styles.link}>
        <div className={styles.imagenWrapper}>
          <img src={imagenUrl} alt={imagenUrl} className={styles.imagen} />
        </div>
        <div className={styles.izquierda}>
          <span className={styles.title}>{title}</span>
          <span className={styles.subTitle}>{subTitle}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.derecha}>
            <span className={styles.temporada}>
              {temporada.includes("TEMP")
                ? "TEMPORADA " + temporada.split(" ")[1]
                : temporada}
            </span>
            <span className={styles.numeracion}>id: {id}</span>
            <div className={styles.barraVisto}></div>
          </div>
        </div>
      </div>

      <div className={styles.opAndInfo}>
        <div className={styles.infoDownload}>
          {comentarios && <h2 className={styles.comentarios}>{comentarios}</h2>}
          <AnimeInfo titulo="Descarga : " />
          <CopiarEnlace descarga={descarga} />

          <AnimeInfo titulo="Contraseña :" />
          <CopiarEnlace descarga={password ? password : ""} />
        </div>
        {openingUrl !== "" && <OpeningDetalles ruta={openingUrl} />}
      </div>
    </div>
  );
};

export default AddAnime;
