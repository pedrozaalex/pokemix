import { LoaderFunction, Outlet, useLoaderData } from 'remix';
import axios from 'axios';
import { PokeIdList } from '~/components/pokeIdList';

export const loader: LoaderFunction = async () => {
  return await axios
    .get('https://pokeapi.co/api/v2/pokemon/?limit=151')
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
  return (
    <>
      <div className={'flex h-full justify-start'}>
        <PokeIdList pokeIdList={data.pokemon} />
        <div className={'m-3'}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
