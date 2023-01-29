import { NextPage } from 'next';
import { useState } from 'react';
import { AddTaskForm } from '../../components/forms/addTaskForm.component';
import { Input } from '../../components/forms/generalForm.component';
import Loading from '../../components/loading.component';
import { TableHeader } from '../../components/table.component';
import { MainLayout } from '../../layouts/main.layout';
import { trpc } from '../../utils/trpc';

const TasksPage: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['tasks.my-tasks']);
  const utils = trpc.useContext();
  const { mutate: deleteTask } = trpc.useMutation(['tasks.delete-task'], {
    onSuccess() {
      utils.invalidateQueries('tasks.my-tasks');
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const cellClass = 'text-gray-300 p-4 text-center';

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const columnHeaders = [
    'Actions',
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
                  <td className={cellClass}>
                    <EditIcon handleClick={toggleEditing} />{' '}
                    <DeleteIcon
                      handleClick={() => {
                        if (
                          confirm('Are you sure you want to delete this task?')
                        ) {
                          deleteTask({ taskId: task.id });
                        }
                      }}
                    />
                  </td>
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

export const EditIcon = ({ handleClick }: { handleClick: any }) => {
  return (
    <svg
      onClick={handleClick}
      className="inline transition-all duration-300 hover:cursor-pointer fill-teal-600 hover:fill-teal-400"
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="#fff"
    >
      <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z" />
    </svg>
  );
};

export const DeleteIcon = ({ handleClick }: { handleClick: any }) => {
  return (
    <svg
      onClick={handleClick}
      className="inline transition-all duration-300 hover:cursor-pointer fill-pink-600 hover:fill-pink-400"
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="#fff"
    >
      <path d="M 11.5 -0.03125 C 9.542969 -0.03125 7.96875 1.59375 7.96875 3.5625 L 7.96875 4 L 4 4 C 3.449219 4 3 4.449219 3 5 L 3 6 L 2 6 L 2 8 L 4 8 L 4 23 C 4 24.644531 5.355469 26 7 26 L 19 26 C 20.644531 26 22 24.644531 22 23 L 22 8 L 24 8 L 24 6 L 23 6 L 23 5 C 23 4.449219 22.550781 4 22 4 L 18.03125 4 L 18.03125 3.5625 C 18.03125 1.59375 16.457031 -0.03125 14.5 -0.03125 Z M 11.5 2.03125 L 14.5 2.03125 C 15.304688 2.03125 15.96875 2.6875 15.96875 3.5625 L 15.96875 4 L 10.03125 4 L 10.03125 3.5625 C 10.03125 2.6875 10.695313 2.03125 11.5 2.03125 Z M 6 8 L 11.125 8 C 11.25 8.011719 11.371094 8.03125 11.5 8.03125 L 14.5 8.03125 C 14.628906 8.03125 14.75 8.011719 14.875 8 L 20 8 L 20 23 C 20 23.5625 19.5625 24 19 24 L 7 24 C 6.4375 24 6 23.5625 6 23 Z M 8 10 L 8 22 L 10 22 L 10 10 Z M 12 10 L 12 22 L 14 22 L 14 10 Z M 16 10 L 16 22 L 18 22 L 18 10 Z" />
    </svg>
  );
};

export default TasksPage;
