import { ReactNode } from 'react';

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-thin mb-8">{children}</h2>;
}
