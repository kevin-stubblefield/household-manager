import { TQuery, trpc } from '../utils/trpc';

type TiledListProps = {
  query: TQuery;
};

export const TiledList = ({ query }: TiledListProps) => {
  const { data, isLoading, error } = trpc.useQuery([query]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading households</p>;
  }

  return (
    <section className="p-2">
      {data && data.map((item) => <h3 key={item.id}>{item.name}</h3>)}
    </section>
  );
};
