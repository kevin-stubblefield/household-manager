import { NextPage } from 'next';
import { MainLayout } from '../../layouts/main.layout';

const PetsPage: NextPage = () => {
  return (
    <MainLayout
      title="Pets"
      description="Pets that live in households the user is a part of"
    >
      <p>Pets</p>
    </MainLayout>
  );
};

export default PetsPage;
