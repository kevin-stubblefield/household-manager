import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AddInventoryItemForm } from '../../components/forms/addInventoryItemForm.component';
import Loading from '../../components/loading.component';
import { TableHeader } from '../../components/table.component';
import { SectionHeading } from '../../components/typography.component';
import { MainLayout } from '../../layouts/main.layout';
import { trpc } from '../../utils/trpc';

const InventoryPage: NextPage = () => {
  const { data: session } = useSession();
  const [showChildren, setShowChildren] = useState(new Set<string>());

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
        <tbody>
          {data &&
            data.map((item) => (
              <>
                <tr
                  key={item.id}
                  onClick={() => {
                    setShowChildren((prev) => {
                      const next = new Set(prev);
                      return next.delete(item.id) ? next : next.add(item.id);
                    });
                  }}
                >
                  <td className={cellClass}>{item.name}</td>
                  <td
                    className={cellClass}
                  >{`${item.quantity} ${item.unit}`}</td>
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
                {showChildren.has(item.id) &&
                  item.parts &&
                  item.parts.length > 0 &&
                  item.parts.map((part) => (
                    <tr key={part.id}>
                      <td className={cellClass + ' pl-8'}>{part.name}</td>
                      <td
                        className={cellClass}
                      >{`${part.quantity} ${part.unit}`}</td>
                      <td className={cellClass}>{part.serialNo}</td>
                      <td className={cellClass}>{part.modelNo}</td>
                      <td className={cellClass}>
                        {part.purchaseDate?.toLocaleDateString()}
                      </td>
                      <td className={cellClass}>
                        {/* I really hate this */}
                        {(part.purchasePrice &&
                          new Prisma.Decimal(
                            part.purchasePrice as Prisma.Decimal
                          ).toFixed(2)) ||
                          ''}
                      </td>
                    </tr>
                  ))}
              </>
            ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default InventoryPage;
