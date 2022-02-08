import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import { Navbar } from '~/components/navbar';
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export const meta: MetaFunction = () => ({ title: 'New Remix App' });

function Document({
  children,
  title = 'App title',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <ColorModeScript initialColorMode={'dark'} />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App(): ReactElement {
  return (
    <Document>
      <ChakraProvider>
        <Box h={'5rem'}>
          <Navbar />
        </Box>
        <Box h={'calc(100vh - 5rem)'}>
          <Outlet />
        </Box>
      </ChakraProvider>
    </Document>
  );
}
