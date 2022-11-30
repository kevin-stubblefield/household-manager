import { useState } from 'react';
import {
  CreateTaskInput,
  CreateTaskRecurrenceInput,
} from '../../schemas/task.schema';
import { Dropdown, Option } from './dropdown.component';
import {
  GeneralForm,
  SubmitButton,
  Input,
  TextArea,
} from './generalForm.component';

export function AddTaskForm() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showRecurringTaskForm, setShowRecurringTaskForm] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');

  const toggleShowAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  const toggleShowRecurringTaskForm = () => {
    setShowRecurringTaskForm(!showRecurringTaskForm);
  };

  const frequencyOptions = [
    { id: 'DAILY', name: 'Daily' },
    { id: 'WEEKLY', name: 'Weekly' },
  ];

  return (
    <>
      <button
        className="p-2 mb-2 text-slate-100 bg-blue-600 rounded shadow hover:bg-blue-500 transition-all duration-[250ms]"
        onClick={toggleShowAddTaskForm}
      >
        {showAddTaskForm ? 'Hide' : 'Add Task'}
      </button>
      {showAddTaskForm && (
        <GeneralForm<CreateTaskInput & CreateTaskRecurrenceInput>
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
            placeholderText="3"
            labelText="Priority"
            registerOptions={{
              setValueAs: (value: string) =>
                value === '' ? undefined : +value,
              required: false,
              min: { value: 1, message: 'Cannot be lower than 1' },
              max: { value: 3, message: 'Cannot be higher than 3' },
            }}
          />
          <Input
            name="dueDate"
            type="date"
            labelText="Due Date"
            registerOptions={{ required: false, valueAsDate: true }}
          />
          <Input
            name="isRecurring"
            type="checkbox"
            labelText="Recurring?"
            onChange={() => toggleShowRecurringTaskForm()}
            registerOptions={{ required: false }}
          />
          {showRecurringTaskForm && (
            <>
              <Dropdown
                name="frequency"
                hasEmpty={false}
                options={frequencyOptions}
                onSelect={(e) => {
                  setSelectedFrequency(e.currentTarget.value);
                }}
                registerOptions={{ required: false }}
              />
              <Input
                name="interval"
                placeholderText="1"
                labelText="Interval (Every # days/weeks)"
                registerOptions={{
                  required: false,
                  max: { value: 31, message: 'Must not be greater than 31' },
                  min: { value: 1, message: 'Must not be less than 1' },
                }}
              />
              {selectedFrequency === 'WEEKLY' && (
                <Dropdown
                  name="byDay"
                  hasEmpty={false}
                  options={getByDayOptions()}
                />
              )}
              <Input
                name="startDate"
                type="date"
                labelText="Start Date"
                registerOptions={{ required: false, valueAsDate: true }}
              />
              <Input
                name="endDate"
                type="date"
                labelText="End Date"
                registerOptions={{ required: false, valueAsDate: true }}
              />
            </>
          )}
          <SubmitButton text="Add New Task" />
        </GeneralForm>
      )}
    </>
  );
}

function getByDayOptions(): Option[] {
  let options: Option[] = [
    { id: 'SU', name: 'Sunday' },
    { id: 'MO', name: 'Monday' },
    { id: 'TU', name: 'Tuesday' },
    { id: 'WE', name: 'Wednesday' },
    { id: 'TH', name: 'Thursday' },
    { id: 'FR', name: 'Friday' },
    { id: 'SA', name: 'Saturday' },
  ];
  return options;
}
