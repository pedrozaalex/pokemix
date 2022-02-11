import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import { Navbar } from '~/components/navbar';
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { ReactElement, ReactNode } from 'react';
import rootStyles from '~/styles/root.css';

export const meta: MetaFunction = () => ({ title: 'New Remix App' });

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: rootStyles,
  },
];

type DocumentProps = {
  children: ReactNode;
};

function Document({ children }: DocumentProps) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <ColorModeScript initialColorMode={'system'} />
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
