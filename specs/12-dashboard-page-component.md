# DashboardPage Component Specification

## Overview
The top-level smart component that orchestrates the entire dashboard. Manages application state via signals, injects the TaskService, and composes all layout components.

## Component Details

**Type**: Smart/Container Component (Page-level)
**File Location**: `src/app/pages/dashboard/`
**Dependencies**: Sidebar, MainContent, TaskService

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
  <app-sidebar
    [activeView]="activeView()"
    [navCounts]="navCounts()"
    (navItemClick)="onNavigate($event)"
  />

  <app-main-content
    [activeView]="activeView()"
    [todayTasks]="todayTasks()"
    [completedTasks]="completedTasks()"
    (taskAdd)="onAddTask($event)"
    (taskToggle)="onToggleTask($event)"
    (taskDelete)="onDeleteTask($event)"
  />
</div>
```

## Styling Strategy

### CSS Classes
```css
.dashboard {
  display: flex;
  min-height: 100vh;
  background: var(--color-bg-default);
}
```

Note: Sidebar handles its own fixed width (250px) and the main content area fills the remaining space.

## Component Configuration
```typescript
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, MainContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private taskService = inject(TaskService);

  // Local UI state
  activeView = signal<ViewType>('inbox');

  // Derived from service
  todayTasks = this.taskService.todayTasks;
  completedTasks = this.taskService.completedTasks;

  navCounts = computed<NavCounts>(() => ({
    inbox: this.taskService.inboxCount(),
    today: this.taskService.todayCount(),
    completed: this.taskService.completedCount()
  }));

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
}
```

## Routing Setup
Register the dashboard route in `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      )
  }
];
```

Lazy loading ensures the dashboard bundle is only loaded when the route is accessed.

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

## Smart vs Presentational Separation

| Responsibility | DashboardComponent | Child Components |
|---------------|-------------------|------------------|
| State management | ✓ via TaskService | ✗ |
| Business logic | ✓ toggle/add/delete | ✗ |
| Visual rendering | Minimal | ✓ |
| Data derivation | ✓ computed signals | ✓ derived computeds |
| User interactions | Handles events | Emits events |

## Accessibility Requirements
- ✓ Page has logical structure: sidebar + main
- ✓ Skip-to-content link (optional, recommended for keyboard users)
- ✓ Page title updates with route (via `<title>` tag or Angular `Title` service)
- ✓ Focus management on navigation change
- ✓ All landmarks properly labelled

## Usage
This component is used as a routed page component. Not intended for direct embedding.

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

## Unit Tests

### Test cases
1. ✓ Renders Sidebar component
2. ✓ Renders MainContent component
3. ✓ Passes activeView to Sidebar and MainContent
4. ✓ Passes navCounts to Sidebar
5. ✓ Calls taskService.addTask when taskAdd emitted
6. ✓ Calls taskService.toggleTask when taskToggle emitted
7. ✓ Calls taskService.deleteTask when taskDelete emitted
8. ✓ Updates activeView signal on navigation
9. ✓ todayTasks derives from taskService.todayTasks
10. ✓ completedTasks derives from taskService.completedTasks

### Test example
```typescript
it('should call taskService.addTask when task is added', () => {
  const mockTaskService = {
    todayTasks: signal([]),
    completedTasks: signal([]),
    inboxCount: signal(0),
    todayCount: signal(0),
    completedCount: signal(0),
    addTask: jasmine.createSpy('addTask'),
    toggleTask: jasmine.createSpy('toggleTask'),
    deleteTask: jasmine.createSpy('deleteTask')
  };

  TestBed.configureTestingModule({
    providers: [
      { provide: TaskService, useValue: mockTaskService }
    ]
  });

  const fixture = TestBed.createComponent(DashboardComponent);
  fixture.componentInstance.onAddTask('Buy groceries');

  expect(mockTaskService.addTask).toHaveBeenCalledWith('Buy groceries');
});
```

## Implementation Notes
- Smart component: only manages state and service delegation
- All visual logic is pushed to presentational components
- Lazy loads via `loadComponent` for optimized bundle size
- Uses `inject()` instead of constructor injection
- Signal bindings are direct references to service signals (not copies)

## Future Enhancements
- Multi-page routing (settings, profile)
- Keyboard shortcut handler at this level
- Global search functionality
- Toast notifications for task actions
- Undo/redo system for task operations
