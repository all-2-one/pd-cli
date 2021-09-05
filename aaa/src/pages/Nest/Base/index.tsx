import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Base(props: Props) {
  const { children } = props;
  return (
    <div>
      <header>头部</header>
      <main>{children}</main>
    </div>
  );
}
