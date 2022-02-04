import { Link } from '@remix-run/react';
import { TitleCase } from '~/utils/titleCase';

type PropsType = {
  pokeIdList: {
    name: string;
  }[];
};

export const PokeIdList = ({ pokeIdList }: PropsType) => (
  <div className={'h-full overflow-y-auto overflow-x-hidden bg-white shadow'}>
      <ul className={'w-40 ml-8 mr-4'}>
        {pokeIdList.map((pokemon, i) => (
          <li key={i + 1} className={'my-2'}>
            <Link
              to={`/pokemon/${i + 1}`}
              className={'hover:decoration-1 hover:underline'}
            >
              <b className={'mr-2'}>#{i + 1}</b>
              {TitleCase(pokemon.name)}
            </Link>
          </li>
        ))}
      </ul>
  </div>
);
