import { useState } from 'react';
import { CreateInventoryItemInput } from '../../schemas/inventory.schema';
import { GeneralForm, SubmitButton, Input } from './generalForm.component';

export function AddInventoryItemForm({ userId }: { userId?: string }) {
  const [showAddInventoryItemForm, setShowAddInventoryItemForm] =
    useState(false);

  const toggleAddInventoryItemForm = () => {
    setShowAddInventoryItemForm(!showAddInventoryItemForm);
  };

  return (
    <>
      <button
        className="p-2 mb-2 text-slate-100 bg-blue-600 rounded shadow hover:bg-blue-500 transition-all duration-[250ms]"
        onClick={toggleAddInventoryItemForm}
      >
        {showAddInventoryItemForm ? 'Hide' : 'Add to Inventory'}
      </button>

      {showAddInventoryItemForm && (
        <GeneralForm<CreateInventoryItemInput>
          mutation="inventory.create-item"
          invalidateQuery="inventory.my-inventory"
          defaultValues={{ quantity: 1 }}
        >
          <Input name="name" placeholderText="Item name" labelText="Name" />
          <Input
            name="userId"
            placeholderText=""
            type="hidden"
            registerOptions={{ setValueAs: (v) => userId || '' }}
          />
          <Input
            type="number"
            name="quantity"
            placeholderText="1"
            labelText="Quantity"
            registerOptions={{
              valueAsNumber: true,
              min: { value: 1, message: 'Value cannot be less than 1' },
            }}
          />
          <Input
            name="unit"
            placeholderText="unit"
            labelText="Unit"
            registerOptions={{ required: false }}
          />
          <Input
            name="serialNo"
            placeholderText="Serial number"
            labelText="Serial Number"
            registerOptions={{ required: false }}
          />
          <Input
            name="modelNo"
            placeholderText="Model number"
            labelText="Model Number"
            registerOptions={{ required: false }}
          />
          <Input
            type="date"
            name="purchaseDate"
            placeholderText="Purchase date"
            labelText="Purchase Date"
            registerOptions={{
              setValueAs: (v) =>
                v === '' || v === null ? undefined : new Date(Date.parse(v)),
            }}
          />
          <Input
            name="purchasePrice"
            placeholderText="Purchase price"
            labelText="Purchase Price"
            registerOptions={{
              min: { value: 0, message: 'Value cannot be less than 0' },
              setValueAs: (v) => (v === '' ? undefined : parseFloat(v)),
            }}
          />
          <SubmitButton text="Add Item" />
        </GeneralForm>
      )}
    </>
  );
}
