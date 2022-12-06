import { getPokemons } from "../hooks/useGetPokemons";
import { useAppDispatch } from '../hooks/useAppDispatchAndSelector';

export async function getPokemonsView() {

  const dispatch = useAppDispatch()

  await getPokemons(dispatch);
}
