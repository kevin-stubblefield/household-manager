import Head from 'next/head';
import { ReactNode } from 'react';
import { Sidebar } from '../components/sidebar.component';

export const MainLayout = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <div className="flex">
        <Sidebar />
        <div className="p-2 flex-1 bg-gray-900 text-gray-300">{children}</div>
      </div>
    </>
  );
};
