# MainContent Component Specification

## Overview
The main content area to the right of the sidebar. Hosts the task input, and one or more task list sections depending on the active view.

## Component Details

**Type**: Layout Component
**File Location**: `src/app/components/main-content/`
**Dependencies**: TaskInput component, TaskList component

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `activeView` | `ViewType` | Yes | - | Currently active view to determine visible sections |
| `todayTasks` | `Task[]` | Yes | - | Tasks due today (incomplete) |
| `completedTasks` | `Task[]` | Yes | - | All completed tasks |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskAdd` | `string` | Emits task text when new task is submitted |
| `taskToggle` | `string` | Re-emits task id when task is toggled |
| `taskDelete` | `string` | Re-emits task id when task is deleted |

## State

### Computed Signals
```typescript
showTodayList = computed(() =>
  this.activeView() === 'inbox' || this.activeView() === 'today'
);

showCompletedList = computed(() =>
  this.activeView() === 'inbox' || this.activeView() === 'completed'
);
```

## Template Structure
```html
<main class="main-content" aria-label="Task management area">
  <!-- Task Input -->
  <app-task-input
    (taskSubmit)="taskAdd.emit($event)"
  />

  <!-- Today/Active Tasks Section -->
  @if (showTodayList()) {
    <app-task-list
      title="TASKS"
      [tasks]="todayTasks()"
      (taskToggle)="taskToggle.emit($event)"
      (taskDelete)="taskDelete.emit($event)"
    />
  }

  <!-- Completed Tasks Section -->
  @if (showCompletedList()) {
    <app-task-list
      title="COMPLETED"
      [tasks]="completedTasks()"
      (taskToggle)="taskToggle.emit($event)"
      (taskDelete)="taskDelete.emit($event)"
    />
  }
</main>
```

## Styling Strategy

### CSS Variables Used
- `--color-bg-default` (content background: warm cream #f8f6f1)
- `--spacing-md` (internal padding)
- `--spacing-lg` (top padding, gap between sections)

### CSS Classes
```css
.main-content {
  flex: 1;
  padding: 33px 61px;  /* From Figma: top 33px, left 61px */
  background: var(--color-bg-default);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [TaskInputComponent, TaskListComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent {
  activeView = input.required<ViewType>();
  todayTasks = input.required<Task[]>();
  completedTasks = input.required<Task[]>();

  taskAdd = output<string>();
  taskToggle = output<string>();
  taskDelete = output<string>();

  showTodayList = computed(() =>
    this.activeView() === 'inbox' || this.activeView() === 'today'
  );

  showCompletedList = computed(() =>
    this.activeView() === 'inbox' || this.activeView() === 'completed'
  );
}
```

## View-Based Content Visibility

| `activeView` | Shows Today List | Shows Completed List |
|--------------|------------------|----------------------|
| `'inbox'`    | ✓                | ✓                    |
| `'today'`    | ✓                | ✗                    |
| `'completed'`| ✗                | ✓                    |

## Design System Integration

### Figma Mapping
- **Background**: Same warm cream as task items (#f8f6f1)
- **Top padding**: 33px from top
- **Left padding**: 61px from left (generous offset from sidebar edge)
- **TaskInput position**: Top of main area
- **Section gap**: Large gap between TaskInput and first TaskList, and between lists
- **Content width**: 488px for task content area (matches SectionHeader width)

## Accessibility Requirements
- ✓ Uses `<main>` element with `aria-label` for primary landmark
- ✓ Landmark is distinct from sidebar `<aside>`
- ✓ `<main>` should appear once per page
- ✓ Task sections use `<section>` landmarks (via TaskList)
- ✓ Focus order: input → tasks list → completed list (logical reading order)

## Usage Examples

### Inbox view (shows all)
```html
<app-main-content
  activeView="inbox"
  [todayTasks]="todayTasks()"
  [completedTasks]="completedTasks()"
  (taskAdd)="addTask($event)"
  (taskToggle)="toggleTask($event)"
  (taskDelete)="deleteTask($event)"
/>
```

### Today view (only shows today's tasks)
```html
<app-main-content
  activeView="today"
  [todayTasks]="todayTasks()"
  [completedTasks]="completedTasks()"
  (taskAdd)="addTask($event)"
  (taskToggle)="toggleTask($event)"
  (taskDelete)="deleteTask($event)"
/>
```

## Storybook Stories

### Stories to create
1. **Inbox View** - Shows both task lists
2. **Today View** - Shows only today's tasks
3. **Completed View** - Shows only completed tasks
4. **Empty State** - No tasks in any section
5. **Full Dashboard** - Realistic data, all sections visible

### Story configuration
```typescript
const mockTasks: Task[] = [
  { id: '1', text: 'Task name', completed: false, createdAt: new Date() },
  { id: '2', text: 'Task name', completed: false, createdAt: new Date() },
  { id: '3', text: 'Task name', completed: false, createdAt: new Date() }
];

const mockCompleted: Task[] = [
  { id: '4', text: 'Task name', completed: true, createdAt: new Date() }
];

const meta: Meta<MainContentComponent> = {
  title: 'Layout/MainContent',
  component: MainContentComponent,
  tags: ['autodocs'],
  argTypes: {
    activeView: {
      control: 'radio',
      options: ['inbox', 'today', 'completed']
    }
  },
  args: {
    activeView: 'inbox',
    todayTasks: mockTasks,
    completedTasks: mockCompleted
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export const InboxView: Story = {};

export const TodayView: Story = {
  args: {
    activeView: 'today'
  }
};

export const CompletedView: Story = {
  args: {
    activeView: 'completed'
  }
};
```

## Unit Tests

### Test cases
1. ✓ Renders TaskInput component
2. ✓ Shows today tasks section when activeView is 'inbox'
3. ✓ Shows today tasks section when activeView is 'today'
4. ✓ Hides today tasks section when activeView is 'completed'
5. ✓ Shows completed tasks section when activeView is 'inbox'
6. ✓ Hides completed tasks section when activeView is 'today'
7. ✓ Shows completed tasks section when activeView is 'completed'
8. ✓ Emits taskAdd when TaskInput emits taskSubmit
9. ✓ Re-emits taskToggle from TaskList
10. ✓ Re-emits taskDelete from TaskList

### Test example
```typescript
it('should show both lists for inbox view', () => {
  const fixture = TestBed.createComponent(MainContentComponent);
  fixture.componentRef.setInput('activeView', 'inbox');
  fixture.componentRef.setInput('todayTasks', []);
  fixture.componentRef.setInput('completedTasks', []);
  fixture.detectChanges();

  const taskLists = fixture.nativeElement.querySelectorAll('app-task-list');
  expect(taskLists.length).toBe(2);
});

it('should hide completed list for today view', () => {
  const fixture = TestBed.createComponent(MainContentComponent);
  fixture.componentRef.setInput('activeView', 'today');
  fixture.componentRef.setInput('todayTasks', []);
  fixture.componentRef.setInput('completedTasks', []);
  fixture.detectChanges();

  // Check that showCompletedList computed is false
  expect(fixture.componentInstance.showCompletedList()).toBe(false);
});
```

## Implementation Notes
- Event re-emission pattern used for all task events
- Computed signals (`showTodayList`, `showCompletedList`) drive section visibility
- `@if` blocks for conditional rendering (not *ngIf)
- Padding values (33px top, 61px left) match Figma specifications

## Future Enhancements
- Search/filter bar above task lists
- Sort controls per section
- "Add section" capability
- Breadcrumb/view title heading
- Date navigation (next day, previous day)
- Loading skeleton states
