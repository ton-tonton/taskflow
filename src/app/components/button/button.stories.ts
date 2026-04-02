import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'outline', 'error']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset']
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button'
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [type]="type" (clicked)="clicked($event)">Button</app-button>`
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline'
  },
};

export const Error: Story = {
  args: {
    variant: 'error'
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'primary'
  }
};
