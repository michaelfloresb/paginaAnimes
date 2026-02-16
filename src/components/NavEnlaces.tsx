import { useNavigate } from "react-router-dom";

import { MenuItem } from "./MenuItem";

interface Props {
  sesion: boolean;
  mostrar: string;
  mostrarTexto: boolean;
}

const NavEnlaces = ({ sesion, mostrar, mostrarTexto }: Props) => {
  const navigate = useNavigate();
  const redirect = (link: string) => {
    console.log("link", link);
    navigate("/" + link);
  };

  return (
    <>
      <MenuItem
        barraExpandida={!mostrarTexto}
        texto="Todos"
        icono="Todo"
        activo={mostrar === "todos" ? true : false}
        onClick={() => redirect("todos")}
      />

      {sesion && (
        <MenuItem
          barraExpandida={!mostrarTexto}
          texto="Vistos"
          icono="Visto"
          activo={mostrar === "vistos" ? true : false}
          onClick={() => redirect("vistos")}
        />
      )}
      {sesion && (
        <MenuItem
          barraExpandida={!mostrarTexto}
          texto="No Vistos"
          icono="NoVisto"
          activo={mostrar === "noVisto" ? true : false}
          onClick={() => redirect("noVisto")}
        />
      )}
    </>
  );
};

export { NavEnlaces };
