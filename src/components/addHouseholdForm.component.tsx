import { useState } from 'react';
import { CreateHouseholdInput } from '../schemas/household.schema';
import {
  GeneralForm,
  SubmitButton,
  TextInput,
} from './forms/generalForm.component';

export const AddHouseholdForm = () => {
  const [showAddHouseholdForm, setShowAddHouseholdForm] = useState(false);

  const toggleShowAddHouseholdForm = () => {
    setShowAddHouseholdForm(!showAddHouseholdForm);
  };

  return (
    <>
      <button
        className="p-2 mb-2 text-slate-100 bg-blue-600 rounded shadow hover:bg-blue-500 transition-all duration-[250ms]"
        onClick={toggleShowAddHouseholdForm}
      >
        {showAddHouseholdForm ? 'Hide' : 'Add Household'}
      </button>
      {showAddHouseholdForm && (
        <GeneralForm<CreateHouseholdInput>
          mutation="household.create-household"
          invalidateQuery="household.my-households"
        >
          <TextInput name="name" placeholderText="Household name" />
          <TextInput name="addressLine1" placeholderText="Address line 1" />
          <TextInput name="addressLine2" placeholderText="Address line 2" />
          <TextInput name="city" placeholderText="City" />
          <TextInput name="state" placeholderText="State" />
          <TextInput name="zipCode" placeholderText="Zip Code" />
          <SubmitButton text="Add New Household" />
        </GeneralForm>
      )}
    </>
  );
};
