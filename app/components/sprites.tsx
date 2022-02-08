import React, { useMemo, useState } from 'react';
import { PokemonSprites } from 'pokenode-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFemale,
  faMale,
  faSmile,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { HStack, IconButton, VStack } from '@chakra-ui/react';

type PropsType = {
  sprites: PokemonSprites;
};

type DisplayedSprites = {
  front: string | null;
  back: string | null;
};

export const Sprites = React.memo(
  ({ sprites }: PropsType): JSX.Element => {
    const [showShiny, setShowShiny] = useState(false);
    const [showFemale, setShowFemale] = useState(false);

    const displayedSprites = useMemo((): DisplayedSprites => {
      if (showShiny) {
        if (showFemale) {
          return {
            front: sprites.front_shiny_female,
            back: sprites.back_shiny_female,
          };
        }

        return {
          front: sprites.front_shiny,
          back: sprites.back_shiny,
        };
      }

      if (showFemale) {
        return {
          front: sprites.front_female,
          back: sprites.back_female,
        };
      }

      return {
        front: sprites.front_default,
        back: sprites.back_default,
      };
    }, [showShiny, showFemale, sprites]);

    return (
      <HStack spacing={2}>
        {displayedSprites.front && (
          <img src={displayedSprites.front} alt='front sprite' />
        )}
        {displayedSprites.back && (
          <img src={displayedSprites.back} alt='back sprite' />
        )}

        <VStack spacing={2}>
          <IconButton
            variant='solid'
            colorScheme='purple'
            onClick={() => setShowShiny(s => !s)}
            title={showShiny ? 'Show default sprite' : 'Show shiny sprite'}
            aria-label={showShiny ? 'Show default sprite' : 'Show shiny sprite'}
            icon={
              showShiny ? (
                <FontAwesomeIcon icon={faSmile} size={'sm'} />
              ) : (
                <FontAwesomeIcon icon={faStar} size={'sm'} />
              )
            }
          />
          {sprites.front_female && (
            <IconButton
              variant='solid'
              colorScheme='purple'
              onClick={() => setShowFemale(s => !s)}
              aria-label={
                showFemale ? 'Show male sprite' : 'Show female sprite'
              }
              title={showFemale ? 'Show male sprite' : 'Show female sprite'}
              icon={
                showFemale ? (
                  <FontAwesomeIcon icon={faFemale} size={'1x'} />
                ) : (
                  <FontAwesomeIcon icon={faMale} size={'1x'} />
                )
              }
            />
          )}
        </VStack>
      </HStack>
    );
  },
  (prev, next) => prev.sprites.front_default === next.sprites.front_default
);
