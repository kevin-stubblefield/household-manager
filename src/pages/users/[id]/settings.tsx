import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MainLayout } from '../../../layouts/main.layout';

const SettingsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || session.user?.id !== id) {
      router.push('/');
    }
  }, []);

  return (
    <MainLayout title="Settings" description="Settings for user">
      <p>Settings</p>
    </MainLayout>
  );
};

export default SettingsPage;
