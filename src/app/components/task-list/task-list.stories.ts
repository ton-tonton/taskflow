import type { Meta, StoryObj } from '@storybook/angular';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../models/task.model';

const MOCK_TASKS: Task[] = [
  { id: 1, text: 'First task name', completed: false, createdAt: new Date() },
  { id: 2, text: 'Second task name', completed: false, createdAt: new Date() },
  { id: 3, text: 'Third task name', completed: false, createdAt: new Date() },
];

const MOCK_COMPLETED_TASKS: Task[] = [
  { id: 4, text: 'Completed task name', completed: true, createdAt: new Date() },
];

const meta: Meta<TaskListComponent> = {
  title: 'Components/TaskList',
  component: TaskListComponent,
  tags: ['autodocs'],
  argTypes: {
    tasks: { control: 'object' },
    taskToggle: { action: 'taskToggle' },
    taskDelete: { action: 'taskDelete' },
  },
};

export default meta;
type Story = StoryObj<TaskListComponent>;

export const Default: Story = {
  args: {
    title: 'TASKS',
    tasks: MOCK_TASKS,
  },
};

export const CompletedTasks: Story = {
  args: {
    title: 'COMPLETED',
    tasks: MOCK_COMPLETED_TASKS,
  },
};
