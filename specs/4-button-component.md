# Button Component Specification

## Overview
A modern, refactored button component replacing the outdated Storybook example. Supports multiple variants and sizes following Angular 21+ best practices.

## Figma links
- primary:
  default: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=3-1169&m=dev
  hover: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=3-1170&m=dev
  pressed: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=3-1172&m=dev
  disabled: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=3-1186&m=dev
- outline:
  default: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-195&m=dev
  hover: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-199&m=dev
  pressed: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-201&m=dev
  disabled: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-197&m=dev
- error:
  default: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-233&m=dev
  hover: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-237&m=dev
  pressed: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-239&m=dev

## Component Details

**Type**: Atomic/Presentational Component
**File Location**: `src/app/components/button/`
**Dependencies**: None (can optionally compose with Icon component)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'primary' \| 'outline' \| 'error'` | No | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `disabled` | `boolean` | No | `false` | Whether button is disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | No | `'button'` | HTML button type |
| `ariaLabel` | `string \| undefined` | No | `undefined` | Accessibility label |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `clicked` | `MouseEvent` | Emits when button is clicked |

## Storybook Stories

### Stories to create
1. **Primary** - Default primary button
2. **outline** - Outlined/ghost button
3. **error** - Icon-only transparent button
4. **Disabled** - Disabled state for each variant
