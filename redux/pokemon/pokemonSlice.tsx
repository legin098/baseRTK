import { createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";
import { IPokemonState } from "../../models/pokemon";
import { pokemonApi } from '../../config/pokemonApi';

const initialState: IPokemonState = {
  page: 0,
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.page = action.payload.page;
      state.pokemons = action.payload.pokemons;
    },
  },
});


export const { setPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer