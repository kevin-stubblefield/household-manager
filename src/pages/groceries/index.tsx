import { NextPage } from 'next';
import { MainLayout } from '../../layouts/main.layout';

const GroceriesPage: NextPage = () => {
  return (
    <MainLayout
      title="Groceries"
      description="Groceries for households the user is a part of"
    >
      <p>Groceries</p>
    </MainLayout>
  );
};

export default GroceriesPage;
