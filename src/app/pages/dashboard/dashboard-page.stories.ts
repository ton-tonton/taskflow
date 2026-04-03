import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { signal, computed } from '@angular/core';

import { DashboardPageComponent } from './dashboard-page.component';
import { TaskService } from '../../services/task.service';

/**
 * A mock version of TaskService that includes realistic interactivity
 * so the dashboard can be tested interactively in Storybook.
 */
class MockTaskService {
  private tasksState = signal([
    { id: 1, text: 'Review design spec', completed: false, createdAt: new Date() },
    { id: 2, text: 'Create Dashboard component', completed: true, createdAt: new Date() },
    { id: 3, text: 'Implement Storybook stories', completed: false, createdAt: new Date() }
  ]);
  private nextId = 4;

  readonly todayTasks = computed(() => this.tasksState().filter(t => !t.completed));
  readonly completedTasks = computed(() => this.tasksState().filter(t => t.completed));

  readonly inboxCount = computed(() => this.tasksState().filter(t => !t.completed).length);
  readonly todayCount = computed(() => this.tasksState().filter(t => !t.completed).length);
  readonly completedCount = computed(() => this.tasksState().filter(t => t.completed).length);

  addTask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.tasksState.update(ts => [{ id: this.nextId++, text: trimmed, completed: false, createdAt: new Date() }, ...ts]);
  }

  toggleTask(id: number) {
    this.tasksState.update(ts => ts.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  deleteTask(id: number) {
    this.tasksState.update(ts => ts.filter(t => t.id !== id));
  }
}

/**
 * An empty mock to demonstrate the empty state of the dashboard.
 */
class EmptyMockTaskService {
  readonly todayTasks = signal([]);
  readonly completedTasks = signal([]);
  readonly inboxCount = signal(0);
  readonly todayCount = signal(0);
  readonly completedCount = signal(0);

  addTask(text: string) {}
  toggleTask(id: number) {}
  deleteTask(id: number) {}
}

const meta: Meta<DashboardPageComponent> = {
  title: 'Pages/Dashboard',
  component: DashboardPageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: TaskService, useClass: MockTaskService }
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DashboardPageComponent>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    applicationConfig({
      providers: [
        { provide: TaskService, useClass: EmptyMockTaskService }
      ],
    }),
  ],
};
