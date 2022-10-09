import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loading from '../../../components/loading.component';
import { MainLayout } from '../../../layouts/main.layout';
import { UpdateSettingsInput } from '../../../schemas/user.schema';
import { trpc } from '../../../utils/trpc';

const SettingsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const { mutate } = trpc.useMutation(['users.update-settings'], {
    onSuccess() {
      utils.invalidateQueries(['users.get-settings']);
    },
  });
  const { data, isLoading } = trpc.useQuery(['users.get-settings']);
  const { handleSubmit, register } = useForm<UpdateSettingsInput>();

  const onSubmit: SubmitHandler<UpdateSettingsInput> = async (values) => {
    await mutate(values);
  };

  useEffect(() => {
    if (!session || session.user?.id !== id) {
      router.push('/');
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainLayout title="Settings" description="Settings for user">
      <h2 className="text-2xl font-thin mb-2">Settings</h2>
      {data && (
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Image URL"
            {...register('image', { value: data.image || '' })}
          />
          <input
            className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
            placeholder="Display Name"
            {...register('displayName', { value: data.displayName || '' })}
          />
          <button
            className="p-2 mb-2 text-slate-100 bg-green-600 rounded shadow-md hover:bg-green-500 transition-all duration-[250ms]"
            type="submit"
          >
            Save
          </button>
        </form>
      )}
    </MainLayout>
  );
};

export default SettingsPage;
