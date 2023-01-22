import { NextPage } from 'next';
import { AddTaskForm } from '../../components/forms/addTaskForm.component';
import Loading from '../../components/loading.component';
import { TableHeader } from '../../components/table.component';
import { MainLayout } from '../../layouts/main.layout';
import { trpc } from '../../utils/trpc';

const TasksPage: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['tasks.my-tasks']);

  if (isLoading) {
    return <Loading />;
  }

  const cellClass = 'text-gray-300 p-4 text-center';

  const columnHeaders = [
    'Task',
    'Notes',
    'Household',
    'Assigned To',
    'Priority',
    'Due',
  ];

  return (
    <MainLayout
      title="Tasks"
      description="Tasks for households the user is a part of"
    >
      <AddTaskForm />
      {data && data.length > 0 && (
        <table className="border-separate border-spacing-y-1 w-full">
          <TableHeader columnHeaders={columnHeaders} />
          <tbody>
            {data &&
              data.map((task) => (
                <tr key={task.id}>
                  <td className={cellClass}>{task.name}</td>
                  <td className={cellClass}>{task.notes}</td>
                  <td className={cellClass}>{task.household.name}</td>
                  <td className={cellClass}>
                    {task.user?.displayName ||
                      task.user?.name ||
                      'Not Assigned'}
                  </td>
                  <td className={cellClass}>{task.priority}</td>
                  <td className={cellClass}>
                    {task.dueDate?.toLocaleDateString('en-US', {
                      timeZone: 'UTC',
                    }) || 'N/A'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </MainLayout>
  );
};

export default TasksPage;
