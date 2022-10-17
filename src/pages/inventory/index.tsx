import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { AddInventoryItemForm } from '../../components/forms/addInventoryItemForm.component';
import Loading from '../../components/loading.component';
import { SectionHeading } from '../../components/typography.component';
import { MainLayout } from '../../layouts/main.layout';
import { trpc } from '../../utils/trpc';

const InventoryPage: NextPage = () => {
  const { data: session } = useSession();

  const { data, isLoading } = trpc.useQuery(['inventory.my-inventory']);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainLayout
      title="Inventory"
      description="Inventory for households the user is a part of"
    >
      <SectionHeading>Inventory</SectionHeading>

      <AddInventoryItemForm userId={session?.user?.id} />

      {data && data.map((item) => <p key={item.id}>{item.name}</p>)}
    </MainLayout>
  );
};

export default InventoryPage;
