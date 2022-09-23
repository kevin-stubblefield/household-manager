import { NextPage } from 'next';
import { Sidebar } from '../../components/sidebar.component';
import { MainLayout } from '../../layouts/main.layout';

const TasksPage: NextPage = () => {
  return (
    <MainLayout
      title="Tasks"
      description="Tasks for households the user is a part of"
    >
      <p>Tasks</p>
    </MainLayout>
  );
};

export default TasksPage;
