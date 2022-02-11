import {
  HStack,
  List,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { PokemonStat } from 'pokenode-ts';
import { formatStatName } from '~/utils/formatStatName';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

export function PokemonBattleStats({ stats }: PokemonStatsProps) {
  return (
    <>
      <HStack as={List} spacing={8} align={'flex-end'}>
        {stats.map(s => (
          <Stat
            as={ListItem}
            key={s.stat.name}
            display={'flex'}
            alignItems={'center'}
            textAlign={'center'}
          >
            <StatLabel
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              w={'12'}
              h={'12'}
              borderRadius={'50%'}
              bg={useColorModeValue('gray.200', 'gray.800')}
              fontWeight={'bold'}
              mb={2}
            >
              {formatStatName(s.stat.name)}
            </StatLabel>
            <StatNumber>{s.base_stat}</StatNumber>
          </Stat>
        ))}
      </HStack>
    </>
  );
}
