import { Hero } from '@models/hero.interface';

export const RICK: Hero = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20'
  }
}
