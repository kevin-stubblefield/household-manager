import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HouseholdDropdown } from '../../components/householdDropdown.component';
import Loading from '../../components/loading.component';
import { UserDropdown } from '../../components/userDropdown.component';
import { MainLayout } from '../../layouts/main.layout';
import { CreateTaskInput } from '../../schemas/task.schema';
import { trpc } from '../../utils/trpc';

const AddTaskForm = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const { register, handleSubmit, reset, formState, getValues, watch } =
    useForm<CreateTaskInput>();
  const utils = trpc.useContext();
  const { mutate } = trpc.useMutation(['tasks.create-task'], {
    onSuccess() {
      utils.invalidateQueries(['tasks.my-tasks']);
    },
  });

  const watchHouseholdSelection = watch('householdId');

  const onSubmit: SubmitHandler<CreateTaskInput> = async (values) => {
    console.log(values);
    await mutate(values);
  };

  const toggleShowAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      <button
        className="p-2 mb-2 text-slate-100 bg-blue-600 rounded shadow hover:bg-blue-500 transition-all duration-[250ms]"
        onClick={toggleShowAddTaskForm}
      >
        {showAddTaskForm ? 'Hide' : 'Add Task'}
      </button>
      {showAddTaskForm && (
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Task name"
            {...register('name')}
          />
          <HouseholdDropdown
            formBinding={register('householdId')}
            hasAny={false}
          />
          {watchHouseholdSelection && (
            <UserDropdown
              hasEmpty={true}
              emptyLabel="Not Assigned"
              householdId={getValues('householdId')}
              formBinding={register('assignedTo', {
                validate: () => getValues('householdId') !== undefined,
              })}
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
    </>
  );
};

const TasksPage: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['tasks.my-tasks']);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainLayout
      title="Tasks"
      description="Tasks for households the user is a part of"
    >
      <AddTaskForm />
      {data && data.map((task) => <p key={task.id}>{task.name}</p>)}
    </MainLayout>
  );
};

export default TasksPage;
