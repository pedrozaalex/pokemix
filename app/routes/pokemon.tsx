import { LoaderFunction, Outlet, useLoaderData } from 'remix';
import axios from 'axios';
import { PokeIdList } from '~/components/pokeIdList';
import { HStack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

export const loader: LoaderFunction = async () => {
  return await axios
    .get('https://pokeapi.co/api/v2/pokemon/?limit=898')
    .then(({ data: { count, results } }) => {
      return {
        totalPokemon: count,
        pokemon: results.map((pokemon: any) => ({
          name: pokemon.name,
          url: pokemon.url,
        })),
      };
    });
};

export default function PokedexRoute() {
  const data = useLoaderData() as {
    totalPokemon: number;
    pokemon: { name: string; url: string }[];
  };

  const [selectedPokemon, setSelectedPokemon] = useState<number>(0);

  return (
    <HStack
      h={'100%'}
      align={'stretch'}
      bgColor={useColorModeValue('gray.100', 'gray.900')}
    >
      <PokeIdList
        pokeIdList={data.pokemon.map(p => ({
          name: p.name,
          id: Number(p.url.match(/\/(\d+)\/$/)![1] ?? 0),
        }))}
        selected={selectedPokemon}
        onSelect={setSelectedPokemon}
      />
      <Outlet />
    </HStack>
  );
}
