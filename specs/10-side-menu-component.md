# Side menu Component Specification

## Overview
The left-side navigation panel containing the app logo and primary navigation. Controls which view (Inbox, Today, Completed) is active and communicates selection to the parent.

## Figma links
https://www.figma.com/design/nDiGTKmWUjoVCvwfV7KxXO/TaskFlow?node-id=4-283&m=dev

## Component Details

**Type**: Layout Component
**File Location**: `src/app/components/side-menu/`

## Props (Inputs)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `activeView` | `ViewType` | Yes | - | Currently selected navigation view |
| `navCounts` | `NavCounts` | No | `{ inbox: 0, today: 0, completed: 0 }` | Task counts for each nav item |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `navItemClick` | `ViewType` | Emits the selected view when nav item is clicked |


## Storybook Stories

### Stories to create
1. **Default** - Default with Inbox selected

