import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AddTaskModalComponent } from './add-task-modal.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<AddTaskModalComponent> = {
  title: 'Components/AddTaskModal',
  component: AddTaskModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  argTypes: {
    isOpen: { control: 'boolean' },
    taskAdded: { action: 'taskAdded' },
    closed: { action: 'closed' },
  },
  args: {
    isOpen: false,
  },
};

export default meta;
type Story = StoryObj<AddTaskModalComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      toggleOpen: function() {
        this['isOpen'] = true;
      },
      handleClose: function() {
        this['isOpen'] = false;
        if (this['closed']) {
          this['closed']();
        }
      }
    },
    template: `
      <div class="flex items-start justify-start p-8">
        <app-button variant="primary" (clicked)="toggleOpen()">Open modal</app-button>
        <app-add-task-modal
          [isOpen]="isOpen"
          (closed)="handleClose()"
          (taskAdded)="taskAdded($event)">
        </app-add-task-modal>
      </div>
    `,
  }),
};
