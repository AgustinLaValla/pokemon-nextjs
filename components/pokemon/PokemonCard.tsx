import { FC } from 'react'
import { Grid, Card, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from '@/interfaces'
import { useRouter } from 'next/router';

type Props = {
  pokemon: SmallPokemon
}

const PokemonCard: FC<Props> = ({ pokemon }) => {

  const { push } = useRouter();

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
      <Card
        isHoverable
        isPressable
        onClick={() => push(`/pokemon/name/${pokemon.name}`)}
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            src={pokemon.img}
            width="100%"
            height={140}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify='space-between'>
            <Text transform='capitalize'>{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}

export default PokemonCard