import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { AddInventoryItemForm } from '../../components/forms/addInventoryItemForm.component';
import Loading from '../../components/loading.component';
import { TableHeader } from '../../components/table.component';
import { SectionHeading } from '../../components/typography.component';
import { MainLayout } from '../../layouts/main.layout';
import { trpc } from '../../utils/trpc';

const InventoryPage: NextPage = () => {
  const { data: session } = useSession();

  const { data, isLoading } = trpc.useQuery(['inventory.my-inventory']);

  const cellClass = 'border border-slate-500 p-2';

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

      <table className="border-collapse border border-slate-500 w-full">
        <TableHeader
          columnHeaders={[
            'Item',
            'Quantity',
            'Serial #',
            'Model #',
            'Purchase Date',
            'Purchase Price',
          ]}
        />
        {data &&
          data.map((item) => (
            <tr key={item.id}>
              <td className={cellClass}>{item.name}</td>
              <td className={cellClass}>{`${item.quantity} ${item.unit}`}</td>
              <td className={cellClass}>{item.serialNo}</td>
              <td className={cellClass}>{item.modelNo}</td>
              <td className={cellClass}>
                {item.purchaseDate?.toLocaleDateString()}
              </td>
              <td className={cellClass}>
                {/* I really hate this */}
                {(item.purchasePrice &&
                  new Prisma.Decimal(
                    item.purchasePrice as Prisma.Decimal
                  ).toFixed(2)) ||
                  ''}
              </td>
            </tr>
          ))}
      </table>
    </MainLayout>
  );
};

export default InventoryPage;
