import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { Sidebar } from '../components/sidebar.component';
import { TiledList } from '../components/tiledList.component';
import { AddHouseholdForm } from '../components/addHouseholdForm.component';
import { MainLayout } from '../layouts/main.layout';

const Home: NextPage = () => {
  return (
    <MainLayout title="Households" description="Households for the user">
      <div className="flex-1">
        <AddHouseholdForm />
        <TiledList query={'household.my-households'} header="Households" />
        <TiledList query={'household.invited'} header="Pending Invites" />
      </div>
    </MainLayout>
  );
};

export default Home;
