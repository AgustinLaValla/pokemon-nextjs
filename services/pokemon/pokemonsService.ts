import { pokeApi } from "@/api";
import { Pokemon, PokemonListResponse } from "@/interfaces";

const getPokemons = async (): Promise<PokemonListResponse> => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  return data;
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return data;
}

const getPokemonByName = async (pokemonName: string): Promise<Pokemon> => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${pokemonName}`);

  return data;
}

export const pokemonService = {
  getPokemons,
  getPokemon,
  getPokemonByName
}