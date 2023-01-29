import { ChangeEvent } from 'react';
import {
  RegisterOptions,
  useFormContext,
  UseFormRegisterReturn,
  useFormState,
} from 'react-hook-form';
import { inferQueryInput, TQuery, trpc } from '../../utils/trpc';
import Loading from '../loading.component';

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
  registerOptions,
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
  options?: readonly Option[];
  registerOptions?: RegisterOptions;
}) => {
  const { register, clearErrors } = useFormContext();
  const { errors } = useFormState();

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
    <>
      <select
        {...register(
          name,
          registerOptions || { required: 'Please make a selection' }
        )}
        onChange={(e) => {
          if (onSelect) {
            onSelect(e);
          }

          clearErrors(name);
        }}
        className="p-1 border-solid block border-slate-500 focus:border-slate-200 outline-none border-2 rounded transition-all duration-[200ms] h-12 bg-slate-700"
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
      {errors[name] && (
        <span className="text-red-500">{errors[name]?.message as string}</span>
      )}
    </>
  );
};
