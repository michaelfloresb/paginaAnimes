import styles from "./css/AnimeInfo.module.css";

interface Props {
  titulo: string;
}

const AnimeInfo = ({ titulo }: Props) => {
  return (
    <div className={styles.estilo}>
      <span>{titulo}</span>
    </div>
  );
};
export { AnimeInfo };
