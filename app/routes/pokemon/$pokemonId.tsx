import { LoaderFunction, useLoaderData } from 'remix';
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import { TitleCase } from '~/utils/titleCase';
import { Sprites } from '~/components/sprites';
import { useMemo } from 'react';
import { Stat } from '~/components/stat';

const api = new PokemonClient();

export const loader: LoaderFunction = async ({ params }) => {
  // Get Pokemon and pokemon species data and return combination of both
  return Promise.all([
    api.getPokemonById(Number(params.pokemonId)),
    api.getPokemonSpeciesById(Number(params.pokemonId)),
  ]).then(([pokemon, species]) => {
    return Object.assign({}, pokemon, species);
  });
};

export default function PokemonRoute() {
  const pokemon = useLoaderData() as Pokemon & PokemonSpecies;
  const flavorText = useMemo(() => {
    return pokemon.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    )?.flavor_text;
  }, [pokemon.flavor_text_entries]);

  return (
    <div className={'bg-white rounded-3xl p-8 shadow'}>
      <h1 className={'text-5xl font-bold'}>{TitleCase(pokemon.name)}</h1>

      <br />

      <Sprites sprites={pokemon.sprites} />

      <br />

      <div className={'max-w-md grid grid-cols-3 gap-2'}>
        <section className={''}>
          <h2 className={'text-xl font-bold'}>Stats</h2>
          <p>Height: {(pokemon.height / 10).toFixed(2)}m</p>
          <p>Weight: {(pokemon.weight / 10).toFixed(2)}kg</p>
          <p>Base XP: {pokemon.base_experience}</p>
        </section>

        {flavorText && (
          <section className={'col-span-2'}>
            <h2 className={'text-xl font-bold'}>Flavor Text</h2>
            <p>{flavorText}</p>
          </section>
        )}
      </div>

      <br />

      <h2 className={'text-xl font-bold'}>Base Stats</h2>
      <ul className={`grid grid-cols-6 gap-1`}>
        {pokemon.stats.map(s => (
          <li key={s.stat.name}>
            <Stat stat={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
