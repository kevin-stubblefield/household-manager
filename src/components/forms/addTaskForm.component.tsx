import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { CreateTaskInput } from '../../schemas/task.schema';
import { trpc } from '../../utils/trpc';
import { Dropdown } from '../dropdown.component';

export function AddTaskForm() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState('');

  const methods = useForm<CreateTaskInput>();
  const { register, handleSubmit, reset, formState } = methods;
  const utils = trpc.useContext();
  const { mutate } = trpc.useMutation(['tasks.create-task'], {
    onSuccess() {
      utils.invalidateQueries(['tasks.my-tasks']);
    },
  });

  const onSubmit: SubmitHandler<CreateTaskInput> = async (values) => {
    await mutate(values);
  };

  const toggleShowAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <FormProvider {...methods}>
      <button
        className="p-2 mb-2 text-slate-100 bg-blue-600 rounded shadow hover:bg-blue-500 transition-all duration-[250ms]"
        onClick={toggleShowAddTaskForm}
      >
        {showAddTaskForm ? 'Hide' : 'Add Task'}
      </button>
      {showAddTaskForm && (
        <form className="space-y-2 mb-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Task name"
            {...register('name')}
          />
          <Dropdown
            name="householdId"
            hasEmpty={true}
            emptyLabel="Select Household"
            query="household.for-dropdown"
            onSelect={(e) => {
              setSelectedHousehold(e.currentTarget.value);
            }}
          />
          {selectedHousehold && (
            <Dropdown
              name="assignedTo"
              hasEmpty={true}
              emptyLabel="Not Assigned"
              query="users.for-dropdown"
              queryParams={{ householdId: selectedHousehold }}
            />
          )}
          <button
            className="p-2 mb-2 text-slate-100 bg-green-600 rounded shadow-md hover:bg-green-500 transition-all duration-[250ms]"
            type="submit"
          >
            Add New Task
          </button>
        </form>
      )}
    </FormProvider>
  );
}
