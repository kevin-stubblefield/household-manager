import Link from 'next/link';
import { TQuery, trpc } from '../utils/trpc';

type TiledListProps = {
  query: Exclude<TQuery, 'household.get-household'>;
  header: string;
};

export const TiledList = ({ query, header }: TiledListProps) => {
  const { data, isLoading, error } = trpc.useQuery([query]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading households</p>;
  }

  return (
    <div className="p-2 mb-8">
      <h2 className="text-2xl font-thin">{header}</h2>
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
                </p>
                {item.images[0] && (
                  <img
                    className="float-right"
                    src={item.images[0].url}
                    alt={item.images[0].alt || 'Image of home'}
                  />
                )}
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
};
