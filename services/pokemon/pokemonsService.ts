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

const getPokemonInfo = async (nameOrId: string) => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

  const { id, name, sprites } = data;

  return {
    id,
    name,
    sprites
  }
}

export const pokemonService = {
  getPokemons,
  getPokemon
}