# Icon Component Specification

## Overview
A reusable, type-safe wrapper component for FontAwesome icons. This component enforces consistency across the application and prevents "magic string" class names by using strict typing for icon names.

## Component Details

**Type**: Atomic/Presentational Component
**File Location**: `src/app/components/icon/`
**Dependencies**: FontAwesome CSS (must be loaded globally via CDN or npm)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `IconName` | Yes | - | Icon identifier from type-safe union (maps to `fa-{name}`) |
| `type` | `'solid' \| 'regular' \| 'brands'` | No | `'solid'` | FontAwesome style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Icon size variant |
| `color` | `string \| undefined` | No | `undefined` | Optional color override (uses design token by default) |
| `spin` | `boolean` | No | `false` | Applies `fa-spin` class |

## Outputs
None (pure presentational component)

## State
None (stateless component)

## IconName Type Definition
This ensures we only use icons that are actually needed/approved for the app.
```typescript
export type IconName =
  | 'list-check'   // Logo/branding
  | 'plus'         // Add task
  | 'trash'        // Delete task
  | 'check'        // Checked state
  | 'square'       // Unchecked state
  | 'inbox'        // Inbox navigation
  | 'calendar'     // Today/Calendar navigation
  | 'user'         // Profile
  | 'gear';        // Settings
```

## Template Structure
```html
<i
  [class]="computedClass()"
  [style.color]="color()"
  aria-hidden="true"
></i>
```

## Logic (Computed Signals)
```typescript
computedClass = computed(() => {
  const parts = ['fa-' + type(), 'fa-' + name()];

  if (size() === 'sm') parts.push('text-sm'); // or specific pixel size class
  if (size() === 'lg') parts.push('text-lg');
  if (spin()) parts.push('fa-spin');

  // Add base class for consistent alignment if needed
  parts.push('icon-base');

  return parts.join(' ');
});
```

## Styling Strategy

### CSS Classes
We can largely rely on FontAwesome's internal sizing or Tailwind utilities.
```css
/* Base alignment fixes if needed */
.icon-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}
```

## Component Configuration
```typescript
@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None // Allow styles to affect the i tag easily from parents if needed
})
```

## Asset Requirements
**External**: FontAwesome CSS must be included in `index.html` or `styles.css`.
Example (CDN):
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

## Usage Examples

### Basic usage
```html
<!-- Renders: <i class="fa-solid fa-plus icon-base ..."></i> -->
<app-icon name="plus" />
```

### With styling and specific type
```html
<!-- Renders: <i class="fa-regular fa-trash text-sm icon-base ..."></i> -->
<app-icon name="trash" type="regular" size="sm" />
```

## Storybook Stories

### Stories to create
1. **Gallery** - Grid of all `IconName` options
2. **Types** - Solid vs Regular comparison
3. **Sizes** - sm vs md vs lg
4. **Spinning** - Loading state demonstration

## Unit Tests
1. ✓ Computes correct classes based on `name` input (`fa-plus`, etc.)
2. ✓ Adds correct type class (`fa-solid` default vs `fa-brand`)
3. ✓ Applies size classes correctly
4. ✓ Applies spin class when prop is true

## Implementation Notes
- **Performance**: This approach relies on the browser caching the font file. It is generally very fast but slightly heavier than inline SVG for the initial load if the icon set is large and not tree-shaken.
- **Maintenance**: Adding a new icon requires two steps:
    1. Verify it exists in the loaded FontAwesome set.
    2. Add the string to the `IconName` type union.
- **Accessibility**: auto-adding `aria-hidden="true"` to the `<i>` tag is standard as icons are usually decorative. Interactive icons should be wrapped in `<button aria-label="...">`.
