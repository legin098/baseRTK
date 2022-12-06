import {
  setPokemons,
} from "../redux/pokemon/pokemonSlice";
import { pokemonApi } from "../config/pokemonApi";
import { useRef } from "react";

export const getPokemons = async (dispatch) => {
  //const page = useRef(1);

  const { data } = await pokemonApi.get("/pokemon", {
    params: {
      limit: 10,
      offset: 0,
    },
  });

  dispatch(
    setPokemons({
      pokemons: data.results,
      page: 0,
    })
  );
};
