import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
      }}
    >
      <p>This is a simple example of a Remix app.</p>

      <Link to='/pokemon'>Pokemon</Link>
    </div>
  );
}
