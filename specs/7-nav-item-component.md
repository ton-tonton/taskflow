# NavItem Component Specification

## Overview
A sidebar navigation menu item with icon, label, and count badge. Supports active/inactive states and serves as the primary navigation element in the sidebar.

## Component Details

**Type**: Composite/Presentational Component
**File Location**: `src/app/components/nav-item/`
**Dependencies**: Icon component, Badge component

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `IconName` | Yes | - | Icon to display next to the label |
| `label` | `string` | Yes | - | Navigation item text |
| `count` | `number` | Yes | - | Task count badge value |
| `active` | `boolean` | No | `false` | Whether this item is currently selected |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `clicked` | `void` | Emits when nav item is clicked |

## State
None (controlled by parent - active state passed as input)

## Template Structure
```html
<button
  type="button"
  class="nav-item"
  [class.nav-item--active]="active()"
  (click)="clicked.emit()"
  [attr.aria-current]="active() ? 'page' : null"
>
  <div class="nav-item__left">
    <app-icon
      [name]="icon()"
      size="md"
    />
    <span class="nav-item__label">{{ label() }}</span>
  </div>
  <app-badge
    [count]="count()"
    [variant]="active() ? 'active' : 'default'"
  />
</button>
```

## Styling Strategy

### CSS Variables Used
- `--color-text-primary-inverse` (active text: white #fdfcfb)
- `--color-text-primary` (inactive text: dark #26232c)
- `--color-bg-active` (active background: #2a2630 dark)
- `--spacing-sm` (padding: 8px)
- `--radius-sm` (border radius: 8px)
- `--transition-base` (hover transition)
- `--font-size-md` (label font size: 16px)
- `--font-weight-semibold` (label font weight: 600)
- `--color-hover-overlay` (hover state for inactive item)

### CSS Classes
```css
.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  width: 100%;
  border: none;
  cursor: pointer;
  background: transparent;
  color: var(--color-text-primary);
  font-family: inherit;
  transition: background var(--transition-base), color var(--transition-base);
}

.nav-item:hover:not(.nav-item--active) {
  background: var(--color-hover-overlay);
}

.nav-item--active {
  background: var(--color-bg-active);   /* Dark #2a2630 */
  color: var(--color-text-primary-inverse);  /* White */
}

.nav-item__left {
  display: flex;
  flex: 1;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  font-size: var(--font-size-md);
  font-style: normal;
  line-height: 1.5;
  min-width: 0;
  min-height: 1px;
}

.nav-item__label {
  flex: 1;
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Focus */
.nav-item:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [IconComponent, BadgeComponent],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent {
  icon = input.required<IconName>();
  label = input.required<string>();
  count = input.required<number>();
  active = input<boolean>(false);

  clicked = output<void>();
}
```

## Design System Integration

### Figma Mapping
- **Active state**: Dark background (#2a2630), white text (#fdfcfb), white badge with dark text
- **Inactive state**: Transparent background, dark text (#26232c), no background badge
- **Icon alignment**: Left side of label, 8px gap
- **Badge**: Right-aligned, 40px wide minimum, 8px padding
- **Container width**: Full width of sidebar content area (219px)

### Figma Design Tokens Referenced
```
--semantics/primary: #2a2630           → used as active background
--semantics/text/primary-inverse: #fdfcfb → active text color
--semantics/text/primary: #26232c       → inactive text color
Label/Large: 16px SemiBold
```

### Missing Design Tokens Required
```css
/* Add to src/styles/tokens.css */
--color-bg-active: #2a2630;                         /* Dark primary nav bg */
--color-text-primary-inverse: #fdfcfb;              /* White/inverse text */
```

## Accessibility Requirements
- ✓ Uses `<button>` element for keyboard accessibility
- ✓ `aria-current="page"` applied to active nav item
- ✓ Keyboard navigable with Tab key
- ✓ Focus indicator visible (outline)
- ✓ Interactive area meets WCAG 2.5.5 (minimum 44×44px target size)
- ✓ Color contrast sufficient in both active and inactive states
- ✓ Icon does not duplicate visible label text (aria-hidden icon)

## Usage Examples

### Inactive nav item
```html
<app-nav-item
  icon="inbox"
  label="Inbox"
  [count]="12"
  [active]="false"
  (clicked)="navigateTo('inbox')"
/>
```

### Active nav item
```html
<app-nav-item
  icon="inbox"
  label="Inbox"
  [count]="12"
  [active]="true"
  (clicked)="navigateTo('inbox')"
/>
```

### In navigation context
```html
<nav aria-label="Main navigation">
  @for (item of navItems(); track item.id) {
    <app-nav-item
      [icon]="item.icon"
      [label]="item.label"
      [count]="item.count"
      [active]="activeView() === item.id"
      (clicked)="navigateTo(item.id)"
    />
  }
</nav>
```

## Storybook Stories

### Stories to create
1. **Default (Inactive)** - Standard nav item
2. **Active** - Selected/active nav item
3. **Zero Count** - Badge showing 0
4. **High Count** - Badge showing 99+
5. **All Navigation Items** - Inbox, Today, Completed side by side

### Story configuration
```typescript
const meta: Meta<NavItemComponent> = {
  title: 'Components/NavItem',
  component: NavItemComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['inbox', 'calendar', 'check']
    },
    label: { control: 'text' },
    count: { control: 'number' },
    active: { control: 'boolean' }
  },
  args: {
    icon: 'inbox',
    label: 'Inbox',
    count: 12,
    active: false
  }
};

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true
  }
};

export const Today: Story = {
  args: {
    icon: 'calendar',
    label: 'Today',
    count: 3
  }
};

export const ZeroCount: Story = {
  args: {
    count: 0
  }
};
```

## Unit Tests

### Test cases
1. ✓ Renders icon with correct name
2. ✓ Renders label text
3. ✓ Renders badge with count
4. ✓ Applies active class when active=true
5. ✓ Does not apply active class when active=false
6. ✓ Emits clicked output when clicked
7. ✓ Sets aria-current="page" when active
8. ✓ Removes aria-current when inactive
9. ✓ Badge uses 'active' variant when nav item is active
10. ✓ Badge uses 'default' variant when nav item is inactive

### Test example
```typescript
it('should emit clicked event when button is clicked', () => {
  const fixture = TestBed.createComponent(NavItemComponent);
  fixture.componentRef.setInput('icon', 'inbox');
  fixture.componentRef.setInput('label', 'Inbox');
  fixture.componentRef.setInput('count', 12);

  let clickCount = 0;
  fixture.componentInstance.clicked.subscribe(() => clickCount++);

  const button = fixture.nativeElement.querySelector('.nav-item');
  button.click();

  expect(clickCount).toBe(1);
});

it('should set aria-current="page" when active', () => {
  const fixture = TestBed.createComponent(NavItemComponent);
  fixture.componentRef.setInput('icon', 'inbox');
  fixture.componentRef.setInput('label', 'Inbox');
  fixture.componentRef.setInput('count', 12);
  fixture.componentRef.setInput('active', true);
  fixture.detectChanges();

  const button = fixture.nativeElement.querySelector('.nav-item');
  expect(button.getAttribute('aria-current')).toBe('page');
});
```

## Implementation Notes
- Uses `<button>` (not `<a>`) since this is in-app navigation via state (not URL change)
- Active state badge has different styling than inactive badge
- Icon color changes automatically via CSS `currentColor` inheritance
- The icon in the active state picks up white color from the parent color token

## Future Enhancements
- Routing integration (use `<a>` with router link if URL-based navigation)
- Submenu/nested navigation support
- Drag to reorder nav items
- Custom icon color override
- Notification dot indicator
