import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import Loading from './loading.component';

export const UserDropdown = ({
  householdId,
  formBinding,
  onSelect,
  hasEmpty,
  emptyLabel,
}: {
  householdId: string;
  formBinding: UseFormRegisterReturn;
  onSelect?: (e: ChangeEvent<HTMLSelectElement>) => void;
  hasEmpty?: boolean;
  emptyLabel?: string;
}) => {
  const { data, isLoading } = trpc.useQuery([
    'users.for-dropdown',
    { householdId },
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <select
      {...formBinding}
      onChange={onSelect}
      className="p-1 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms] h-12"
    >
      {hasEmpty && (
        <option key="user-dropdown-any" value="">
          {emptyLabel || 'Any'}
        </option>
      )}
      {data &&
        data.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
    </select>
  );
};
