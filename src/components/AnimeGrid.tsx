import { AnimeCard } from "./AnimeCard";
import styles from "./css/AnimeGrid.module.css";
import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
} from "react";
import { NavEnlaces } from "./NavEnlaces";
import { NavTitulo } from "./NavTitulo";
import { NavIngreso } from "./NavIngreso";
import { ProximosAnimes } from "./ProximosAnimes";
import { MyAnimeDb, Proximo } from "../interfaces/anime-interface";
import { User } from "../interfaces/user-Interface";
import { MenuItem } from "./MenuItem";
import PrincipalImagen from "./PrincipalImagen";

interface Props {
  mostrar: string;
  datos: MyAnimeDb[];
  proximos: Proximo[]; // Asegúrate de que el tipo sea Proximo[] aquí
}

const animesPorPagina: number = 18;

export function AnimesGrid({ mostrar, datos, proximos }: Props) {
  const [usuario, setUsuario] = useState<User>();
  const [sesion, setSesion] = useState(false);
  const [animesVistos, setAnimesVistos] = useState<number[]>([]);
  const [animesMostrar, setAnimesMostrar] = useState<MyAnimeDb[]>([]);
  const [orden, setOrden] = useState<string>("Nuevos");
  const [busquedaAnime, setBusquedaAnime] = useState("");
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [expandirBarraLateral, setExpandirBarraLateral] = useState(true);

  // Nuevo estado para la carga secuencial de AnimeCards
  const [numCardsRendered, setNumCardsRendered] = useState(0);

  // ¡NUEVA REFERENCIA PARA EL DIV PRINCIPAL!
  const divPrincipalRef = useRef<HTMLDivElement>(null);

  // Manejo de paginación
  const indexOfLastAnime = paginaActual * animesPorPagina;
  const indexOfFirstAnime = indexOfLastAnime - animesPorPagina;
  const animesActual = animesMostrar.slice(indexOfFirstAnime, indexOfLastAnime);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsuario(user);
      setSesion(true);
      setAnimesVistos(user.animesVistos);
    }
  }, []);

  // Obtener animes vistos y animes a mostrar
  useEffect(() => {
    if (usuario) {
      setAnimesVistos(usuario.animesVistos);
    }
    const animesFiltrados = datos.filter((anime) => {
      const animeIdNumber = Number(anime.id);
      const estaEnVistos = (animesVistos as number[]).some(
        (vistoId) => vistoId === animeIdNumber
      );

      if (mostrar === "vistos") {
        return estaEnVistos;
      } else if (mostrar === "noVisto") {
        return !estaEnVistos;
      } else {
        return true;
      }
    });

    setOrden("Nuevos");
    setAnimesMostrar(animesFiltrados);
    setPaginaActual(1); // Resetear a la primera página al cambiar el filtro/mostrar
    setNumCardsRendered(0); // Reiniciar el contador de tarjetas renderizadas
  }, [mostrar, usuario, datos, animesVistos]);

  // Efecto para la carga secuencial de AnimeCards
  useEffect(() => {
    // Si ya se cargaron todas las tarjetas de la página actual, no hagas nada
    if (numCardsRendered >= animesActual.length) {
      return;
    }

    // Si la lista de animesActual cambia (ej. por paginación, búsqueda, filtro)
    // y numCardsRendered es 0 (o menor que la longitud actual),
    // inicia la carga secuencial.
    if (numCardsRendered < animesActual.length) {
      const timer = setTimeout(() => {
        setNumCardsRendered((prev) => prev + 1);
      }, 100); // Pequeño retraso entre la aparición de cada tarjeta (ajusta a tu gusto)

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta o las dependencias cambian
    }
  }, [numCardsRendered, animesActual.length, animesActual]); // Dependencias: el estado y la longitud de animesActual

  // Restablecer numCardsRendered cuando cambie la página actual
  useEffect(() => {
    setNumCardsRendered(0);
    // Añadir un pequeño retraso antes de hacer scroll
    const timer = setTimeout(() => {
      if (divPrincipalRef.current) {
        // Si la referencia existe
        divPrincipalRef.current.scrollTo({
          // Usamos scrollTo en el elemento referenciado
          top: 0,
          behavior: "smooth",
        });
        console.log(
          "Scroll ejecutado en .divPrincipal para la página:",
          paginaActual
        );
      } else {
        console.warn(
          "divPrincipalRef.current no está disponible para hacer scroll."
        );
      }
    }, 50); // Un pequeño retraso de 50ms

    return () => clearTimeout(timer); // Limpia el timer
  }, [paginaActual]);

  // Ordenar animes
  const ordenar = useCallback(
    (orden: string) => {
      setOrden(orden);
      const factor = orden === "Nuevos" ? -1 : 1;
      setAnimesMostrar((prevAnimes) =>
        [...prevAnimes].sort(
          (a, b) => factor * (parseInt(a.id) - parseInt(b.id))
        )
      );
      setPaginaActual(1); // Resetear a la primera página al ordenar
      setNumCardsRendered(0); // Reiniciar el contador de tarjetas renderizadas
    },
    [setOrden, setAnimesMostrar]
  );

  // Buscar anime
  const buscarAnime = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBusquedaAnime(event.target.value.toUpperCase());
    },
    [setBusquedaAnime]
  );

  useEffect(() => {
    const animeEncontrado = () => {
      const animesFiltrados = datos.filter((anime) => {
        if (mostrar === "vistos") {
          return (animesVistos as number[]).some(
            (vistoId) => Number(vistoId) === Number(anime.id)
          );
        } else if (mostrar === "noVisto") {
          return !(animesVistos as number[]).some(
            (vistoId) => Number(vistoId) === Number(anime.id)
          );
        } else {
          return true;
        }
      });
      setAnimesMostrar(
        animesFiltrados.filter((anime) =>
          anime.title.toUpperCase().includes(busquedaAnime)
        )
      );
      setPaginaActual(1); // Resetear a la primera página cuando se busque
      setNumCardsRendered(0); // Reiniciar el contador de tarjetas renderizadas
    };

    animeEncontrado();
  }, [busquedaAnime, datos, mostrar, animesVistos]);

  const totalPaginas = Math.ceil(animesMostrar.length / animesPorPagina);

  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina);
  };

  const renderPaginas = () => {
    let paginas = [];
    let start = Math.max(1, paginaActual - 2);
    let end = Math.min(totalPaginas, paginaActual + 2);

    if (paginaActual - 2 < 1) {
      end = Math.min(5, totalPaginas);
    }

    if (paginaActual + 2 > totalPaginas) {
      start = Math.max(1, totalPaginas - 4);
    }

    for (let i = start; i <= end; i++) {
      paginas.push(
        <button
          key={i}
          onClick={() => cambiarPagina(i)}
          className={
            paginaActual === i ? styles.paginaActual : styles.paginaNoActual
          }
        >
          {i}
        </button>
      );
    }
    return paginas;
  };

  const CambioExpandirBarraLateral = () => {
    setExpandirBarraLateral(!expandirBarraLateral);
  };

  return (
    <div className={styles.contenedor}>
      <div
        className={
          expandirBarraLateral ? styles.navbar : styles.navbarExpandido
        }
      >
        {/* __________________Boton de expandir barra lateral____________________________________________*/}
        <div className={styles.divCheck}>
          <input
            className={styles.check}
            type="checkbox"
            id="check"
            checked={expandirBarraLateral}
            onChange={CambioExpandirBarraLateral}
          />
          <label htmlFor="check" className={styles.labelCheck}>
            <i className="fa-solid fa-bars"></i>
          </label>
        </div>
        <div className={styles.separador}></div>

        {/* __________________Titulo y logo____________________________________________*/}

        <NavTitulo mostrarTitulo={!expandirBarraLateral} />
        <div className={styles.separador}></div>

        {/* __________________Buscador____________________________________________*/}
        <div className={styles.buscador}>
          {expandirBarraLateral && (
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={CambioExpandirBarraLateral}
            ></i>
          )}
          {!expandirBarraLateral && (
            <input
              type="text"
              placeholder="Ingrese un anime"
              value={busquedaAnime}
              onChange={buscarAnime}
            />
          )}
        </div>
        <div className={styles.separador}></div>

        {/* __________________Orden ascendente y descendente____________________________________________*/}

        <MenuItem
          barraExpandida={expandirBarraLateral}
          texto="Antiguos"
          icono="Antiguos"
          activo={orden === "Antiguos"}
          onClick={() => ordenar("Antiguos")}
        />
        <MenuItem
          barraExpandida={expandirBarraLateral}
          texto="Nuevos"
          icono="Nuevos"
          activo={orden === "Nuevos"}
          onClick={() => ordenar("Nuevos")}
        />
        <div className={styles.separador}></div>
        {/* __________________Enlaces { mostrar todos, vistos y no vistos } ____________________________________________*/}
        <NavEnlaces
          sesion={sesion}
          mostrar={mostrar}
          mostrarTexto={!expandirBarraLateral}
        />
        <div className={styles.separador}></div>
        {/* __________________Enlace de musica____________________________________________*/}

        {sesion && (
          <a
            href="https://drive.google.com/drive/folders/17PkwSFQ0rKIsiGJJOGWmV4k_apTYc5nZ?usp=sharing"
            target="_blank" // Corregido a _blank
            rel="noopener noreferrer" // Buena práctica de seguridad
            className={styles.musica}
          >
            <MenuItem
              barraExpandida={expandirBarraLateral}
              texto="Musica"
              icono="Musica"
              activo={false}
            />
          </a>
        )}
        <div className={styles.separador}></div>

        {/* __________________Inicio de sesion o perfil____________________________________________*/}

        <NavIngreso
          sesion={sesion}
          existeUsuario={usuario ? true : false}
          barraExpandida={expandirBarraLateral}
        />
        <div className={styles.separador}></div>
        {!expandirBarraLateral && (
          <PrincipalImagen imagen={usuario?.imgPerfil!} />
        )}
      </div>

      {/* __________________Contenedor Principal____________________________________________*/}
      <div className={styles.divPrincipal} ref={divPrincipalRef}>
        <ProximosAnimes images={proximos as Proximo[]} />

        <div className={styles.animesGrid}>
          {/* Aquí se controla la carga secuencial */}
          {animesActual.map((anime, index) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              visto={(animesVistos as number[]).some(
                (vistoId) => Number(vistoId) === Number(anime.id)
              )}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
        <div className={styles.paginador}>
          <button
            className={paginaActual === 1 ? styles.noPagina : styles.anterior}
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            {"<"}
          </button>
          {renderPaginas()}
          <button
            className={
              paginaActual === totalPaginas ? styles.noPagina : styles.siguiente
            }
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
