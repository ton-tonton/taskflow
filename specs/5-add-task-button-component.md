# AddTaskButton Component Specification

## Overview
A button styled as a dashed outline input with a plus icon for initiating the creation of new tasks.

## Figma links
@https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=4-61&m=dev

## Component Details

**Type**: Presentational Component
**File Location**: `src/app/components/add-task-button/`
**Dependencies**: FontAwesome Icons

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | No | `'Add new task'` | text |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `clicked` | `MouseEvent` | Emits when button is clicked |


## Storybook Stories

### Stories to create
1. **Default** - Standard input with default placeholder
