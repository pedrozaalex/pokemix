import { Badge } from '@chakra-ui/react';

interface PokemonBadgesProps {
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
}

export const PokemonBadges: React.FC<PokemonBadgesProps> = ({
  isBaby,
  isLegendary,
  isMythical,
}) => {
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
};
