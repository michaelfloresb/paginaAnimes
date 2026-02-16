export interface Anime {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: null;
  title_japanese: string;
  title_synonyms: any[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Genre[];
  licensors: Genre[];
  studios: Genre[];
  genres: Genre[];
  explicit_genres: any[];
  themes: Genre[];
  demographics: any[];
  relations: Relation[];
  theme: Theme;
  external: External[];
  streaming: External[];
}

export interface Aired {
  from: Date;
  to: Date;
  prop: Prop;
  string: string;
}

export interface Prop {
  from: From;
  to: From;
}

export interface From {
  day: number;
  month: number;
  year: number;
}

export interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface External {
  name: string;
  url: string;
}

export interface Genre {
  mal_id: number;
  type: Type;
  name: string;
  url: string;
}

export enum Type {
  Anime = "anime",
  Manga = "manga",
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Relation {
  relation: string;
  entry: Genre[];
}

export interface Theme {
  openings: string[];
  endings: string[];
}

export interface Title {
  type: string;
  title: string;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: Images;
}

export interface Images {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
}

export interface PicturesAnime {
  data: PictureAnimeType[];
}

export interface PictureAnimeType {
  jpg: Datum;
  webp: Datum;
}

export interface Datum {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Characters {
  character: CharacterData[];
}

export interface CharacterData {
  character: Character;
  role: Role;
  favorites: number;
  voice_actors: VoiceActor[];
}

export interface Character {
  mal_id: number;
  url: string;
  images: CharacterImages;
  name: string;
}

export interface CharacterImages {
  jpg: Jpg;
  webp: Webp;
}

export interface Jpg {
  image_url: string;
}

export interface Webp {
  image_url: string;
  small_image_url: string;
}

export enum Role {
  Main = "Main",
  Supporting = "Supporting",
}

export interface VoiceActor {
  person: Person;
  language: Language;
}

export enum Language {
  English = "English",
  Japanese = "Japanese",
  PortugueseBR = "Portuguese (BR)",
  Spanish = "Spanish",
}

export interface Person {
  mal_id: number;
  url: string;
  images: PersonImages;
  name: string;
}

export interface PersonImages {
  jpg: Jpg;
}

export interface MyAnimeDb {
  id: string;
  title: string;
  subTitle?: string;
  temporada: string;
  opening: string;
  descarga: string;
  password?: string;
  mal_id: number;
  comentarios?: string;
  imagen: string;
}

export interface Proximo {
  id: string;
  Nombre: string;
  Url: string;
}
