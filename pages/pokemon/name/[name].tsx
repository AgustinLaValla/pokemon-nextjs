import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next';
import { Button, Card, Container, Grid, Image, Loading, Text } from '@nextui-org/react';
import { Pokemon } from '@/interfaces'
import Layout from '@/components/layouts/Layout';
import { favoritesService, pokemonService } from '@/services';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';

type Props = {
  pokemon: Pokemon
}

const PokemonByName: React.FC<Props> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const { isFallback } = useRouter();

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
    if (!pokemon?.id) return;
    setIsFavorite(favoritesService.existInFavorites(pokemon.id));
  }, [pokemon])

  return (
    <Layout title={!isFallback ? pokemon.name : 'Loading...'}>

      {isFallback
        ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <Loading size='xl' />
          </div>
        )

        : (
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
        )
      }
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await pokemonService.getPokemons();

  return {
    paths: results.map(({ name }) => ({ params: { name } })),
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async (ctx) => {

  const params = ctx.params as { name: string };

  const pokemon = await pokemonService.getPokemonByName(params.name);

  if(!pokemon) return {
    redirect: {
      destination: '/404',
      permanent: true
    }
  }

  return {
    props: {
      pokemon
    }
  }
}

export default PokemonByName