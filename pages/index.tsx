import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps, NextPage } from 'next'

import { Grid } from '@nextui-org/react'

import Layout from '@/components/layouts/Layout'
import { PokemonListResponse, SmallPokemon } from '@/interfaces'
import { pokeApi } from '@/api'
import PokemonCard from '@/components/pokemon/PokemonCard'
import { pokemonService } from '@/services'

interface Props {
  pokemons: SmallPokemon[]
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title={'Pokemon lists'}>
      <Grid.Container>
        {pokemons.map(poke =>
          <PokemonCard key={poke.id} pokemon={poke} />)
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await pokemonService.getPokemons();

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default Home;