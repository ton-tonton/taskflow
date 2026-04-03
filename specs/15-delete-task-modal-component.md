# Delete Task Modal Component Specification

## Overview
A confirmation modal component designed to ask the user to verify the deletion of a specific task. It presents a warning message ("The task will be removed permanently. This cannot be reversed."), along with "Cancel" and deletion actions. It is designed to be accessible and fully responsive.

## Figma links
- default: https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-220&m=dev

## Component Details

**Type**: UI/Presentational Component
**File Location**: `src/app/components/delete-task-modal/`
**Dependencies**:
- `ButtonComponent`
- `@fortawesome/angular-fontawesome` (for the close 'xmark' icon)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | No | `false` | Controls the visibility of the modal |
| `taskId` | `string` | Yes | - | The ID of the task to be deleted |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `confirmDelete` | `string` | Emits the `taskId` when the user confirms the deletion |
| `closed` | `void` | Emits when the modal is closed via the Cancel button, close icon, or backdrop click |

## Behavior & Accessibility

- Focus should be trapped inside the modal while it is open.
- Pressing the `Escape` key should trigger the `closed` emission.
- When opened, focus should automatically be placed on the Cancel button to prevent accidental deletions.

## Storybook Stories

### Stories to create
1. **Default** - The modal displayed when click open modal button.
