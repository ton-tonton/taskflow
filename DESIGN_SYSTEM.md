# TaskFlow Design System

## Core Principles
- **Mobile-First**: Designs originate for mobile screens and progressively enhance for tablet and desktop.
- **Token-Driven**: All visual values are centralized in CSS custom properties to ensure consistency and themeability.
- **Accessibility First**: Strict adherence to WCAG AA standards, including color contrast, focus indicators, and semantic structure.

## Design Tokens

Tokens live in `src/styles/tokens.css` inside a single `@theme {}` block.
Tailwind v4 reads `@theme` to both register CSS custom properties on `:root` **and** generate utility classes automatically — no `tailwind.config.js` is needed.

### Token Architecture

The system uses a 3-tier hierarchy:

```
Primitive tokens  (raw values)
    └── Semantic tokens  (purpose / intent)
            └── Component tokens  (scoped to one component)
```

---

#### 1. Primitive tokens

Raw, hardcoded values. Named after the **color palette** they belong to. The building blocks that never get applied directly to components.

```css
/* Color palettes */
--color-sunglow-500: #ffcc33;
--color-balticsea-500: #2a2630;
--color-balticsea-600: #26232c;
--color-springwood-500: #f8f6f1;
--color-green-500: #10b981;
--color-red-500: #ef4444;
--color-yellow-500: #f59e0b;

/* Tailwind utilities generated: bg-sunglow-500, text-balticsea-600, … */
```

Available palettes: `sunglow`, `balticsea`, `springwood`, `green`, `red`, `yellow`
Each palette has shades `50` → `900`.

---

#### 2. Semantic tokens

Purpose-driven tokens that reference primitives. They define *why* a value is used, not *what* value it is.

```css
/* Global intent */
--color-primary: var(--color-balticsea-500);   /* bg-primary, text-primary, … */
--color-accent:  var(--color-sunglow-500);     /* bg-accent,  text-accent,  … */
--color-success: var(--color-green-500);
--color-error:   var(--color-red-500);

/* Text roles */
--color-text-primary:   var(--color-balticsea-600);   /* text-text-primary   */
--color-text-secondary: var(--color-springwood-100);  /* text-text-secondary */
--color-text-inverse:   var(--color-springwood-100);  /* text-text-inverse   */

/* Background roles */
--color-bg-default: var(--color-springwood-500);      /* bg-bg-default       */

/* Disabled / muted states */
--color-primary-muted: var(--color-balticsea-100);    /* bg-primary-muted    */
--color-text-disabled: var(--color-springwood-50);    /* text-text-disabled  */
```

---

#### 3. Component tokens

Component-specific tokens that reference semantic tokens. These are where you get granular.

```css
/* Button / Primary */
--color-btn-primary-bg:          var(--color-primary);
--color-btn-primary-bg-hover:    var(--color-primary);
--color-btn-primary-bg-active:   var(--color-accent);
--color-btn-primary-bg-disabled: var(--color-primary-muted);

--color-btn-primary-text:          var(--color-text-inverse);
--color-btn-primary-text-hover:    var(--color-accent);
--color-btn-primary-text-active:   var(--color-primary);
--color-btn-primary-text-disabled: var(--color-text-disabled);

--color-btn-primary-border: var(--color-primary);
```

---

## Adding Tokens (`src/styles/tokens.css`)

This file contains **only** the `@theme {}` block. Rules:

- **NEVER** add CSS classes, selectors, or media queries here.
- Add new variables inside `@theme {}`, grouped by tier and category.
- Follow the naming conventions table above exactly.
- Reference primitives from semantics; reference semantics from component tokens — never skip tiers.

```css
/* Example: adding a new component token */
@theme {
  /* Component tokens - Badge */
  --color-badge-success-bg:   var(--color-success);
  --color-badge-success-text: var(--color-text-inverse);
}
```

---

## Adding Global Styles (`src/styles.css`)

This file is for **base HTML element styles** only.

- Target HTML elements (`body`, `h1`, `a`, etc.) to enforce design system defaults.
- Use `var()` to reference tokens.
- **Do not** add component classes here; keep those in component CSS files.

---

## Styling Strategy

Apply styles in this priority order:

1. **Tailwind utilities** — layout, spacing, and responsive structure (`flex`, `grid`, `p-md`, `gap-lg`).
2. **Component CSS** — component-specific styles using component or semantic tokens.

**Example — button component CSS:**

```css
.btn-primary {
  background-color: var(--color-btn-primary-bg);
  color: var(--color-btn-primary-text);
  border: 1px solid var(--color-btn-primary-border);
  border-radius: var(--radius-md);
  font-family: var(--font-base);
  font-size: var(--font-size-md);
  padding: var(--spacing-sm) var(--spacing-lg);
}

.btn-primary:hover {
  background-color: var(--color-btn-primary-bg-hover);
  color: var(--color-btn-primary-text-hover);
}

.btn-primary:active {
  background-color: var(--color-btn-primary-bg-active);
  color: var(--color-btn-primary-text-active);
}

.btn-primary:disabled {
  background-color: var(--color-btn-primary-bg-disabled);
  color: var(--color-btn-primary-text-disabled);
}
```

Or using Tailwind utilities directly in the template:

```html
<button class="bg-primary text-text-inverse font-base text-md px-lg py-sm rounded-md">
  Submit
</button>
```

---

## Asset Conventions

- **Icons**: Use `@fortawesome/angular-fontawesome` — do not create custom icon wrapper components.
- **SVG**: Naming convention `kebab-case-description.svg` (e.g., `arrow-right.svg`).
- **Images**: `kebab-case-description.{jpg,png,webp}`. Use `NgOptimizedImage` for all static images.
