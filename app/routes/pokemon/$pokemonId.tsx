import { LoaderFunction, useLoaderData } from 'remix';
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import { TitleCase } from '~/utils/titleCase';
import { Sprites } from '~/components/sprites';
import { useMemo } from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { PokemonBattleStats } from '~/components/pokemonBattleStats';
import { PokemonBadges } from '~/components/pokemonBadges';
import { PokemonTypes } from '~/components/pokemonTypes';

const api = new PokemonClient();

export const loader: LoaderFunction = async ({ params }) => {
  // Get Pokémon and Pokémon species data and return combination of both
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
    <Box>
      <SimpleGrid
        m={8}
        p={8}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius={16}
        columns={2}
        spacing={4}
      >
        <Box>
          <HStack align={'flex-start'}>
            <Heading as={'h1'} size={'xl'}>
              {TitleCase(pokemon.name)}
            </Heading>
            <PokemonBadges
              isBaby={pokemon.is_baby}
              isLegendary={pokemon.is_legendary}
              isMythical={pokemon.is_mythical}
            />
          </HStack>

          <br />

          <Sprites sprites={pokemon.sprites} />
          <PokemonTypes types={pokemon.types} />

          <br />

          <Flex>
            <Box as={'section'} flex={'1'}>
              <Heading as={'h3'} size={'sm'} display={'inline'}>
                Height:{' '}
              </Heading>
              <Text as={'span'}>{(pokemon.height / 10).toFixed(2)} m</Text>
              <br />
              <Heading as={'h3'} size={'sm'} display={'inline'}>
                Weight:{' '}
              </Heading>
              <Text as={'span'}>{(pokemon.weight / 10).toFixed(2)} kg</Text>
              <br />
              <Heading as={'h3'} size={'sm'} display={'inline'}>
                Base XP:{' '}
              </Heading>
              <Text as={'span'}>{pokemon.base_experience}</Text>
            </Box>

            {flavorText && (
              <Box as={'section'} flex={'2'}>
                <Heading as={'h2'} size='md'>
                  Description
                </Heading>
                <Text>{flavorText}</Text>
              </Box>
            )}
          </Flex>

          <br />

          <PokemonBattleStats stats={pokemon.stats} />
        </Box>
        <VStack align={'flex-start'} />
      </SimpleGrid>
    </Box>
  );
}
