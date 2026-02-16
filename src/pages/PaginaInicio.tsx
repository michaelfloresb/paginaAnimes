import { AnimesGrid } from "../components/AnimeGrid";
import { useParams } from "react-router";
import { MyAnimeDb, Proximo } from "../interfaces/anime-interface";

interface Props {
  datos: MyAnimeDb[];
  proximos: Proximo[];
}

const PaginaInicio = ({ datos, proximos }: Props) => {
  const { vista } = useParams();
  let mostrar = "";

  if (vista === undefined) {
    mostrar = "todos";
  } else {
    mostrar = vista;
  }

  return (
    <div>
      <AnimesGrid
        mostrar={mostrar}
        datos={datos}
        proximos={proximos as Proximo[]}
      />
    </div>
  );
};
export { PaginaInicio };
