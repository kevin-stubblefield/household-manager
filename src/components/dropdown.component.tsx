import { ChangeEvent } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';
import { inferQueryInput, TQuery, trpc } from '../utils/trpc';
import Loading from './loading.component';

export type Option = {
  id: string;
  name: string;
};

export const Dropdown = ({
  onSelect,
  hasEmpty,
  emptyLabel,
  name,
  query,
  queryParams,
  options,
}: {
  onSelect?: (e: ChangeEvent<HTMLSelectElement>) => void;
  hasEmpty?: boolean;
  emptyLabel?: string;
  name: string;
  query?: Extract<TQuery, 'household.for-dropdown' | 'users.for-dropdown'>;
  queryParams?: Exclude<
    inferQueryInput<
      Extract<TQuery, 'household.for-dropdown' | 'users.for-dropdown'>
    >,
    void
  >;
  options?: Option[];
}) => {
  const { register } = useFormContext();

  let fetchedOptions;
  if (query) {
    const { data, isLoading } = trpc.useQuery([query, queryParams]);

    if (isLoading) {
      return (
        <div>
          <select>
            <option key="loading" value="">
              Loading...
            </option>
          </select>
        </div>
      );
    }

    fetchedOptions = data;
  }

  return (
    <select
      {...register(name)}
      onChange={onSelect}
      className="p-1 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms] h-12"
    >
      {hasEmpty && (
        <option key={`${name}-dropdown-any`} value="">
          {emptyLabel || 'Any'}
        </option>
      )}
      {options &&
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      {fetchedOptions &&
        fetchedOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
    </select>
  );
};
