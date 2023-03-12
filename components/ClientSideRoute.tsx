'use client';

import Link from 'next/link';

export default function ClientSideRoute({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
  return (
    <Link href={route}>
      <div>{children}</div>{' '}
      {/* NOTE: having children like this makes this a wrapper */}
    </Link>
  );
}
