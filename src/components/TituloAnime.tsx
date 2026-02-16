import styles from "./css/TituloAnime.module.css";

interface Props {
  titulo: string;
  tipo: string;
}

const TituloAnime = ({ titulo, tipo }: Props) => {
  return (
    <div className={styles.titulo}>
      <span className={styles[tipo]}>{titulo}</span>
    </div>
  );
};

export { TituloAnime };
