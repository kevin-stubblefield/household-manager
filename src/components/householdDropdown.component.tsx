import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import Loading from './loading.component';

export const HouseholdDropdown = ({
  formBinding,
  onSelect,
  hasAny,
}: {
  formBinding: UseFormRegisterReturn;
  onSelect?: (e: ChangeEvent<HTMLSelectElement>) => void;
  hasAny: boolean;
}) => {
  const { data, isLoading } = trpc.useQuery(['household.for-dropdown']);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <select
      {...formBinding}
      className="p-1 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms] h-12"
    >
      {hasAny && (
        <option key="household-dropdown-any" value="">
          Any
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
