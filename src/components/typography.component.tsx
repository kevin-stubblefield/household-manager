import { ReactNode } from 'react';

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-thin">{children}</h2>;
}
