import React from 'react'
import { useRouter } from 'next/router'
import { Grid, Card } from '@nextui-org/react';

type Props = {
  pokemonId: number
}

const FavoritesPokemonCard: React.FC<Props> = ({ pokemonId }) => {

  const { push } = useRouter();

  const onFavoriteClicked = () => push(`/pokemon/${pokemonId}`)

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId} onClick={onFavoriteClicked}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width={'100%'}
          height={140}
        />
      </Card>
    </Grid>
  )
}

export default FavoritesPokemonCard