import React, { useMemo, useState } from 'react';
import { PokemonSprites } from 'pokenode-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFemale,
  faMale,
  faSmile,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

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
      <div className={'flex items-center gap-2 justify-center'}>
        {displayedSprites.front && (
          <img
            src={displayedSprites.front}
            alt='front sprite'
            className={'border'}
          />
        )}
        {displayedSprites.back && (
          <img
            src={displayedSprites.back}
            alt='back sprite'
            className={'border'}
          />
        )}

        <div className={'flex flex-col items-start gap-2'}>
          <button
            onClick={() => setShowShiny(s => !s)}
            className={'bg-fuchsia-400 rounded aspect-square h-8'}
          >
            {showShiny ? (
              <FontAwesomeIcon icon={faSmile} size={'sm'} />
            ) : (
              <FontAwesomeIcon icon={faStar} size={'sm'} />
            )}
          </button>
          {sprites.front_female && (
            <button
              onClick={() => setShowFemale(s => !s)}
              className={'bg-fuchsia-400 rounded aspect-square h-8'}
            >
              {showFemale ? (
                <FontAwesomeIcon icon={faFemale} size={'1x'} />
              ) : (
                <FontAwesomeIcon icon={faMale} size={'1x'} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
  (prev, next) => prev.sprites.front_default === next.sprites.front_default
);
