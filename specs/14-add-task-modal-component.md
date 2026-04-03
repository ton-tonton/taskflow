# Add Task Modal Component Specification

## Overview
A modal component that provides a user interface for creating a new task. It contains an input field for the task name, along with "Cancel" and "Add task" actions. It is designed to be accessible and fully responsive.

## Figma links
- default: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-182&m=dev

## Component Details

**Type**: UI/Presentational Component
**File Location**: `src/app/components/add-task-modal/`
**Dependencies**:
- `ButtonComponent`
- native input consistency with figma design
- `@fortawesome/angular-fontawesome` (for the close 'xmark' icon)

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | No | `false` | Controls the visibility of the modal |


## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskAdded` | `Task` | Emits the new task when the user submits the form |
| `closed` | `void` | Emits when the modal is closed via the Cancel button, close icon, or backdrop click |

## Behavior & Accessibility

- Focus should be trapped inside the modal while it is open.
- Pressing the `Escape` key should trigger the `closed` emission.
- The "Add task" button should only be enabled if the task name is not empty.
- When opened, focus should automatically be placed on the task name input field.

## Storybook Stories

### Stories to create
1. **Default (Open)** - The modal displayed in its open state with an empty input.
3. **Validation State** - To demonstrate disabled "Add task" button when input is empty.
