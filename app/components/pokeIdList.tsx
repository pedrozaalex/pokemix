import { Link as RemixLink } from '@remix-run/react';
import { TitleCase } from '~/utils/titleCase';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListItem,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  go as fuzzySearchGo,
  prepare as prepareForFuzzySearch,
} from 'fuzzysort';
import Prepared = Fuzzysort.Prepared;

type PokeId = {
  id: number;
  name: string;
  preparedName?: Prepared;
};

type PokeIdListPropsType = {
  pokeIdList: PokeId[];
  selected: number;
  onSelect: (id: number) => void;
};

export const PokeIdList = ({
  pokeIdList,
  selected,
  onSelect,
}: PokeIdListPropsType) => {
  const [search, setSearch] = useState<string>('');

  const preparedPokeIdList = useMemo(() => {
    console.log('preparing...');
    return pokeIdList.map(pokeId => ({
      ...pokeId,
      preparedName: prepareForFuzzySearch(pokeId.name),
    }));
  }, [pokeIdList.length]);

  const filteredPokeIdList: PokeId[] = useMemo(() => {
    console.log('filtering...');

    if (search === '') {
      console.log('returning all');
      return pokeIdList;
    }

    console.log('searching...');
    return fuzzySearchGo(search, preparedPokeIdList, {
      key: 'preparedName',
      limit: 100, // don't return more than 100 results
      allowTypo: false, // don't care about allowing typos
      threshold: -10000, // don't return bad results
    }).map(result => result.obj);
  }, [search]);

  const VStackBg = useColorModeValue('white', 'gray.700');
  const InputPlaceholderColor = useColorModeValue('gray.500', 'gray.100');
  const InputBgColor = useColorModeValue('gray.100', 'gray.500');
  const { colorMode } = useColorMode();

  return useMemo(
    () => (
      <Box minW={'56'}>
        <VStack p={4} pb={8} bgColor={VStackBg} borderRadius={'2xl'} h={'100%'}>
          <InputGroup>
            <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
            <Input
              type='tel'
              placeholder='Search'
              _placeholder={{
                color: InputPlaceholderColor,
              }}
              borderRadius={'full'}
              border={'none'}
              bgColor={InputBgColor}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
          <Box w={'80%'} overflow={'hidden auto'} align={'flex-end'}>
            <List listStyleType={'none'}>
              {filteredPokeIdList.map(pokemon => (
                <ListItem key={pokemon.id}>
                  <Link
                    as={RemixLink}
                    to={`/pokemon/${pokemon.id}`}
                    _hover={{
                      textDecor: 'underline',
                      bgGradient:
                        'linear(to-r, #48F0EA,#6FDA6D,#FED02D,#F44B58,#41A6FF,#DB4BD6,#48F0EA)',
                      bgClip: 'text',
                    }}
                    fontWeight={selected === pokemon.id ? 'bold' : 'normal'}
                    onClick={() => onSelect(pokemon.id)}
                  >
                    <b>#{pokemon.id}</b> {TitleCase(pokemon.name)}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </VStack>
      </Box>
    ),
    [selected, onSelect, search, colorMode]
  );
};
