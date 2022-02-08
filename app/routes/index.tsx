import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <div>
      <p>This is a simple example of a Remix app.</p>

      <Link to='/pokemon'>Pokemon</Link>
    </div>
  );
}
