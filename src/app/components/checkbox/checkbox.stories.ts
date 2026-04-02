import type { Meta, StoryObj } from '@storybook/angular';

import { fn } from 'storybook/test';

import { CheckboxComponent } from './checkbox.component';

const data = {
  checked: false,
  disabled: false,
  ariaLabel: 'Checkbox',
  checkedChange: fn()
};

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: { ...data }
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: { ...data }
};

export const Checked: Story = {
  args: {
    ...data,
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    ...data,
    checked: true,
    disabled: true
  }
};
