import { useState } from 'react';
import { CreateTaskInput } from '../../schemas/task.schema';
import { Dropdown } from './dropdown.component';
import {
  GeneralForm,
  SubmitButton,
  Input,
  TextArea,
} from './generalForm.component';

export function AddTaskForm() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState('');

  const toggleShowAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  return (
    <>
      <button
        className="p-2 mb-2 text-slate-100 bg-blue-600 rounded shadow hover:bg-blue-500 transition-all duration-[250ms]"
        onClick={toggleShowAddTaskForm}
      >
        {showAddTaskForm ? 'Hide' : 'Add Task'}
      </button>
      {showAddTaskForm && (
        <GeneralForm<CreateTaskInput>
          mutation="tasks.create-task"
          invalidateQuery="tasks.my-tasks"
        >
          <Input name="name" placeholderText="Task name" labelText="Name" />
          <Dropdown
            name="householdId"
            hasEmpty={true}
            emptyLabel="Select Household"
            query="household.for-dropdown"
            onSelect={(e) => {
              setSelectedHousehold(e.currentTarget.value);
            }}
          />
          {selectedHousehold && (
            <Dropdown
              name="assignedTo"
              hasEmpty={true}
              emptyLabel="Not Assigned"
              query="users.for-dropdown"
              queryParams={{ householdId: selectedHousehold }}
              registerOptions={{ required: false }}
            />
          )}
          <TextArea
            name="notes"
            placeholderText="Notes"
            labelText="Notes"
            registerOptions={{ required: false }}
          />
          <Input
            name="priority"
            value="3"
            placeholderText="3"
            labelText="Priority"
            registerOptions={{
              valueAsNumber: true,
              required: false,
              min: { value: 1, message: 'Cannot be lower than 1' },
              max: { value: 3, message: 'Cannot be higher than 3' },
            }}
          />
          <SubmitButton text="Add New Task" />
        </GeneralForm>
      )}
    </>
  );
}
