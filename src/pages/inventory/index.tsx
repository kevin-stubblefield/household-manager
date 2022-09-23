import { NextPage } from 'next';
import { MainLayout } from '../../layouts/main.layout';

const InventoryPage: NextPage = () => {
  return (
    <MainLayout
      title="Inventory"
      description="Inventory for households the user is a part of"
    >
      <p>Inventory</p>
    </MainLayout>
  );
};

export default InventoryPage;
