# SectionHeader Component Specification

## Overview
A section title row that combines a category label, horizontal divider line, and task count. Used to separate task groups (e.g., "TASKS", "COMPLETED").

## Component Details

**Type**: Composite/Presentational Component
**File Location**: `src/app/components/section-header/`
**Dependencies**: None (uses only design tokens)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Section title text (e.g., "TODAY", "COMPLETED") |
| `count` | `number` | Yes | - | Number of tasks in this section |

## Outputs
None

## State

### Computed Signals
```typescript
countText = computed(() => {
  const c = this.count();
  return `${c} ${c === 1 ? 'task' : 'tasks'}`;
});
```

## Template Structure
```html
<div class="section-header">
  <h2 class="section-header__title">{{ title() }}</h2>
  <div class="section-header__divider" role="separator"></div>
  <span class="section-header__count">{{ countText() }}</span>
</div>
```

## Styling Strategy

### CSS Variables Used
- `--color-text-primary` (title color: #2a2630)
- `--color-text-disabled` (count text color: gray/muted)
- `--color-border-input` (divider color: light gray)
- `--font-size-lg` (title font size: 20px)
- `--font-weight-normal` (title font weight: 400)
- `--font-size-md` (count font size: 16px)
- `--font-weight-semibold` (count font weight: 600)
- `--spacing-sm` (padding and gaps: 8px)
- `--line-height-tight` (title line height: 1.25)

### CSS Classes
```css
.section-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  width: 488px; /* Based on Figma measurement */
}

.section-header__title {
  font-family: var(--font-family-base);
  font-size: 20px;  /* Headline/Small from Figma */
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
}

.section-header__divider {
  flex: 1;
  height: 1px;
  background: var(--color-border-input);  /* Light gray separator */
}

.section-header__count {
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: 1.5;
  color: var(--color-text-disabled);  /* Muted/disabled gray */
  flex-shrink: 0;
  white-space: nowrap;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-section-header',
  standalone: true,
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  title = input.required<string>();
  count = input.required<number>();

  countText = computed(() => {
    const c = this.count();
    return `${c} ${c === 1 ? 'task' : 'tasks'}`;
  });
}
```

## Design System Integration

### Figma Mapping
- **Layout**: Three-element row (title | divider | count)
- **Title**: 20px regular IBM Plex Sans Thai, dark color #2a2630
- **Divider**: Horizontal line, light gray color, flexes to fill space
- **Count text**: 16px semibold, muted gray #bdbcbf (disabled color token)
- **Total width**: 488px in Figma
- **Padding**: 8px on all sides

### Figma Design Tokens Referenced
```
--semantics/primary: #2a2630    → --color-text-primary
--button/primary/background/disabled: #bdbcbf → --color-text-disabled
Headline/Small typography: 20px, weight 400, lineHeight 1.25
Label/Large typography: 16px, weight 600, lineHeight 1.5
```

### Missing Design Tokens Required
```css
/* Add to src/styles/tokens.css */
--color-text-disabled: oklch(75% 0.01 290);   /* Muted gray #bdbcbf */
```

## Accessibility Requirements
- ✓ `<h2>` used for section title (proper heading hierarchy)
- ✓ Divider has `role="separator"` for screen readers
- ✓ Count text provides task count context
- ✓ Heading level should not skip (h1 for page, h2 for sections)
- ✓ Color contrast for count text meets WCAG AA minimum 3:1 for large text

## Usage Examples

### Tasks section
```html
<app-section-header
  title="TASKS"
  [count]="3"
/>
<!-- Output: TASKS ——————————————— 3 tasks -->
```

### Completed section
```html
<app-section-header
  title="COMPLETED"
  [count]="1"
/>
<!-- Output: COMPLETED ——————— 1 task -->
```

### Empty section
```html
<app-section-header
  title="TODAY"
  [count]="0"
/>
<!-- Output: TODAY ——————————————— 0 tasks -->
```

## Storybook Stories

### Stories to create
1. **Default** - Section with task count
2. **Empty** - Section with 0 tasks
3. **Single Task** - Section with 1 task (singular "task")
4. **Many Tasks** - Section with large count
5. **All Sections** - Showcase all section header variants

### Story configuration
```typescript
const meta: Meta<SectionHeaderComponent> = {
  title: 'Components/SectionHeader',
  component: SectionHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    count: { control: 'number' }
  },
  args: {
    title: 'TASKS',
    count: 3
  }
};

export const Default: Story = {};

export const Empty: Story = {
  args: {
    count: 0
  }
};

export const SingleTask: Story = {
  args: {
    count: 1
  }
};

export const Completed: Story = {
  args: {
    title: 'COMPLETED',
    count: 5
  }
};
```

## Unit Tests

### Test cases
1. ✓ Renders title prop
2. ✓ Renders count as "0 tasks" when count is 0
3. ✓ Renders count as "1 task" (singular) when count is 1
4. ✓ Renders count as "X tasks" (plural) when count > 1
5. ✓ Computed countText updates when count changes
6. ✓ Uses h2 tag for title
7. ✓ Divider has role="separator"

### Test example
```typescript
it('should use singular "task" for count of 1', () => {
  const fixture = TestBed.createComponent(SectionHeaderComponent);
  fixture.componentRef.setInput('title', 'TODAY');
  fixture.componentRef.setInput('count', 1);
  fixture.detectChanges();

  const count = fixture.nativeElement.querySelector('.section-header__count');
  expect(count.textContent.trim()).toBe('1 task');
});

it('should use plural "tasks" for count of 0', () => {
  const fixture = TestBed.createComponent(SectionHeaderComponent);
  fixture.componentRef.setInput('title', 'TODAY');
  fixture.componentRef.setInput('count', 0);
  fixture.detectChanges();

  const count = fixture.nativeElement.querySelector('.section-header__count');
  expect(count.textContent.trim()).toBe('0 tasks');
});
```

## Implementation Notes
- Uses CSS `flex: 1` on divider to fill available space between title and count
- Title text is uppercase in Figma design (can be set via CSS `text-transform: uppercase` or passed in uppercase from parent)
- `countText` computed signal handles singular/plural logic
- Width is relative based on parent container in actual usage

## Future Enhancements
- Collapsible sections (accordion-style)
- Section progress bar (e.g., 5/12 tasks done)
- Custom colors per section type
- Sort/filter controls alongside header
