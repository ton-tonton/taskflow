# TaskList Component Specification

## Overview
A grouped list of task items with a section header. Composes SectionHeader and TaskItem components to create cohesive task sections.

## Component Details

**Type**: Layout Component
**File Location**: `src/app/components/task-list/`
**Dependencies**: SectionHeader component, TaskItem component

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Section title (e.g., "TASKS", "COMPLETED") |
| `tasks` | `Task[]` | Yes | - | Array of tasks to display |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskToggle` | `string` | Re-emits task id from child TaskItem |
| `taskDelete` | `string` | Re-emits task id from child TaskItem |

## State

### Computed Signals
```typescript
taskCount = computed(() => this.tasks().length);
```

## Template Structure
```html
<section class="task-list" aria-label="{{ title() }} section">
  <app-section-header
    [title]="title()"
    [count]="taskCount()"
  />

  <div class="task-list__items">
    @for (task of tasks(); track task.id) {
      <app-task-item
        [task]="task"
        (taskToggle)="taskToggle.emit($event)"
        (taskDelete)="taskDelete.emit($event)"
      />
    } @empty {
      <p class="task-list__empty">No tasks in this section</p>
    }
  </div>
</section>
```

## Styling Strategy

### CSS Variables Used
- `--spacing-sm` (gap between task items: 8px)
- `--font-size-sm` (empty state text size)
- `--color-text-secondary` (empty state text color)

### CSS Classes
```css
.task-list {
  display: flex;
  flex-direction: column;
}

.task-list__items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);  /* 8px gap between task items */
  margin-top: var(--spacing-sm);
}

.task-list__empty {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
  padding: var(--spacing-md) 0;
  font-style: italic;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SectionHeaderComponent, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  title = input.required<string>();
  tasks = input.required<Task[]>();

  taskToggle = output<string>();
  taskDelete = output<string>();

  taskCount = computed(() => this.tasks().length);
}
```

## Design System Integration

### Figma Mapping
- Task items are stacked vertically with consistent spacing
- Section header appears above the task list
- Two sections shown in Figma: "TASKS" (3 items) and "COMPLETED" (1 item)
- Empty state not shown in Figma but needed for complete component

## Accessibility Requirements
- ✓ Uses `<section>` with `aria-label` for screen reader context
- ✓ Section heading provided via SectionHeader (h2)
- ✓ Empty state message accessible via paragraphs
- ✓ Task items in list retain keyboard accessibility
- ✓ `track task.id` in @for loop ensures efficient DOM updates

## Usage Examples

### Active tasks section
```html
<app-task-list
  title="TASKS"
  [tasks]="todayTasks()"
  (taskToggle)="onToggleTask($event)"
  (taskDelete)="onDeleteTask($event)"
/>
```

### Completed tasks section (no delete)
```html
<app-task-list
  title="COMPLETED"
  [tasks]="completedTasks()"
  (taskToggle)="onToggleTask($event)"
  (taskDelete)="onDeleteTask($event)"
/>
```

### Empty section
```html
<app-task-list
  title="TODAY"
  [tasks]="[]"
  (taskToggle)="onToggleTask($event)"
  (taskDelete)="onDeleteTask($event)"
/>
<!-- Shows empty state message -->
```

## Storybook Stories

### Stories to create
1. **Default** - List with multiple tasks
2. **Empty** - Empty task list with empty state message
3. **Single Task** - List with exactly one task
4. **Completed Tasks** - All completed tasks section
5. **Mixed** - Mix of completed and incomplete tasks

### Story configuration
```typescript
const meta: Meta<TaskListComponent> = {
  title: 'Components/TaskList',
  component: TaskListComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    tasks: { control: 'object' }
  },
  args: {
    title: 'TASKS',
    tasks: [
      { id: '1', text: 'Task name', completed: false, createdAt: new Date() },
      { id: '2', text: 'Task name', completed: false, createdAt: new Date() },
      { id: '3', text: 'Task name', completed: false, createdAt: new Date() }
    ]
  }
};

export const Default: Story = {};

export const Empty: Story = {
  args: {
    tasks: []
  }
};

export const Completed: Story = {
  args: {
    title: 'COMPLETED',
    tasks: [
      { id: '4', text: 'Task name', completed: true, createdAt: new Date() }
    ]
  }
};
```

## Unit Tests

### Test cases
1. ✓ Renders section header with title and count
2. ✓ Renders correct number of task items
3. ✓ Shows empty state when tasks is empty
4. ✓ Does not show empty state when tasks exist
5. ✓ Computed taskCount equals tasks.length
6. ✓ Re-emits taskToggle from child task item
7. ✓ Re-emits taskDelete from child task item
8. ✓ Uses task.id for @for tracking

### Test example
```typescript
it('should show empty state when no tasks', () => {
  const fixture = TestBed.createComponent(TaskListComponent);
  fixture.componentRef.setInput('title', 'TASKS');
  fixture.componentRef.setInput('tasks', []);
  fixture.detectChanges();

  const emptyMsg = fixture.nativeElement.querySelector('.task-list__empty');
  const items = fixture.nativeElement.querySelectorAll('app-task-item');

  expect(emptyMsg).toBeTruthy();
  expect(items.length).toBe(0);
});

it('should re-emit taskToggle from child item', async () => {
  const fixture = TestBed.createComponent(TaskListComponent);
  const mockTasks = [
    { id: 'task-1', text: 'Test', completed: false, createdAt: new Date() }
  ];
  fixture.componentRef.setInput('title', 'TASKS');
  fixture.componentRef.setInput('tasks', mockTasks);
  fixture.detectChanges();

  let emittedId: string | undefined;
  fixture.componentInstance.taskToggle.subscribe((id: string) => {
    emittedId = id;
  });

  // Simulate taskToggle from child
  const taskItem = fixture.debugElement.query(By.directive(TaskItemComponent));
  taskItem.componentInstance.taskToggle.emit('task-1');

  expect(emittedId).toBe('task-1');
});
```

## Implementation Notes
- Event re-emission pattern: `(taskToggle)="taskToggle.emit($event)"`
- `@for ... @empty` control flow provides clean empty state handling
- `track task.id` ensures efficient DOM reconciliation on list updates
- Spacing between task items comes from CSS gap, not margins on items

## Future Enhancements
- Animated list transitions (add/remove tasks)
- Drag-and-drop reordering
- Bulk select/delete actions
- Sort options (date, priority, alphabetical)
- Loading skeleton state
- Pagination for long lists
- Collapsible sections
