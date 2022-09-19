import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const Household: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading } = trpc.useQuery([
    'household.get-household',
    { id },
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>{data?.name}</h2>
    </>
  );
};

export default Household;
