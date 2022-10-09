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

  const cellClass = 'border border-slate-500 p-2';

  return (
    <MainLayout
      title="Tasks"
      description="Tasks for households the user is a part of"
    >
      <AddTaskForm />
      <table className="border-collapse border border-slate-500 w-full">
        <thead>
          <tr>
            <th className={cellClass}>Task</th>
            <th className={cellClass}>Household</th>
            <th className={cellClass}>Assigned To</th>
            <th className={cellClass}>Priority</th>
            <th className={cellClass}>Due</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((task) => (
              <tr key={task.id}>
                <td className={cellClass}>{task.name}</td>
                <td className={cellClass}>{task.household.name}</td>
                <td className={cellClass}>
                  {task.user?.displayName || task.user?.name || 'Not Assigned'}
                </td>
                <td className={cellClass}>{task.priority}</td>
                <td className={cellClass}>
                  {task.dueDate?.toLocaleDateString() || 'N/A'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default TasksPage;
