import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DeleteTaskModalComponent } from './delete-task-modal.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<DeleteTaskModalComponent> = {
  title: 'Components/DeleteTaskModal',
  component: DeleteTaskModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  argTypes: {
    isOpen: { control: 'boolean' },
    taskId: { control: 'number' },
    confirmDelete: { action: 'confirmDelete' },
    closed: { action: 'closed' },
  },
  args: {
    isOpen: false,
    taskId: 1234,
  },
};

export default meta;
type Story = StoryObj<DeleteTaskModalComponent>;

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
        <app-delete-task-modal
          [isOpen]="isOpen"
          [taskId]="taskId"
          (closed)="handleClose()"
          (confirmDelete)="confirmDelete($event)">
        </app-delete-task-modal>
      </div>
    `,
  }),
};
