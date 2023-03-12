import React from 'react'
import { NextPage } from 'next'

import { favoritesService } from '@/services';
import Layout from '@/components/layouts/Layout';
import { FavoritesPokemons, NoFavorites } from '@/components/favorites';



const FavoritesPage: NextPage = () => {

  const [favorites, setFavorites] = React.useState<number[]>([]);

  React.useEffect(() => {
    setFavorites(favoritesService.getFavorites());
  }, []);

  return (
    <Layout title="Favorites pokemons">
      {
        !favorites.length
          ? <NoFavorites />
          : <FavoritesPokemons pokemonsIds={favorites} />
      }
    </Layout>
  )
}


export default FavoritesPage