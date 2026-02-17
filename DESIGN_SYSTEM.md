# TaskFlow Design System

## Core Principles
*   **Mobile-First**: Designs originate for mobile screens and progressively enhance for tablet and desktop.
*   **Token-Driven**: All visual values are centralized in CSS custom properties to ensure consistency and themeability.
*   **Accessibility First**: Strict adherence to WCAG AA standards, including color contrast, focus indicators, and semantic structure.

## Design Tokens
The system utilizes a comprehensive set of CSS variables (`--token-name`) derived directly from Figma variables.

### 1. Adding Design Tokens (`src/styles/tokens.css`)
This file is reserved strictly for **CSS Custom Properties (Variables)** to maintain a single source of truth.
*   **Rule**: **NEVER** add CSS classes, media queries, or standard selectors in this file.
*   **Action**: Add new variables inside the `:root` block.
*   **Naming Convention**: `kebab-case` following `--category-property-modifier`.

### 2. Adding Global Styles (`src/styles.css`)
This file is for **Base HTML Styles** and **Global Custom Utilities**.
*   **Base Styles**: Target HTML elements (e.g., `body`, `h1`, `a`) to enforce default design system values everywhere.
*   **Global Classes**: Add classes here **only** if they are used globally and cannot be achieved via Tailwind or Component CSS.

## Styling Strategy
The specific method of applying design rules follows a strict hierarchy:
1.  **Design Tokens**: Highest priority. Used for all core visual properties (color, font, space).
2.  **Component CSS**: Used for specific component encapsulation and complex states (BEM-like naming).
3.  **Tailwind Utilities**: Reserved primarily for layout structure (flex, grid) and responsive adjustments.

## Asset Conventions
*   **Iconography**: SVG format required. Naming convention must use `kebab-case-description` (e.g., `arrow-right.svg`).
*   **Images**: Naming follows `kebab-case-description.{jpg,png,webp}`.
