import { pokeApi } from "@/api";
import { Pokemon, PokemonListResponse } from "@/interfaces";

const getPokemons = async (): Promise<PokemonListResponse> => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  return data;
}

const getPokemon = (id: string): Promise<Pokemon | null> => {

  return pokeApi.get<Pokemon>(`/pokemon/${id}`)
    .then(({ data }) => data)
    .catch(() => null)
}

const getPokemonByName = (pokemonName: string): Promise<Pokemon | null> => {
  return pokeApi.get<Pokemon>(`/pokemon/${pokemonName}`)
    .then(({ data }) => data)
    .catch(() => null);
}

export const pokemonService = {
  getPokemons,
  getPokemon,
  getPokemonByName
}