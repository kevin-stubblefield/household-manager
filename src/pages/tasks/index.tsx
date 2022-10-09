import { NextPage } from 'next';
import { AddTaskForm } from '../../components/forms/addTaskForm.component';
import Loading from '../../components/loading.component';
import { MainLayout } from '../../layouts/main.layout';
import { trpc } from '../../utils/trpc';

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
