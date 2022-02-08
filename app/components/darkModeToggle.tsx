import { IconButton, useColorMode } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export function DarkModeToggle(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={() => {
        console.log(colorMode);
        toggleColorMode();
      }}
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      type='button'
      variant='solid'
      colorScheme='purple'
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    />
  );
}
