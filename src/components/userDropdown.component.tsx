import { ChangeEvent } from 'react';
import { trpc } from '../utils/trpc';

export const UserDropdown = ({
  householdId,
  onSelect,
}: {
  householdId: string;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { data, isLoading } = trpc.useQuery([
    'users.household-users',
    { householdId },
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <select
      onChange={onSelect}
      className="p-1 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms] h-12"
    >
      <option key="user-dropdown-any" value="">
        Any
      </option>
      {data &&
        data.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
    </select>
  );
};
