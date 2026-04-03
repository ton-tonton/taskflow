# TaskList Component Specification

## Overview
A grouped list of task items with a section header. Composes SectionHeader and TaskItem components to create cohesive task sections.

## Figma links
This is desgin Dashboard page it include all composite component
@https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=24-68&m=dev

You must create this component only include a group of:
- summary task header @https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=24-106&m=dev
  - do not create new component.
- List of task items

## Component Details

**Type**: Layout Component
**File Location**: `src/app/components/task-list/`
**Dependencies**: TaskItem component

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Section title (e.g., "TASKS", "COMPLETED") |
| `tasks` | `Task[]` | Yes | - | Array of tasks to display |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskToggle` | `number` | Re-emits task id from child TaskItem |
| `taskDelete` | `number` | Re-emits task id from child TaskItem |


## Storybook Stories

### Stories to create
1. **Default** - List with multiple tasks
4. **Completed Tasks** - All completed tasks section
