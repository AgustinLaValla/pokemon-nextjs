import { Grid } from '@nextui-org/react'
import React from 'react'
import FavoritesPokemonCard from './FavoritesPokemonCard'

type Props = {
  pokemonsIds: number[]
}

const FavoritesPokemons: React.FC<Props> = ({ pokemonsIds }) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start' >{
      pokemonsIds.map(pokemonId =>
        <FavoritesPokemonCard key={pokemonId} pokemonId={pokemonId} />)
    }</Grid.Container>
  )
}

export default FavoritesPokemons;