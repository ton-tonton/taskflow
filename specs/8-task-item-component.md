# TaskItem Component Specification

## Overview
An individual task row displaying a checkbox, task text, and optional delete button. Supports two visual states: default (active task) and completed.

## Component Details

**Type**: Composite/Presentational Component
**File Location**: `src/app/components/task-item/`
**Dependencies**: Checkbox component, Icon component

## Data Model

```typescript
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: string;
}
```

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `task` | `Task` | Yes | - | The task data object to display |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskToggle` | `string` | Emits task id when checkbox is toggled |
| `taskDelete` | `string` | Emits task id when delete button is clicked |

## State

### Computed Signals
```typescript
showDeleteButton = computed(() => !this.task().completed);

containerClasses = computed(() => ({
  'task-item': true,
  'task-item--completed': this.task().completed
}));

textClasses = computed(() => ({
  'task-item__text': true,
  'task-item__text--strikethrough': this.task().completed
}));
```

## Template Structure
```html
<div
  [class]="containerClasses()"
>
  <app-checkbox
    [checked]="task().completed"
    [variant]="task().completed ? 'completed' : 'default'"
    [ariaLabel]="task().completed ? 'Mark as incomplete' : 'Mark as complete'"
    (checkedChange)="taskToggle.emit(task().id)"
  />

  <span
    [class]="textClasses()"
  >
    {{ task().text }}
  </span>

  @if (showDeleteButton()) {
    <button
      class="task-item__delete"
      type="button"
      aria-label="Delete task"
      (click)="taskDelete.emit(task().id)"
    >
      <app-icon
        name="trash"
        size="md"
        color="var(--color-error)"
      />
    </button>
  }
</div>
```

## Styling Strategy

### CSS Variables Used
- `--color-bg-default` (background: warm cream #f8f6f1)
- `--color-border-default` (default border: dark #26232c)
- `--color-border-completed` (completed border: green)
- `--color-text-primary` (task text color)
- `--color-text-disabled` (completed/strikethrough text: muted gray)
- `--color-error` (delete icon color: red)
- `--spacing-md` (padding: 16px)
- `--spacing-sm` (gap between elements: 8px)
- `--radius-sm` (border radius: 8px)
- `--transition-base` (hover/state transitions)

### CSS Classes
```css
.task-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);  /* 8px between elements */
  padding: var(--spacing-md);  /* 16px all sides */
  background: var(--color-bg-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);  /* 8px */
  min-height: 1px;
  position: relative;
}

.task-item--completed {
  border-color: var(--color-border-completed);  /* Green border */
}

.task-item__text {
  flex: 1;
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
  color: var(--color-text-primary);
  min-height: 1px;
  min-width: 0;
  white-space: pre-wrap;
}

.task-item__text--strikethrough {
  text-decoration: line-through;
  text-decoration-skip-ink: none;
  color: var(--color-text-disabled);  /* Muted gray */
}

.task-item__delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  color: var(--color-error);
  transition: opacity var(--transition-base);
}

.task-item__delete:hover {
  opacity: 0.7;
}

.task-item__delete:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CheckboxComponent, IconComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  task = input.required<Task>();

  taskToggle = output<string>();
  taskDelete = output<string>();

  showDeleteButton = computed(() => !this.task().completed);

  containerClasses = computed(() => ({
    'task-item': true,
    'task-item--completed': this.task().completed
  }));

  textClasses = computed(() => ({
    'task-item__text': true,
    'task-item__text--strikethrough': this.task().completed
  }));
}
```

## Design System Integration

### Figma Mapping (Default State)
- **Border**: 1px solid #26232c (dark/primary color)
- **Background**: #f8f6f1 (warm cream)
- **Checkbox icon**: Empty square icon, dark color
- **Text**: Regular 16px, dark color
- **Delete icon**: Trash icon, red color (#ef4444)
- **Width**: 256px in Figma design (flexible in layout)
- **Padding**: 16px all sides
- **Border radius**: 8px

### Figma Mapping (Completed State)
- **Border**: 1px solid #10b981 (green)
- **Background**: Same warm cream (#f8f6f1)
- **Checkbox icon**: Square-check icon, green color (#10b981)
- **Text**: Strikethrough, muted gray (#bdbcbf)
- **Delete icon**: Hidden (not shown for completed tasks)

### Missing Design Tokens Required
```css
/* Add to src/styles/tokens.css */
--color-error: oklch(55% 0.22 25);              /* Red #ef4444 */
--color-success: oklch(60% 0.15 145);           /* Green #10b981 */
--color-border-completed: var(--color-success); /* Green border for completed */
```

## Accessibility Requirements
- ✓ Checkbox is keyboard accessible (via Checkbox component)
- ✓ Delete button has `aria-label="Delete task"`
- ✓ Semantic structure (checkbox + text + action button)
- ✓ Focus indicator on delete button
- ✓ Delete button only visible for incomplete tasks (appropriate for context)
- ✓ Strikethrough text supplemented by checkbox state (not color-only indicator)
- ✓ Task text is wrapped in `<span>` not `<p>` to avoid block-level nesting issues

## Usage Examples

### Default incomplete task
```html
<app-task-item
  [task]="{ id: '1', text: 'Buy groceries', completed: false, createdAt: new Date() }"
  (taskToggle)="onToggle($event)"
  (taskDelete)="onDelete($event)"
/>
```

### Completed task
```html
<app-task-item
  [task]="{ id: '2', text: 'Email team', completed: true, createdAt: new Date() }"
  (taskToggle)="onToggle($event)"
  (taskDelete)="onDelete($event)"
/>
```

### In a task list
```html
@for (task of tasks(); track task.id) {
  <app-task-item
    [task]="task"
    (taskToggle)="onToggleTask($event)"
    (taskDelete)="onDeleteTask($event)"
  />
}
```

## Storybook Stories

### Stories to create
1. **Default** - Incomplete task with delete button
2. **Completed** - Completed task with strikethrough and green border
3. **Long Text** - Task with very long text (wrapping behavior)
4. **Interactive** - Fully interactive story with toggle and delete handlers

### Story configuration
```typescript
const meta: Meta<TaskItemComponent> = {
  title: 'Components/TaskItem',
  component: TaskItemComponent,
  tags: ['autodocs'],
  argTypes: {
    task: { control: 'object' }
  },
  args: {
    task: {
      id: '1',
      text: 'Buy groceries at the store',
      completed: false,
      createdAt: new Date()
    }
  }
};

export const Default: Story = {};

export const Completed: Story = {
  args: {
    task: {
      id: '2',
      text: 'Email the team about the meeting',
      completed: true,
      createdAt: new Date()
    }
  }
};

export const LongText: Story = {
  args: {
    task: {
      id: '3',
      text: 'This is a very long task name that should wrap to multiple lines within the task item component',
      completed: false,
      createdAt: new Date()
    }
  }
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      onToggle: (id: string) => console.log('Toggle:', id),
      onDelete: (id: string) => console.log('Delete:', id)
    },
    template: `
      <app-task-item
        [task]="task"
        (taskToggle)="onToggle($event)"
        (taskDelete)="onDelete($event)"
      />
    `
  })
};
```

## Unit Tests

### Test cases
1. ✓ Renders task text
2. ✓ Renders Checkbox with checked=false when task.completed=false
3. ✓ Renders Checkbox with checked=true when task.completed=true
4. ✓ Applies 'task-item--completed' class when task is completed
5. ✓ Does not apply 'task-item--completed' when task is incomplete
6. ✓ Shows delete button for incomplete tasks
7. ✓ Hides delete button for completed tasks
8. ✓ Applies strikethrough class to text when completed
9. ✓ Emits taskToggle with task.id when checkbox changes
10. ✓ Emits taskDelete with task.id when delete button clicked
11. ✓ Checkbox has 'completed' variant when task is completed
12. ✓ Checkbox has 'default' variant when task is incomplete

### Test example
```typescript
it('should hide delete button for completed tasks', () => {
  const fixture = TestBed.createComponent(TaskItemComponent);
  fixture.componentRef.setInput('task', {
    id: '1',
    text: 'Done task',
    completed: true,
    createdAt: new Date()
  });
  fixture.detectChanges();

  const deleteButton = fixture.nativeElement.querySelector('.task-item__delete');
  expect(deleteButton).toBeNull();
});

it('should emit taskToggle with task id when checkbox changes', () => {
  const fixture = TestBed.createComponent(TaskItemComponent);
  fixture.componentRef.setInput('task', {
    id: 'task-123',
    text: 'Test task',
    completed: false,
    createdAt: new Date()
  });
  fixture.detectChanges();

  let emittedId: string | undefined;
  fixture.componentInstance.taskToggle.subscribe((id: string) => {
    emittedId = id;
  });

  const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
  checkbox.click();

  expect(emittedId).toBe('task-123');
});
```

## Implementation Notes
- Computed signals drive both class bindings and conditional rendering
- `showDeleteButton` computed simplifies template logic
- Delete icon uses direct Icon component (not Button wrapper) for minimal styling
- Task text uses `white-space: pre-wrap` to preserve line breaks if any
- Border color change (black → green) is the primary visual indicator for completion

## Future Enhancements
- Inline task text editing (double-click to edit)
- Swipe-to-delete on mobile
- Due date badge display
- Priority indicator (color-coded left border)
- Task context menu (right-click or long-press)
- Drag handle for reordering
