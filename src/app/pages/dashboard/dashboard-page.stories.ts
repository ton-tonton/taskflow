import { provideAppInitializer, inject } from '@angular/core';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { waitFor } from 'storybook/test';

import { DashboardPageComponent } from './dashboard-page.component';
import { TaskService } from '../../services/task.service';

const meta: Meta<DashboardPageComponent> = {
  title: 'Pages/Dashboard',
  component: DashboardPageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<DashboardPageComponent>;

export const Default: Story = {
  decorators: [
    applicationConfig({
      providers: [
        provideAppInitializer(() => {
          const service = inject(TaskService);
          service.addTask('Review design spec');
          service.addTask('Create Dashboard component');
          service.addTask('Implement Storybook stories');
        }),
      ],
    }),
  ],
  play: async ({ canvas, userEvent }: any) => {
    await waitFor(async () => {
      const checkbox = canvas.getByRole('checkbox', { name: 'Toggle task: Create Dashboard component' });
      await userEvent.click(checkbox);
    })
  }
};

export const Empty: Story = {};
