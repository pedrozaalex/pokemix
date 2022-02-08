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

type PropsType = {
  pokeIdList: PokeId[];
  selected: number;
  onSelect: (id: number) => void;
};

export const PokeIdList: React.FC<PropsType> = ({
  pokeIdList,
  selected,
  onSelect,
}) => {
  const [search, setSearch] = useState<string>('');

  const preparedPokeIdList = useMemo(() => {
    return pokeIdList.map(pokeId => ({
      ...pokeId,
      preparedName: prepareForFuzzySearch(pokeId.name),
    }));
  }, [pokeIdList]);

  const filteredPokeIdList: PokeId[] = useMemo(() => {
    if (search === '') {
      return pokeIdList;
    }

    return fuzzySearchGo(search, preparedPokeIdList, {
      key: 'preparedName',
      limit: 100, // don't return more than 100 results
      allowTypo: false, // don't care about allowing typos
      threshold: -10000, // don't return bad results
    }).map(result => result.obj);
  }, [search]);

  return (
    <Box minW={'52'} m={8} mr={0}>
      <VStack
        p={4}
        pb={8}
        bgColor={useColorModeValue('white', 'gray.700')}
        borderRadius={'2xl'}
        h={'80vh'}
      >
        <InputGroup>
          <InputLeftElement pointerEvents='none' children={<SearchIcon />} />
          <Input
            type='tel'
            placeholder='Search'
            _placeholder={{
              color: useColorModeValue('gray.500', 'gray.100'),
            }}
            borderRadius={'full'}
            border={'none'}
            bgColor={useColorModeValue('gray.100', 'gray.500')}
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
  );
};
