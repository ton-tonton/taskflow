## Technology Stack

- **Angular 21.1.0**: Modern standalone components, signals-based state
- **Tailwind CSS 4.x**: CSS-first configuration via `@import "tailwindcss"`
- **Storybook 10.2.8**: Component development and documentation
- **Vitest 4.x**: Unit testing framework
- **TypeScript 5.9.2**: Strict mode enabled
- **Package Manager**: npm 11.8.0

## Development Commands

### Core Development
```bash
npm start              # Start dev server at http://localhost:4200
npm run build         # Production build (outputs to dist/)
npm run watch         # Build with watch mode for development
```

### Storybook
```bash
npm run storybook           # Start Storybook at http://localhost:6006
npm run build-storybook     # Build static Storybook (outputs to storybook-static/)
```

### Testing
```bash
npm test              # Run unit tests with Vitest
```

### Code Generation
```bash
ng generate component <name>           # Generate new component
ng generate component <name> --prefix=app  # Generate with custom prefix
ng generate --help                      # View all available schematics
```

## Architecture Patterns

### Component Structure
- **App components**: `src/app/` - Application components with `app` prefix
- **Storybook components**: `src/stories/` - Example components with `storybook` prefix

### Styling Approach
- **Global styles**: `src/styles.css` with `@import "tailwindcss"`
- **Component styles**: Component-specific CSS files (e.g., `button.css`)
- **Tailwind CSS v4**: Uses CSS-first configuration (no `tailwind.config.js` by default)

## Storybook Configuration

### Story Structure
Stories follow TypeScript Meta/StoryObj pattern:
```typescript
const meta: Meta<ComponentType> = {
  title: 'Category/ComponentName',
  component: ComponentType,
  tags: ['autodocs'],  // Auto-generate documentation
  argTypes: { /* ... */ },
  args: { /* default args */ }
};

export default meta;
type Story = StoryObj<ComponentType>;
```

### Storybook Addons
- **@storybook/addon-a11y**: Accessibility testing and validation
- **@storybook/addon-docs**: Auto-generated documentation via Compodoc
- **@storybook/addon-onboarding**: First-time user guidance

### Documentation Generation
Compodoc auto-generates component documentation:
- Runs automatically when starting Storybook
- Outputs to `documentation.json`
- Integrates JSDoc comments from components

## Component Development Workflow

1. **Generate component**: `ng generate component <name>`
3. **Create story**: Add `.stories.ts` file in same directory or `src/stories/`
4. **Use signals**: For reactive state instead of traditional properties
5. **Tailwind styling**: Import component CSS and use Tailwind utilities
6. **Test in Storybook**: Run `npm run storybook` to view component
7. **Write tests**: Create `.spec.ts` file with Vitest

## Figma to Component Workflow

When creating components from Figma designs:
1. Use MCP servers to fetch Figma design specifications
2. Identify component hierarchy and breakdown
3. Generate Angular component with appropriate inputs/outputs
4. Apply Tailwind CSS classes matching Figma styles
5. Create Storybook story with all component variants
6. Document component props in JSDoc format for auto-docs
7. Test accessibility with Storybook a11y addon

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
