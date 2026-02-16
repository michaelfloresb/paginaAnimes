import styles from "./css/AnimeCategorias.module.css";
import { Genre } from "../interfaces/anime-interface";

interface Props {
  categorias: Genre[];
}

export function AnimeCategorias({ categorias }: Props) {
  return (
    <div className={styles.content}>
      {categorias !== null &&
        categorias !== undefined &&
        categorias.map((categoria, index) => {
          return (
            <div key={index} className={styles.card}>
              <span className={styles.font}>{categoria.name}</span>
            </div>
          );
        })}
    </div>
  );
}
