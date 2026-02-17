# TaskInput Component Specification

## Overview
An input field with a plus icon for adding new tasks. Handles user input and emits the task text on submission via keyboard (Enter) or form submit.

## Component Details

**Type**: Composite/Presentational Component
**File Location**: `src/app/components/task-input/`
**Dependencies**: Icon component

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `placeholder` | `string` | No | `'Add new task'` | Input placeholder text |
| `disabled` | `boolean` | No | `false` | Whether input is disabled |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskSubmit` | `string` | Emits the task text when user submits |

## State

### Signals
```typescript
taskText = signal<string>('');
isEmpty = computed(() => this.taskText().trim().length === 0);
```

## Template Structure
```html
<div
  class="task-input"
  [class.task-input--disabled]="disabled()"
>
  <app-icon
    name="plus"
    size="md"
    ariaLabel="Add task"
  />
  <input
    class="task-input__field"
    type="text"
    [value]="taskText()"
    [placeholder]="placeholder()"
    [disabled]="disabled()"
    aria-label="New task text"
    (input)="onInput($event)"
    (keydown.enter)="onSubmit()"
  />
</div>
```

## Component Methods
```typescript
onInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.taskText.set(target.value);
}

onSubmit(): void {
  const trimmedText = this.taskText().trim();
  if (trimmedText.length > 0) {
    this.taskSubmit.emit(trimmedText);
    this.taskText.set(''); // Reset after submit
  }
}
```

## Styling Strategy

### CSS Variables Used
- `--color-bg-default` (background color: #f8f6f1)
- `--color-border-input` (dashed border color: gray 100)
- `--color-text-placeholder` (placeholder text color: lighter gray)
- `--color-text-primary` (icon color)
- `--spacing-sm` (vertical padding: 8px)
- `--spacing-md` (horizontal padding: 16px)
- `--radius-md` (border radius: 8px)
- `--transition-base` (focus transition)
- `--color-focus-ring` (focus border color)

### CSS Classes
```css
.task-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-default);
  border: 1px dashed var(--color-border-input);
  border-radius: var(--radius-md);
  width: 323px;   /* Based on Figma: 323px width */
  transition: border-color var(--transition-base);
}

.task-input:focus-within {
  border-color: var(--color-focus-ring);
  border-style: solid;
}

.task-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.task-input__field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
}

.task-input__field::placeholder {
  color: var(--color-text-placeholder);
}

.task-input__field:disabled {
  cursor: not-allowed;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskInputComponent {
  placeholder = input<string>('Add new task');
  disabled = input<boolean>(false);

  taskSubmit = output<string>();

  taskText = signal<string>('');
  isEmpty = computed(() => this.taskText().trim().length === 0);

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.taskText.set(target.value);
  }

  onSubmit(): void {
    const trimmedText = this.taskText().trim();
    if (trimmedText.length > 0) {
      this.taskSubmit.emit(trimmedText);
      this.taskText.set('');
    }
  }
}
```

## Design System Integration

### Figma Mapping
- **Border style**: Dashed (1px dashed #bdbcbf)
- **Background**: `var(--semantics/bg/default, #f8f6f1)`
- **Placeholder text color**: `var(--primitives/balticsea/200, #9d9ba0)` - lighter gray
- **Width**: 323px (Figma measurement)
- **Padding**: 8px vertical, 16px horizontal
- **Border radius**: 8px
- **Icon**: Plus icon on the left, lighter gray color

### Missing Design Tokens Required
```css
/* Add to src/styles/tokens.css */
--color-bg-default: oklch(96% 0.02 95);          /* Warm cream #f8f6f1 */
--color-text-placeholder: oklch(75% 0.02 295);   /* Light gray #9d9ba0 */
--color-border-input: oklch(75% 0.01 290);        /* Light gray #bdbcbf */
```

## Accessibility Requirements
- ✓ Input has `aria-label` for screen readers
- ✓ Icon is decorative (aria-hidden or labeled)
- ✓ Focus state visible when typing
- ✓ Focus state visible on container
- ✓ Keyboard accessible (Enter to submit)
- ✓ Disabled state communicated to assistive tech

## Usage Examples

### Default usage
```html
<app-task-input (taskSubmit)="onAddTask($event)" />
```

### With custom placeholder
```html
<app-task-input
  placeholder="What needs to be done?"
  (taskSubmit)="onAddTask($event)"
/>
```

### Disabled state
```html
<app-task-input
  [disabled]="true"
  (taskSubmit)="onAddTask($event)"
/>
```

## Storybook Stories

### Stories to create
1. **Default** - Standard input with default placeholder
2. **Custom Placeholder** - Input with custom placeholder text
3. **Disabled** - Disabled state
4. **With Value** - Input with pre-filled text
5. **Interactive** - Fully interactive story with task submission

### Story configuration
```typescript
const meta: Meta<TaskInputComponent> = {
  title: 'Components/TaskInput',
  component: TaskInputComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' }
  },
  args: {
    placeholder: 'Add new task',
    disabled: false
  }
};

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'What do you need to do?'
  }
};
```

## Unit Tests

### Test cases
1. ✓ Renders with default placeholder "Add new task"
2. ✓ Renders Icon with name="plus"
3. ✓ Updates taskText signal on input event
4. ✓ Emits taskSubmit with trimmed text on Enter key
5. ✓ Does not emit empty task text
6. ✓ Clears input field after successful submission
7. ✓ Does not emit when only whitespace entered
8. ✓ Applies disabled class and attribute when disabled
9. ✓ Shows focus state on :focus-within
10. ✓ Renders custom placeholder text

### Test example
```typescript
it('should emit taskSubmit and clear input on Enter', () => {
  const fixture = TestBed.createComponent(TaskInputComponent);
  let submittedText: string | undefined;

  fixture.componentInstance.taskSubmit.subscribe((text: string) => {
    submittedText = text;
  });

  const input = fixture.nativeElement.querySelector('input');
  input.value = '  Buy groceries  ';
  input.dispatchEvent(new Event('input'));

  const event = new KeyboardEvent('keydown', { key: 'Enter' });
  input.dispatchEvent(event);

  expect(submittedText).toBe('Buy groceries'); // Trimmed
  expect(input.value).toBe('');                // Cleared
});
```

## Implementation Notes
- Input field uses dashed border (unique visual style from Figma)
- Focus state changes border to solid for better feedback
- Text is trimmed before emission to prevent whitespace-only tasks
- Input resets after successful submission
- Width of 323px matches Figma specification

## Future Enhancements
- Character limit with counter display
- Auto-suggestion based on past tasks
- Due date picker inline
- Priority selector
- Tag input support
