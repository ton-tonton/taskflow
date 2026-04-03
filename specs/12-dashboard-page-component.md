# DashboardPage Component Specification

## Overview
The top-level smart component that orchestrates the entire dashboard. Manages application state via signals, injects the TaskService, and composes all layout components directly (Sidebar and main content area).

## Figma links
@https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=24-68&m=dev

## Component Details

**Type**: Smart/Container Component (Page-level)
**File Location**: `src/app/pages/dashboard/`
**Dependencies**: Sidebar, AddTaskButton, TaskList, AddTaskModal, DeleteTaskModal, TaskService

## Props (Inputs)
None — this is a routed page component

## Outputs
None — this is the top-level component

## State

### Injected Services
```typescript
private taskService = inject(TaskService);
```

### Signals
```typescript
// Local UI state
activeView = signal<ViewType>('inbox');
```

### Derived from Service (via computed or direct signal binding)
```typescript
todayTasks = this.taskService.todayTasks;       // computed from service
completedTasks = this.taskService.completedTasks; // computed from service
navCounts = computed<NavCounts>(() => ({
  inbox: this.taskService.inboxCount(),
  today: this.taskService.todayCount(),
  completed: this.taskService.completedCount()
}));
```

## Methods
```typescript
onAddTask(text: string): void {
  this.taskService.addTask(text);
}

onToggleTask(id: string): void {
  this.taskService.toggleTask(id);
}

onDeleteTask(id: string): void {
  this.taskService.deleteTask(id);
}

onNavigate(view: ViewType): void {
  this.activeView.set(view);
}
```

## Template Structure
```html
<div class="dashboard">
  <app-side-menu
    [activeView]="activeView()"
    [navCounts]="navCounts()"
    (navItemClick)="onNavigate($event)"
  />

  <main class="main-content">
    <div class="task-sections">
      <app-add-task-button />

      <app-task-list
        title="Today's Tasks"
        [tasks]="todayTasks()"
        (taskToggle)="onToggleTask($event)"
        (taskDelete)="onDeleteTask($event)"
      />

      <app-task-list
        title="Completed Tasks"
        [tasks]="completedTasks()"
        (taskToggle)="onToggleTask($event)"
        (taskDelete)="onDeleteTask($event)"
      />
    </div>

    <!-- Modals -->
    <app-add-task-modal (taskAdd)="onAddTask($event)" />
    <app-delete-task-modal />
  </main>
</div>
```

Note: Sidebar handles its own fixed width (250px) and the main content area fills the remaining space.

- add-task-button: when click open add-task-modal
- onDeleteTask: open delete-task-modal

## Routing Setup
Register the dashboard route in `src/app/app.routes.ts`:

## Service Interaction: TaskService

The DashboardComponent consumes the TaskService:

```typescript
// TaskService API expected by DashboardComponent
@Injectable({ providedIn: 'root' })
class TaskService {
  readonly todayTasks: Signal<Task[]>;          // Incomplete tasks
  readonly completedTasks: Signal<Task[]>;      // Completed tasks
  readonly inboxCount: Signal<number>;          // Total active tasks count
  readonly todayCount: Signal<number>;          // Today's tasks count
  readonly completedCount: Signal<number>;      // Completed tasks count

  addTask(text: string): void;
  toggleTask(id: string): void;
  deleteTask(id: string): void;
}
```

See `specs/13-task-service.md` for full TaskService specification.

## Data Flow

```
User Action (e.g., check task)
        │
        ▼
app-task-item (emits taskToggle with id)
        │
        ▼
app-task-list (re-emits taskToggle)
        │
        ▼
app-main-content (re-emits taskToggle)
        │
        ▼
DashboardComponent.onToggleTask(id)
        │
        ▼
TaskService.toggleTask(id)  ← Updates signal state
        │
        ▼
TaskService.todayTasks computed re-runs
        │
        ▼
DashboardComponent.todayTasks updates
        │
        ▼
app-main-content receives updated [todayTasks]
        │
        ▼
app-task-list re-renders updated task items
        │
        ▼
app-task-item shows new visual state (OnPush)
```

## Storybook Stories
DashboardPage is a high-level smart component. Consider adding a story that demonstrates the full composition:

```typescript
const meta: Meta<DashboardComponent> = {
  title: 'Pages/Dashboard',
  component: DashboardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export const Default: Story = {};

export const WithTasks: Story = {
  // Provide mock TaskService via providers
};
```

Note: In Storybook, use `providers` to mock the `TaskService` with pre-loaded tasks to avoid needing real state management.

