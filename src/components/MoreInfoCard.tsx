import { Anime } from "../interfaces/anime-interface";
import styles from "./css/MoreInfoCard.module.css";
import MoreInfoItem from "./MoreInfoItem";

interface Props {
  animeMal: Anime;
}

const MoreInfoCard = ({ animeMal }: Props) => {
  return (
    <div className={styles.moreInfo}>
      <MoreInfoItem title={"Episodios"} text={animeMal.episodes?.toString()} />
      <MoreInfoItem
        title={"Clasificacion"}
        text={animeMal.rating?.toString()}
        clasfificacion
      />
      <MoreInfoItem title={"Año"} text={animeMal.year?.toString()} />
      <MoreInfoItem title={"Tipo"} text={animeMal.type?.toString()} />
      <MoreInfoItem title={"Duración"} text={animeMal.duration?.toString()} />
      <MoreInfoItem title={"Puntaje"} text={animeMal.score?.toString()} />
    </div>
  );
};

export default MoreInfoCard;
