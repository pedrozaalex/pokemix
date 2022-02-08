import React from 'react';
import { PokemonType } from 'pokenode-ts';
import { HStack, Tag } from '@chakra-ui/react';

interface PokemonTypesProps {
  types: PokemonType[];
}

const TypeToColorMap: { [key: string]: string } = {
  bug: 'green.300',
  dark: 'gray.500',
  dragon: 'purple.300',
  electric: 'yellow.500',
  fairy: 'pink.500',
  fighting: 'red.500',
  fire: 'red.500',
  flying: 'blue.300',
  ghost: 'purple.500',
  grass: 'green.500',
  ground: 'orange.500',
  ice: 'blue.100',
  normal: 'gray.500',
  poison: 'purple.700',
  psychic: 'pink.300',
  rock: 'yellow.600',
  steel: 'gray.500',
  water: 'blue.500',
};

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => {
  return (
    <>
      <HStack>
        {types.map((t, index) => (
          <Tag
            key={index}
            borderRadius={'full'}
            bgColor={TypeToColorMap[t.type.name] ?? 'initial'}
            size={'lg'}
          >
            {t.type.name}
          </Tag>
        ))}
      </HStack>
    </>
  );
};
