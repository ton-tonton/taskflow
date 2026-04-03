import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { AddTaskButton } from './add-task-button.component';

const meta: Meta<AddTaskButton> = {
  title: 'Components/AddTaskButton',
  component: AddTaskButton,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text displayed inside the button',
    },
    clicked: {
      action: 'clicked',
      description: 'Event emitted when the button is clicked',
    }
  },
  args: {
    text: 'Add new task',
    clicked: fn()
  }
};

export default meta;
type Story = StoryObj<AddTaskButton>;

export const Default: Story = {
  args: {}
};

export const CustomText: Story = {
  args: {
    text: 'Add another to-do item',
  }
};
