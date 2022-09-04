import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { trpc } from '../utils/trpc';

const AccountButton = () => {
  const { data } = useSession();

  if (!data) {
    return <button onClick={() => signIn()}>Sign In</button>;
  }

  return (
    <div>
      Hi, {data?.user?.name} |{' '}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

const Header = () => {
  return (
    <header className="container mx-auto p-4 flex">
      <div className="flex-1">Home Manager</div>
      <div>
        <AccountButton />
      </div>
    </header>
  );
};

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <section className="container mx-auto">
        <h1>{hello?.data?.greeting}</h1>
      </section>
    </>
  );
};

export default Home;
