import Link from 'next/link';
import { TQuery, trpc } from '../utils/trpc';
import Loading from './loading.component';
import { SectionHeading } from './typography.component';

type TiledListProps = {
  query: Extract<TQuery, 'household.my-households' | 'household.invited'>;
  header: string;
};

export const TiledList = ({ query, header }: TiledListProps) => {
  const { data, isLoading, error } = trpc.useQuery([query]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error loading households</p>;
  }

  return (
    <div className="mb-8">
      <SectionHeading>{header}</SectionHeading>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        {data &&
          data.map((item) => (
            <Link
              key={item.id}
              href={{
                pathname: 'households/[id]',
                query: { id: item.id },
              }}
            >
              <div className="p-4 cursor-pointer shadow-md rounded-lg transition-all duration-[250ms] hover:shadow-lg hover:translate-y-0.5">
                <h3 className="text-lg">{item.name}</h3>
                <p>
                  {item.addressLine1 +
                    `${item.addressLine2 ? ', ' + item.addressLine2 : ''}`}
                  {item.images[0] && (
                    <img
                      className="max-w-[25%] float-right"
                      src={item.images[0].url}
                      alt={item.images[0].alt || 'Image of home'}
                    />
                  )}
                </p>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
};
