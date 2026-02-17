# Badge Component Specification

## Overview
A count badge component that displays numerical values, used primarily for showing task counts in navigation items.

## Component Details

**Type**: Atomic/Presentational Component
**File Location**: `src/app/components/badge/`
**Dependencies**: None

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `count` | `number` | Yes | - | The count to display in the badge |
| `variant` | `'default' \| 'active'` | No | `'default'` | Visual variant for different states |

## Outputs
None (pure presentational component)

## State

### Signals
```typescript
displayCount = computed(() => {
  const count = this.count();
  return count > 99 ? '99+' : count.toString();
});
```

## Template Structure
```html
<div
  class="badge"
  [class.badge--active]="variant() === 'active'"
>
  {{ displayCount() }}
</div>
```

## Styling Strategy

### CSS Variables Used
- `--color-text-primary` (default text color)
- `--color-text-inverse` (active text color - white)
- `--color-bg-active` (active background color)
- `--spacing-xs` (padding)
- `--radius-xs` (border radius)
- `--font-size-sm` (typography)
- `--font-weight-semibold` (typography)

### CSS Classes
```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 1.5;
  color: var(--color-text-primary);
  background: transparent;
}

.badge--active {
  color: var(--color-text-inverse);
  background: var(--color-bg-default);
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

## Design System Integration

### Figma Mapping
- **Default state**: Black text (#26232c), transparent background
- **Active state**: Black text on beige/cream background (#f8f6f1)
- **Min width**: 40px (as per Figma design)
- **Padding**: 8px horizontal, 8px vertical
- **Border radius**: 4px (--radius-xs)

## Accessibility Requirements
- Badge text must be readable (minimum font size 14px)
- Color contrast must meet WCAG AA standards
- When used in navigation, parent element should have proper ARIA label

## Usage Examples

### Default badge
```html
<app-badge [count]="12" />
```

### Active badge (in selected navigation item)
```html
<app-badge [count]="12" variant="active" />
```

### High count (displays "99+")
```html
<app-badge [count]="150" />
<!-- Displays: 99+ -->
```

## Storybook Stories

### Stories to create
1. **Default** - Standard badge with count
2. **Active** - Badge in active/selected state
3. **Various Counts** - Show 0, 1, 12, 99, 100, 999
4. **In Navigation** - Badge within NavItem context

### Story configuration
```typescript
const meta: Meta<BadgeComponent> = {
  title: 'Atoms/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number'
    },
    variant: {
      control: 'radio',
      options: ['default', 'active']
    }
  },
  args: {
    count: 12,
    variant: 'default'
  }
};

export const Default: Story = {};

export const Active: Story = {
  args: {
    variant: 'active'
  }
};

export const HighCount: Story = {
  args: {
    count: 150
  }
};
```

## Unit Tests

### Test cases
1. ✓ Renders with count prop
2. ✓ Displays exact count for values 0-99
3. ✓ Displays "99+" for values over 99
4. ✓ Applies default variant class
5. ✓ Applies active variant class when variant="active"
6. ✓ Computed displayCount updates reactively when count changes
7. ✓ Renders with minimum width of 40px

### Test example
```typescript
it('should display "99+" for counts over 99', () => {
  const fixture = TestBed.createComponent(BadgeComponent);
  fixture.componentRef.setInput('count', 150);
  fixture.detectChanges();

  const badge = fixture.nativeElement.querySelector('.badge');
  expect(badge.textContent.trim()).toBe('99+');
});
```

## Implementation Notes
- Uses `computed()` signal for reactive count transformation
- Minimal dependencies - only requires design tokens
- Fixed minimum width ensures consistent sizing
- Active variant matches Figma design with light background

## Future Enhancements
- Add color variants (success, warning, error badges)
- Support for non-numeric badges (text labels)
- Pulsing animation for updated counts
- Dot indicator for zero counts
