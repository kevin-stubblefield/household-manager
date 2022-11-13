import type { NextPage } from 'next';
import { MainLayout } from '../layouts/main.layout';

const Home: NextPage = () => {
  return (
    <MainLayout title="Home" description="User dashboard">
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>Hi. This will maybe be a dashboard? or just go to /households, idk</p>
      <p>Need to make a home page before a user has signed up/in</p>
    </MainLayout>
  );
};

export default Home;
