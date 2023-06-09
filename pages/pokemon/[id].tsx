import React, { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { Pokemon } from '@/interfaces'
import Layout from '@/components/layouts/Layout';
import { favoritesService, pokemonService } from '@/services';
import confetti from 'canvas-confetti';

type Props = {
  pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {

  const [isFavorite, setIsFavorite] = React.useState(false);

  const onToggleFavorite = () => {
    favoritesService.toggleFavorites(pokemon.id);
    setIsFavorite(prev => !prev);
    if (isFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      }
    })
  }


  React.useEffect(() => {
    setIsFavorite(favoritesService.existInFavorites(pokemon.id));
  }, [pokemon.id])

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4} >
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>

              <Button
                color="gradient"
                ghost
                onClick={onToggleFavorite}
              >
                {!isFavorite ? 'Save as favorite' : 'In favorites'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

              </Container>


            </Card.Body>


          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const ids = [...Array(151)].map((_, i) => `${i + 1}`);

  return {
    fallback: 'blocking',
    paths: ids.map(id => ({ params: { id } }))
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { id } = ctx.params as { id: string };

  const pokemon = await pokemonService.getPokemon(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon: await pokemonService.getPokemon(id)
    },
    revalidate: 86400
  }
}

export default PokemonPage;