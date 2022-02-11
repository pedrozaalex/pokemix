import { Badge } from '@chakra-ui/react';

interface PokemonBadgesProps {
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
}

export function PokemonBadges({
  isBaby,
  isLegendary,
  isMythical,
}: PokemonBadgesProps) {
  return (
    <div className='pokemon-badges'>
      {isBaby && (
        <Badge variant='solid' colorScheme='pink'>
          Baby
        </Badge>
      )}
      {isLegendary && (
        <Badge variant='solid' colorScheme='yellow'>
          Legendary
        </Badge>
      )}
      {isMythical && (
        <Badge variant='solid' colorScheme='purple'>
          Mythical
        </Badge>
      )}
    </div>
  );
}
