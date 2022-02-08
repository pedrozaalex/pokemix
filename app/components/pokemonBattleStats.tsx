import {
  Heading,
  HStack,
  List,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { PokemonStat } from 'pokenode-ts';
import { formatStatName } from '~/utils/formatStatName';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

export const PokemonBattleStats: React.FC<PokemonStatsProps> = ({ stats }) => (
  <>
    <Heading as='h2' size='md'>
      Battle Stats
    </Heading>
    <HStack as={List} spacing={8} align={'flex-end'}>
      {stats.map(s => (
        <Stat as={ListItem} key={s.stat.name}>
          <StatLabel>{formatStatName(s.stat.name)}</StatLabel>
          <StatNumber>{s.base_stat}</StatNumber>
        </Stat>
      ))}
    </HStack>
  </>
);
