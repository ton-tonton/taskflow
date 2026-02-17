# Button Component Specification

## Overview
A modern, refactored button component replacing the outdated Storybook example. Supports multiple variants and sizes following Angular 21+ best practices.

## Component Details

**Type**: Atomic/Presentational Component
**File Location**: `src/app/components/button/`
**Dependencies**: None (can optionally compose with Icon component)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'icon'` | No | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `disabled` | `boolean` | No | `false` | Whether button is disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | No | `'button'` | HTML button type |
| `ariaLabel` | `string \| undefined` | No | `undefined` | Accessibility label |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `clicked` | `MouseEvent` | Emits when button is clicked |

## State
None (stateless presentational component)

## Template Structure
```html
<button
  [type]="type()"
  [disabled]="disabled()"
  [attr.aria-label]="ariaLabel()"
  [class]="buttonClasses()"
  (click)="onClick($event)"
>
  <ng-content />
</button>
```

## Computed Properties
```typescript
buttonClasses = computed(() => ({
  'button': true,
  [`button--${this.variant()}`]: true,
  [`button--${this.size()}`]: true,
  'button--disabled': this.disabled()
}));
```

## Styling Strategy

### CSS Variables Used
- `--color-primary` (primary button background)
- `--color-primary-dark` (primary button hover)
- `--color-text-inverse` (white text on primary)
- `--color-border-default` (secondary button border)
- `--spacing-sm`, `--spacing-md`, `--spacing-lg` (padding)
- `--radius-md` (border radius)
- `--transition-base` (hover transitions)
- `--font-size-sm`, `--font-size-md`, `--font-size-lg` (typography)
- `--font-weight-semibold` (button text weight)

### CSS Classes
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
  border-radius: var(--radius-md);
}

/* Variants */
.button--primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.button--primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.button--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.button--secondary:hover:not(:disabled) {
  background: var(--color-hover-overlay);
}

.button--icon {
  background: transparent;
  color: var(--color-text-primary);
  border: none;
  padding: var(--spacing-xs);
}

.button--icon:hover:not(:disabled) {
  background: var(--color-hover-overlay);
}

/* Sizes */
.button--sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.button--md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-md);
}

.button--lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

/* Disabled */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus */
.button:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'icon'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  ariaLabel = input<string | undefined>(undefined);

  clicked = output<MouseEvent>();

  buttonClasses = computed(() => ({
    'button': true,
    [`button--${this.variant()}`]: true,
    [`button--${this.size()}`]: true,
    'button--disabled': this.disabled()
  }));

  onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
```

## Design System Integration

### Figma Mapping
- **Primary**: Used for main actions (future enhancement)
- **Secondary**: Dashed border input style (as reference)
- **Icon**: Transparent buttons for icons (delete, etc.)

### Differences from Old Button Component

| Old Pattern | New Pattern |
|-------------|-------------|
| `@Input() label!: string` | Uses `<ng-content>` for flexibility |
| `@Output() onClick = new EventEmitter()` | `clicked = output<MouseEvent>()` |
| `ngClass` directive | `computed()` signal with class object |
| `ngStyle` directive | CSS classes with design tokens |
| No `ChangeDetectionStrategy` | `OnPush` strategy |

## Accessibility Requirements
- ✓ Keyboard accessible (native button element)
- ✓ Focus indicator visible (outline)
- ✓ Disabled state prevents interaction
- ✓ Type attribute set appropriately (button/submit/reset)
- ✓ ARIA label support for icon-only buttons
- ✓ Color contrast meets WCAG AA

## Usage Examples

### Primary button
```html
<app-button variant="primary" (clicked)="handleClick($event)">
  Save Changes
</app-button>
```

### Secondary button with icon
```html
<app-button variant="secondary" size="md">
  <app-icon name="plus" size="sm" />
  Add Task
</app-button>
```

### Icon-only button (requires aria-label)
```html
<app-button
  variant="icon"
  ariaLabel="Delete task"
  (clicked)="onDelete($event)"
>
  <app-icon name="trash" size="sm" />
</app-button>
```

### Submit button in form
```html
<app-button
  variant="primary"
  type="submit"
  [disabled]="form.invalid"
>
  Submit
</app-button>
```

## Storybook Stories

### Stories to create
1. **Primary** - Default primary button
2. **Secondary** - Outlined/ghost button
3. **Icon** - Icon-only transparent button
4. **Sizes** - Small, medium, large variants
5. **Disabled** - Disabled state for each variant
6. **With Icons** - Buttons with icon + text content

### Story configuration
```typescript
const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'icon']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset']
    }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button'
  }
};

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Click me</app-button>`
  })
};
```

## Unit Tests

### Test cases
1. ✓ Renders with default props
2. ✓ Applies correct variant class
3. ✓ Applies correct size class
4. ✓ Emits clicked event when clicked
5. ✓ Does not emit when disabled
6. ✓ Applies disabled attribute when disabled=true
7. ✓ Sets correct button type attribute
8. ✓ Renders ng-content correctly
9. ✓ Applies aria-label when provided
10. ✓ Has focus indicator on keyboard focus

### Test example
```typescript
it('should emit clicked event when not disabled', () => {
  const fixture = TestBed.createComponent(ButtonComponent);
  let clickEvent: MouseEvent | undefined;

  fixture.componentInstance.clicked.subscribe((event: MouseEvent) => {
    clickEvent = event;
  });

  const button = fixture.nativeElement.querySelector('button');
  button.click();

  expect(clickEvent).toBeDefined();
});

it('should not emit clicked event when disabled', () => {
  const fixture = TestBed.createComponent(ButtonComponent);
  fixture.componentRef.setInput('disabled', true);

  let clickCount = 0;
  fixture.componentInstance.clicked.subscribe(() => {
    clickCount++;
  });

  const button = fixture.nativeElement.querySelector('button');
  button.click();

  expect(clickCount).toBe(0);
});
```

## Implementation Notes
- Uses `<ng-content>` for flexible content projection
- Supports icon + text combinations
- Icon variant is minimal for use in task delete buttons
- Class bindings via computed signal (reactive)
- Prevents click emission when disabled

## Migration from Old Button
The existing `/src/stories/button.component.ts` should NOT be deleted - it's a Storybook example. This new Button component should be created separately and used for production code.

## Future Enhancements
- Loading state with spinner
- Full-width variant
- Danger/destructive variant (red)
- Button group support
- Tooltip integration
