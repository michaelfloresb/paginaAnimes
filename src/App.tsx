import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimeDetalles } from "./pages/AnimeDetalles";
import { PaginaInicio } from "./pages/PaginaInicio";
import { Registro } from "./pages/Registro";
import { PaginaPerfil } from "./pages/PaginaPerfil";
import { useEffect, useState } from "react";

import { MyAnimeDb, Proximo } from "./interfaces/anime-interface";
import AddAnime from "./pages/AddAnime";
import Proximos from "./pages/Proximos";
import { obtenerDatos, obtenerProximos } from "./Funciones/FirebaseFunciones";

const App = () => {
  const [datos, setDatos] = useState<MyAnimeDb[]>([]);
  const [proximos, setProximos] = useState<Proximo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerAnimes = async () => {
      try {
        const data = await obtenerDatos();
        if (data) {
          setDatos(data as MyAnimeDb[]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    obtenerAnimes();
  }, []);

  useEffect(() => {
    const obtenerProx = async () => {
      try {
        const prox = (await obtenerProximos()) as Proximo[];
        if (prox) {
          setProximos(prox as Proximo[]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProx();
  }, []);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Router>
      <main>
        <Routes>
          <Route
            path="/:vista"
            element={<PaginaInicio datos={datos} proximos={proximos} />}
          />
          <Route
            path="/"
            element={<PaginaInicio datos={datos} proximos={proximos} />}
          />
          <Route path="/anime/:id" element={<AnimeDetalles datos={datos} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/Perfil" element={<PaginaPerfil />} />
          <Route path="/AddAnime" element={<AddAnime />} />
          <Route path="/Proximos" element={<Proximos />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
