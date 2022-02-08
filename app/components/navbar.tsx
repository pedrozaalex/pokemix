import React from 'react';
import { Heading, HStack, Text } from '@chakra-ui/react';
import { DarkModeToggle } from '~/components/darkModeToggle';

export function Navbar(): JSX.Element {
  return (
    <HStack as={'nav'} p={6} h={'100%'} justify={'space-between'}>
      <Heading>
        <Text color={'#48F0EA'} display={'inline'}>
          P
        </Text>
        <Text color={'#6FDA6D'} display={'inline'}>
          o
        </Text>
        <Text color={'#FED02D'} display={'inline'}>
          k
        </Text>
        <Text color={'#F44B58'} display={'inline'}>
          é
        </Text>
        <Text color={'#41A6FF'} display={'inline'}>
          m
        </Text>
        <Text color={'#DB4BD6'} display={'inline'}>
          i
        </Text>
        <Text color={'#48F0EA'} display={'inline'}>
          x
        </Text>
      </Heading>
      <DarkModeToggle />
    </HStack>
  );
}
