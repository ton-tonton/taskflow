# Checkbox Component Specification

## Overview
A custom-styled checkbox component for task items, supporting default and completed states with appropriate visual feedback.

## Component Details

**Type**: Atomic/Presentational Component
**File Location**: `src/app/components/checkbox/`
**Dependencies**: Icon component (for check and square icons)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `checked` | `boolean` | No | `false` | Whether the checkbox is checked |
| `variant` | `'default' \| 'completed'` | No | `'default'` | Visual variant affecting border color |
| `disabled` | `boolean` | No | `false` | Whether the checkbox is disabled |
| `ariaLabel` | `string \| undefined` | No | `undefined` | Accessibility label |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `checkedChange` | `boolean` | Emits when checkbox state changes |

## State
None (controlled component - parent manages checked state)

## Template Structure
```html
<label
  class="checkbox"
  [class.checkbox--checked]="checked()"
  [class.checkbox--completed]="variant() === 'completed'"
  [class.checkbox--disabled]="disabled()"
>
  <input
    type="checkbox"
    class="checkbox__input"
    [checked]="checked()"
    [disabled]="disabled()"
    [attr.aria-label]="ariaLabel()"
    (change)="onCheckChange($event)"
  />
  <span class="checkbox__custom">
    @if (checked()) {
      <app-icon name="check" size="md" />
    } @else {
      <app-icon name="square" size="md" />
    }
  </span>
</label>
```

## Styling Strategy

### CSS Variables Used
- `--color-border-default` (default border: black)
- `--color-border-completed` (completed border: green) **NEW TOKEN**
- `--color-success` (check icon color when completed) **NEW TOKEN**
- `--color-text-primary` (default icon color)
- `--transition-base` (smooth state transitions)
- `--color-focus-ring` (focus indicator)
- `--radius-sm` (border radius: 8px)

### CSS Classes
```css
.checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox__custom {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: 2px;
}

.checkbox--completed .checkbox__custom {
  border-color: var(--color-border-completed);
  color: var(--color-success);
}

/* Focus state */
.checkbox__input:focus-visible + .checkbox__custom {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Hover state */
.checkbox:hover:not(.checkbox--disabled) .checkbox__custom {
  background: var(--color-hover-overlay);
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  checked = input<boolean>(false);
  variant = input<'default' | 'completed'>('default');
  disabled = input<boolean>(false);
  ariaLabel = input<string | undefined>(undefined);

  checkedChange = output<boolean>();

  onCheckChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
```

## Design System Integration

### Figma Mapping
- **Default unchecked**: Black border, square icon
- **Default checked**: Black border, check icon
- **Completed unchecked**: Green border, square icon (unlikely state)
- **Completed checked**: Green border, green check icon

### Missing Design Tokens Required
```css
/* Add to src/styles/tokens.css */
--color-success: oklch(60% 0.15 145);           /* Green #10b981 */
--color-border-default: var(--color-gray-900);   /* Black #26232c */
--color-border-completed: var(--color-success);  /* Green */
--color-focus-ring: var(--color-primary);        /* Focus indicator */
--color-hover-overlay: rgba(0, 0, 0, 0.05);     /* Subtle hover */
```

## Accessibility Requirements
- ✓ Uses native `<input type="checkbox">` for keyboard support
- ✓ Visible focus indicator meets WCAG 2.4.7 (Focus Visible)
- ✓ Color contrast meets WCAG AA standards
- ✓ Supports aria-label for screen reader context
- ✓ Disabled state prevents interaction and reduces opacity
- ✓ Label wraps input for larger click target

## Usage Examples

### Basic unchecked
```html
<app-checkbox
  [checked]="false"
  (checkedChange)="onToggle($event)"
/>
```

### Checked with completed variant
```html
<app-checkbox
  [checked]="true"
  variant="completed"
  (checkedChange)="onToggle($event)"
/>
```

### With accessibility label
```html
<app-checkbox
  [checked]="task.completed"
  [variant]="task.completed ? 'completed' : 'default'"
  ariaLabel="Mark task as complete"
  (checkedChange)="onTaskToggle($event)"
/>
```

### Disabled state
```html
<app-checkbox
  [checked]="true"
  [disabled]="true"
/>
```

## Storybook Stories

### Stories to create
1. **Default Unchecked** - Standard unchecked state
2. **Default Checked** - Standard checked state
3. **Completed Checked** - Checked with green styling
4. **Disabled** - Both checked and unchecked disabled states
5. **Interactive** - Toggleable checkbox with state display

### Story configuration
```typescript
const meta: Meta<CheckboxComponent> = {
  title: 'Atoms/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    variant: {
      control: 'radio',
      options: ['default', 'completed']
    },
    disabled: { control: 'boolean' }
  },
  args: {
    checked: false,
    variant: 'default',
    disabled: false
  }
};

export const DefaultUnchecked: Story = {};

export const DefaultChecked: Story = {
  args: {
    checked: true
  }
};

export const CompletedChecked: Story = {
  args: {
    checked: true,
    variant: 'completed'
  }
};
```

## Unit Tests

### Test cases
1. ✓ Renders unchecked by default
2. ✓ Renders checked when checked=true
3. ✓ Displays square icon when unchecked
4. ✓ Displays check icon when checked
5. ✓ Emits checkedChange with true when checked
6. ✓ Emits checkedChange with false when unchecked
7. ✓ Applies completed variant class
8. ✓ Applies disabled state correctly
9. ✓ Does not emit events when disabled
10. ✓ Has proper focus indicator

### Test example
```typescript
it('should emit checkedChange when toggled', () => {
  const fixture = TestBed.createComponent(CheckboxComponent);
  let emittedValue: boolean | undefined;

  fixture.componentInstance.checkedChange.subscribe((value: boolean) => {
    emittedValue = value;
  });

  const input = fixture.nativeElement.querySelector('input');
  input.checked = true;
  input.dispatchEvent(new Event('change'));

  expect(emittedValue).toBe(true);
});
```

## Implementation Notes
- Custom checkbox uses hidden native input for accessibility
- Visual representation via Icon component (check/square)
- Border color changes based on variant (default: black, completed: green)
- Smooth transitions enhance UX
- Focus state uses outline instead of box-shadow for better visibility

## Future Enhancements
- Indeterminate state for "some items selected"
- Animation on check/uncheck
- Size variants (sm, md, lg)
- Custom icon support beyond check/square
