import { formatStatName } from '~/utils/formatStatName';
import { PokemonStat } from 'pokenode-ts';

type PropsType = {
  stat: PokemonStat;
};

export const Stat = ({ stat }: PropsType) => {
  return (
    <>
      <h3>{formatStatName(stat.stat.name)}</h3>
      <p>{stat.base_stat}</p>
    </>
  );
};
