import type { Meta, StoryObj } from '@storybook/angular';

import { fn } from 'storybook/test';

import { TaskItem } from './task-item.component';
import { Task } from '../../models/task.model';

const taskData: any = {
  task: {
    id: 1,
    text: 'Task name',
    completed: false,
    createdAt: new Date(),
  } as Task,
  taskToggle: fn(),
  taskDelete: fn()
};

const meta: Meta<TaskItem> = {
  title: 'Components/TaskItem',
  component: TaskItem,
  tags: ['autodocs'],
  argTypes: {},
  args: { ...taskData }
};

export default meta;
type Story = StoryObj<TaskItem>;

export const Default: Story = {
  args: {
    ...taskData
  }
};

export const Completed: Story = {
  args: {
    task: { ...taskData.task, completed: true }
  }
};

export const LongText: Story = {
  args: {
    task: {
      ...taskData.task,
      text: 'This is a very long task description that should wrap to the next line nicely without breaking the layout or causing the checkbox and trash icon to misalign. It is important to test long strings.'
    }
  }
};
