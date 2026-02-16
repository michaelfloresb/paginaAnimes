import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { MyAnimeDb, Proximo } from "../interfaces/anime-interface";

export const obtenerProximos = async (): Promise<Proximo[] | undefined> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Proximos"));
    const proximosData: Proximo[] = [];
    querySnapshot.forEach((doc) => {
      proximosData.push({ id: doc.id, ...doc.data() } as Proximo);
    });
    console.log("Proximos cargados desde firebase");
    return proximosData;
  } catch (error: any) {
    console.error("Error al obtener los proximos de firebase: ", error);
    return undefined;
  }
};

export const obtenerDatos = async (): Promise<MyAnimeDb[] | undefined> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Animes"));
    const animesData: MyAnimeDb[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as MyAnimeDb;
      animesData.push({ ...data, id: data.id }); // Aseguramos que 'id' esté presente
    });
    console.log("Datos cargados desde firebase");
    return animesData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  } catch (error: any) {
    console.error("Error al obtener datos de firebase: ", error);
    return undefined;
  }
};
