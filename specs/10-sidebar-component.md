# Sidebar Component Specification

## Overview
The left-side navigation panel containing the app logo and primary navigation. Controls which view (Inbox, Today, Completed) is active and communicates selection to the parent.

## Component Details

**Type**: Layout Component
**File Location**: `src/app/components/sidebar/`
**Dependencies**: Icon component, NavItem component

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `activeView` | `ViewType` | Yes | - | Currently selected navigation view |
| `navCounts` | `NavCounts` | No | `{ inbox: 0, today: 0, completed: 0 }` | Task counts for each nav item |

```typescript
export type ViewType = 'inbox' | 'today' | 'completed';

export interface NavCounts {
  inbox: number;
  today: number;
  completed: number;
}
```

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `navItemClick` | `ViewType` | Emits the selected view when nav item is clicked |

## State

### Signals
```typescript
navItems = computed<NavItemData[]>(() => {
  const counts = this.navCounts();
  return [
    { id: 'inbox', icon: 'inbox', label: 'Inbox', count: counts.inbox },
    { id: 'today', icon: 'calendar', label: 'Today', count: counts.today },
    { id: 'completed', icon: 'check', label: 'Completed', count: counts.completed }
  ];
});
```

## Template Structure
```html
<aside class="sidebar" aria-label="Main sidebar">
  <!-- Logo Section -->
  <header class="sidebar__header">
    <div class="sidebar__logo">
      <app-icon
        name="list-check"
        size="lg"
        ariaLabel="TaskFlow"
      />
      <span class="sidebar__logo-text">TaskFlow</span>
    </div>
  </header>

  <!-- Navigation -->
  <nav class="sidebar__nav" aria-label="Main navigation">
    @for (item of navItems(); track item.id) {
      <app-nav-item
        [icon]="item.icon"
        [label]="item.label"
        [count]="item.count"
        [active]="activeView() === item.id"
        (clicked)="navItemClick.emit(item.id)"
      />
    }
  </nav>
</aside>
```

## Styling Strategy

### CSS Variables Used
- `--color-text-secondary-inverse` (sidebar background: near-white #fdfcfb)
- `--color-text-primary` (logo text, icon color)
- `--font-size-xl` (logo text size: 25px)
- `--font-weight-normal` (logo font weight)
- `--spacing-sm`, `--spacing-md` (layout spacing)
- `--line-height-tight` (logo text line height: 1.25)

### CSS Classes
```css
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 38px;           /* Large gap between logo and menu - from Figma */
  background: var(--color-bg-sidebar);   /* Near-white #fdfcfb */
  width: 250px;        /* Fixed sidebar width from Figma */
  height: 100vh;
  padding: 35px 15px;  /* Figma: left: 15px, top: 35px */
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar__header {
  flex-shrink: 0;
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-primary);
}

.sidebar__logo-text {
  font-family: var(--font-family-base);
  font-size: 25px;     /* Headline/Medium from Figma: 25px */
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-tight);
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  width: 100%;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent, NavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  activeView = input.required<ViewType>();
  navCounts = input<NavCounts>({ inbox: 0, today: 0, completed: 0 });

  navItemClick = output<ViewType>();

  navItems = computed<NavItemData[]>(() => {
    const counts = this.navCounts();
    return [
      { id: 'inbox' as ViewType, icon: 'inbox' as IconName, label: 'Inbox', count: counts.inbox },
      { id: 'today' as ViewType, icon: 'calendar' as IconName, label: 'Today', count: counts.today },
      { id: 'completed' as ViewType, icon: 'check' as IconName, label: 'Completed', count: counts.completed }
    ];
  });
}
```

## Design System Integration

### Figma Mapping
- **Background**: Near-white background (#fdfcfb) - slightly different from content area
- **Width**: 250px fixed
- **Height**: 1024px (full height)
- **Logo**: Icon (25px) + text "TaskFlow" (25px regular IBM Plex Sans Thai)
- **Nav items**: Stack vertically in a Menu container
- **Spacing**: 38px gap between logo and menu in Figma
- **Positioning**: Left: 15px offset from sidebar edge, Top: 35px padding

### Figma Design Tokens Referenced
```
--semantics/text/secondary: #fdfcfb  → sidebar background
--semantics/primary: #2a2630         → logo text and icon color
Headline/Medium: 25px, weight 400, lineHeight 1.25
```

### Missing Design Tokens Required
```css
/* Add to src/styles/tokens.css */
--color-bg-sidebar: oklch(99% 0.005 95);   /* Near-white #fdfcfb */
```

## Accessibility Requirements
- ✓ `<aside>` element with `aria-label="Main sidebar"` for landmark role
- ✓ Logo area uses `<header>` within the sidebar
- ✓ Navigation wrapped in `<nav>` with `aria-label="Main navigation"`
- ✓ Each nav item has keyboard access and focus indicator
- ✓ Sidebar does not trap focus (natural tab order)
- ✓ Responsive considerations for screen reader users

## Usage Examples

### Basic usage
```html
<app-sidebar
  [activeView]="'inbox'"
  [navCounts]="{ inbox: 12, today: 3, completed: 1 }"
  (navItemClick)="onNavigate($event)"
/>
```

### Dynamic active state
```html
<app-sidebar
  [activeView]="currentView()"
  [navCounts]="navCounts()"
  (navItemClick)="onNavigate($event)"
/>
```

## Storybook Stories

### Stories to create
1. **Inbox Active** - Default with Inbox selected
2. **Today Active** - Today view selected
3. **Completed Active** - Completed view selected
4. **Zero Counts** - All badges showing 0
5. **High Counts** - All badges showing 99+
6. **Interactive** - Clickable navigation with active state change

### Story configuration
```typescript
const meta: Meta<SidebarComponent> = {
  title: 'Layout/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  argTypes: {
    activeView: {
      control: 'radio',
      options: ['inbox', 'today', 'completed']
    },
    navCounts: { control: 'object' }
  },
  args: {
    activeView: 'inbox',
    navCounts: {
      inbox: 12,
      today: 3,
      completed: 1
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export const InboxActive: Story = {};

export const TodayActive: Story = {
  args: {
    activeView: 'today'
  }
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentView: signal<ViewType>('inbox'),
    },
    template: `
      <app-sidebar
        [activeView]="currentView()"
        [navCounts]="navCounts"
        (navItemClick)="currentView.set($event)"
      />
    `
  })
};
```

## Unit Tests

### Test cases
1. ✓ Renders logo with icon and "TaskFlow" text
2. ✓ Renders 3 navigation items (Inbox, Today, Completed)
3. ✓ Active nav item matches activeView input
4. ✓ Emits navItemClick with ViewType when nav item clicked
5. ✓ Updates navItems counts when navCounts changes
6. ✓ Navigation items have correct icons
7. ✓ Has `<aside>` with aria-label
8. ✓ Has `<nav>` with aria-label

### Test example
```typescript
it('should highlight inbox as active', () => {
  const fixture = TestBed.createComponent(SidebarComponent);
  fixture.componentRef.setInput('activeView', 'inbox');
  fixture.componentRef.setInput('navCounts', { inbox: 5, today: 3, completed: 1 });
  fixture.detectChanges();

  const navItems = fixture.debugElement.queryAll(By.directive(NavItemComponent));
  const inboxItem = navItems[0].componentInstance;

  expect(inboxItem.active()).toBe(true);
});

it('should emit navItemClick when nav item is clicked', () => {
  const fixture = TestBed.createComponent(SidebarComponent);
  fixture.componentRef.setInput('activeView', 'inbox');
  fixture.componentRef.setInput('navCounts', { inbox: 5, today: 3, completed: 1 });
  fixture.detectChanges();

  let emittedView: ViewType | undefined;
  fixture.componentInstance.navItemClick.subscribe((view: ViewType) => {
    emittedView = view;
  });

  const navItems = fixture.debugElement.queryAll(By.directive(NavItemComponent));
  navItems[1].componentInstance.clicked.emit(); // Click "Today"

  expect(emittedView).toBe('today');
});
```

## Implementation Notes
- Sidebar is a fixed layout element (250px wide, full height)
- NavItem configuration is derived from navCounts input via computed signal
- Logo uses a large icon (25px) - the largest icon size
- Navigation order: Inbox → Today → Completed (matches Figma)

## Future Enhancements
- Mobile responsive: collapsible sidebar with hamburger menu
- User profile/avatar at bottom
- Custom project/list creation
- Reorderable navigation items
- Sidebar collapse to icon-only mode
