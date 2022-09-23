import { NextPage } from 'next';
import { AddHouseholdForm } from '../../components/addHouseholdForm.component';
import { TiledList } from '../../components/tiledList.component';
import { MainLayout } from '../../layouts/main.layout';

const HouseholdsPage: NextPage = () => {
  return (
    <MainLayout title="Households" description="Households for the user">
      <div className="flex-1">
        <AddHouseholdForm />
        <TiledList query={'household.my-households'} header="Households" />
        <TiledList query={'household.invited'} header="Pending Invites" />
      </div>
    </MainLayout>
  );
};

export default HouseholdsPage;
