import { useState } from 'react';
import { CreateHouseholdInput } from '../../schemas/household.schema';
import { GeneralForm, SubmitButton, Input } from './generalForm.component';

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
          <Input
            name="name"
            placeholderText="Household name"
            labelText="Name"
          />
          <Input
            name="addressLine1"
            placeholderText="Address line 1"
            labelText="Address Line 1"
          />
          <Input
            name="addressLine2"
            placeholderText="Address line 2"
            labelText="Address Line 2"
          />
          <Input name="city" placeholderText="City" labelText="City" />
          <Input
            name="state"
            placeholderText="State"
            labelText="State"
            registerOptions={{
              required: 'Field is required',
              maxLength: { value: 2, message: 'Field must be 2 letters long' },
              minLength: { value: 2, message: 'Field must be 2 letters long' },
            }}
          />
          <Input
            name="zipCode"
            placeholderText="Zip Code"
            labelText="Zip Code"
            registerOptions={{
              required: 'Field is required',
              maxLength: { value: 5, message: 'Field must be 5 letters long' },
              minLength: { value: 5, message: 'Field must be 5 letters long' },
            }}
          />
          <SubmitButton text="Add New Household" />
        </GeneralForm>
      )}
    </>
  );
};
