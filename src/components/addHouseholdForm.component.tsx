import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateHouseholdInput } from '../schemas/household.schema';
import { trpc } from '../utils/trpc';

export const AddHouseholdForm = () => {
  const [showAddHouseholdForm, setShowAddHouseholdForm] = useState(false);

  const { register, handleSubmit, reset, formState } =
    useForm<CreateHouseholdInput>();
  const utils = trpc.useContext();
  const { mutate } = trpc.useMutation(['household.create-household'], {
    onSuccess() {
      utils.invalidateQueries(['household.my-households']);
    },
  });

  const onSubmit: SubmitHandler<CreateHouseholdInput> = async (values) => {
    await mutate(values);
  };

  const toggleShowAddHouseholdForm = () => {
    setShowAddHouseholdForm(!showAddHouseholdForm);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <div className="p-2">
      <button
        className="p-2 mb-2 text-slate-100 bg-blue-600 rounded-lg drop-shadow-md hover:bg-blue-500 transition-all duration-[250ms]"
        onClick={toggleShowAddHouseholdForm}
      >
        {showAddHouseholdForm ? 'Hide' : 'Add Household'}
      </button>
      {showAddHouseholdForm && (
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Household name"
            {...register('name')}
          />
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Address line 1"
            {...register('addressLine1')}
          />
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Address line 2"
            {...register('addressLine2')}
          />
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="City"
            {...register('city')}
          />
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="State"
            {...register('state')}
          />
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Zip Code"
            {...register('zipCode')}
          />
          <button
            className="p-2 mb-2 text-slate-100 bg-green-600 rounded drop-shadow-md hover:bg-green-500 transition-all duration-[250ms]"
            type="submit"
          >
            Add New Household
          </button>
        </form>
      )}
    </div>
  );
};
