# TaskItem Component Specification

## Overview
An individual task row displaying a checkbox, task text, and optional delete button. Supports two visual states: default (active task) and completed.

## Figma links
- default: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-137&m=dev
- completed: @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=37-141&m=dev

## Component Details

**Type**: Composite/Presentational Component
**File Location**: `src/app/components/task-item/`
**Dependencies**: Checkbox component, Icon component

## Data Model

```typescript
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: string;
}
```

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `task` | `Task` | Yes | - | The task data object to display |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskToggle` | `string` | Emits task id when checkbox is toggled |
| `taskDelete` | `string` | Emits task id when delete button is clicked |


## Storybook Stories

### Stories to create
1. **Default** - Incomplete task with delete button
2. **Completed** - Completed task with strikethrough and green border
3. **Long Text** - Task with very long text (wrapping behavior)
