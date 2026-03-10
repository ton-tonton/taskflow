# Icons: angular-fontawesome Usage Guide

## Overview
Icons are rendered using `@fortawesome/angular-fontawesome` — the official Angular wrapper for FontAwesome. Use `FaIconComponent` directly in consuming components; do **not** create a custom icon wrapper.

## Installed Packages

| Package | Purpose |
|---------|---------|
| `@fortawesome/angular-fontawesome` | Angular component (`<fa-icon>`) |
| `@fortawesome/free-solid-svg-icons` | Solid style icons (e.g. `faPlus`) |
| `@fortawesome/free-regular-svg-icons` | Regular/outline style icons |
| `@fortawesome/free-brands-svg-icons` | Brand icons (e.g. GitHub, Twitter) |

## Usage Pattern

### 1. Import in the component
```typescript
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FaIconComponent],
  template: `<fa-icon [icon]="faPlus" aria-hidden="true" />`
})
export class MyComponent {
  faPlus = faPlus;
}
```

### 2. Available `<fa-icon>` props

| Prop | Type | Description |
|------|------|-------------|
| `[icon]` | `IconDefinition` | Required. Icon definition from icon pack |
| `[size]` | `"xs" \| "sm" \| "lg" \| "xl" \| "2x" \| "3x" \| ...` | Icon size |
| `[fixedWidth]` | `boolean` | Fixed-width icon for alignment in lists |
| `[spin]` | `boolean` | Continuous spin animation |
| `[pulse]` | `boolean` | Step-based spin animation |
| `[inverse]` | `boolean` | Inverse color (white) |
| `[flip]` | `"horizontal" \| "vertical" \| "both"` | Flip icon |
| `[rotate]` | `90 \| 180 \| 270` | Rotate icon |

## Accessibility

- **Decorative icons** (visual only, adjacent text conveys meaning): add `aria-hidden="true"` directly on `<fa-icon>`.
- **Interactive icons** (icon-only buttons): wrap in `<button>` with `aria-label`.

```html
<!-- Decorative: icon alongside visible label -->
<fa-icon [icon]="faPlus" aria-hidden="true" />
<span>Add Task</span>

<!-- Interactive: icon-only button -->
<button aria-label="Add task">
  <fa-icon [icon]="faPlus" />
</button>
```

## Storybook

No dedicated story is needed for the icon library itself. When building stories for consuming components, show icon usage inline within those stories.

## Finding Icons

Browse available icons at fontawesome.com/icons (filter by "Free" and the desired style). Icon names map from kebab-case (`arrow-right`) to camelCase (`faArrowRight`) for the JS import.
