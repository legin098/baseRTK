export interface IPokemonState {
  page?: number;
  pokemons: IData[];
}

export interface IData {
  name: string;
  url: string;
}
