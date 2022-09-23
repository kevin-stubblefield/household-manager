import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { Sidebar } from '../components/sidebar.component';
import { TiledList } from '../components/tiledList.component';
import { AddHouseholdForm } from '../components/addHouseholdForm.component';
import { MainLayout } from '../layouts/main.layout';

const Home: NextPage = () => {
  return (
    <MainLayout title="Home" description="User dashboard">
      <p>Hi. This will maybe be a dashboard? or just go to /households, idk</p>
    </MainLayout>
  );
};

export default Home;
