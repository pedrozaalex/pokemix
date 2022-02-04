import type { LinksFunction, MetaFunction } from 'remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import styles from './tailwind.css';
import { Navbar } from '~/components/navbar';

export const meta: MetaFunction = () => ({ title: 'New Remix App' });

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css',
  },
  {
    rel: 'stylesheet',
    href: styles,
  },
];
export default function App(): JSX.Element {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className={'h-screen w-screen bg-gray-100'}>
        <nav className={'bg-fuchsia-400 h-28 grid shadow-xl'}>
          <Navbar />
        </nav>
        <main className={'h-[calc(100vh-7rem)]'}>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
