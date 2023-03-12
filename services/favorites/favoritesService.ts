const getFavorites = (): number[] =>
  JSON.parse(localStorage.getItem('favorites') || '[]');

const toggleFavorites = (id: number): void => {
  let favorites: number[] = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(favorite => favorite !== id);
  } else {
    favorites = [...favorites, id];
  };

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

const existInFavorites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  const favorites = getFavorites();

  return favorites.includes(id);
}

export const favoritesService = {
  getFavorites,
  toggleFavorites,
  existInFavorites,
}