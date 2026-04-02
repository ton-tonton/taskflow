# Checkbox Component Specification

## Overview
A custom-styled checkbox component for task items, using `FontAwesome` icons directly for visual representation. It seamlessly transitions between a primary-colored square (unchecked) and a success-colored checked square (checked), matching the Figma specifications.

## Figma links
- default (unchecked): @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-138&m=dev
- completed (checked): @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-142&m=dev

## Component Details

**Type**: Atomic/Presentational Component
**File Location**: `src/app/components/checkbox/`
**Dependencies**: `@fortawesome/angular-fontawesome` (`faSquare`, `faSquareCheck`)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `checked` | `boolean` | No | `false` | Whether the checkbox is checked |
| `disabled` | `boolean` | No | `false` | Whether the checkbox is disabled |
| `ariaLabel` | `string \| undefined` | No | `undefined` | Accessibility label |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `checkedChange` | `boolean` | Emits when checkbox state changes |

## State
None (controlled component - parent manages checked state)

## Template Structure
```html
<label
  class="inline-flex items-center cursor-pointer relative"
  [class.opacity-50]="disabled()"
  [class.cursor-not-allowed]="disabled()"
>
  <input
    type="checkbox"
    class="sr-only peer"
    [checked]="checked()"
    [disabled]="disabled()"
    [attr.aria-label]="ariaLabel()"
    (change)="onCheckChange($event)"
  />
  <span
    class="inline-flex items-center justify-center text-[16px] leading-[1.5] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary rounded-sm"
    [class.text-success]="checked()"
    [class.text-primary]="!checked()"
  >
    @if (checked()) {
      <fa-icon [icon]="faSquareCheck" aria-hidden="true" />
    } @else {
      <fa-icon [icon]="faSquare" aria-hidden="true" />
    }
  </span>
</label>
```

## Styling Strategy

This component uses Tailwind utility classes exclusively, following the CSS-first configuration and design system tokens described in `DESIGN_SYSTEM.md`. No custom component CSS is necessary.

- **Tokens Used**:
  - `text-success` (`--color-success`) for checked state.
  - `text-primary` (`--color-primary`) for default, unchecked state.
- **Focus state**: Uses Tailwind's `peer-focus-visible` functionality to target the wrapping <span> when the hidden input receives focus.

## Component Configuration
```typescript
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkbox',
  imports: [FaIconComponent],
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  ariaLabel = input<string | undefined>(undefined);

  checkedChange = output<boolean>();

  faSquare = faSquare;
  faSquareCheck = faSquareCheck;

  onCheckChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
```

## Design System Integration

### Figma Mapping
- **Default unchecked (37:138)**: FontAwesome `square` icon with text color mapped to `--color-primary`.
- **Completed checked (37:142)**: FontAwesome `square-check` icon with text color mapped to `--color-success`.

*(Note: The previous extra \`variant\` enum logic has been removed. Checked and Unchecked explicitly cover the required Figma visual states directly without extra inputs.)*

## Accessibility Requirements
- ✓ Uses native `<input type="checkbox">` for correct interaction and screen reader compatibility.
- ✓ Uses `.sr-only` to visually hide the real input while preserving keyboard focus.
- ✓ Visible focus indicator meets WCAG 2.4.7, achieved via `peer-focus-visible`.
- ✓ Icon `aria-hidden="true"` prevents redundant announcements.
- ✓ Disabled state uses `opacity-50` and `cursor-not-allowed` logic visually while passing `[disabled]` to the native input.

## Usage Examples

### Basic usage
```html
<app-checkbox
  [checked]="task.completed"
  ariaLabel="Mark task as complete"
  (checkedChange)="onToggle($event)"
/>
```

### Disabled state
```html
<app-checkbox
  [checked]="true"
  [disabled]="true"
/>
```

## Storybook Stories

### Stories to create
1. **Default Unchecked**
2. **Completed Checked**
3. **Disabled Checked**
4. **Disabled Unchecked**

### Story configuration
```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Atoms/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' }
  },
  args: {
    checked: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
```
