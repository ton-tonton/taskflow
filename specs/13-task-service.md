# TaskService Specification

## Overview
A singleton Angular service that manages all task-related state and business logic using signals. Acts as the single source of truth for task data in the application.

## Service Details

**Type**: Angular Service (Singleton)
**File Location**: `src/app/services/task.service.ts`
**Provided In**: `root` (app-wide singleton)
**Dependencies**: None (pure in-memory state)

## Service Configuration
```typescript
@Injectable({ providedIn: 'root' })
export class TaskService { ... }
```

## State

### Private Signals (Internal State)
```typescript
private tasksState = signal<Task[]>([]);
```

### Public Readonly Signals (Derived State)
```typescript
// All tasks (readonly)
readonly tasks = this.tasksState.asReadonly();

// Today's incomplete tasks
readonly todayTasks = computed<Task[]>(() =>
  this.tasksState().filter(t => !t.completed)
);

// All completed tasks
readonly completedTasks = computed<Task[]>(() =>
  this.tasksState().filter(t => t.completed)
);

// Nav badge counts
readonly inboxCount = computed<number>(() =>
  this.tasksState().filter(t => !t.completed).length
);

readonly todayCount = computed<number>(() =>
  this.tasksState().filter(t => !t.completed).length
);

readonly completedCount = computed<number>(() =>
  this.tasksState().filter(t => t.completed).length
);
```

## Public Methods

### `addTask(text: string): void`
Creates a new task and prepends it to the task list.

```typescript
addTask(text: string): void {
  const newTask: Task = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date()
  };
  this.tasksState.update(tasks => [newTask, ...tasks]);
}
```

### `toggleTask(id: string): void`
Toggles a task's `completed` state.

```typescript
toggleTask(id: string): void {
  this.tasksState.update(tasks =>
    tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}
```

### `deleteTask(id: string): void`
Removes a task from the list by id.

```typescript
deleteTask(id: string): void {
  this.tasksState.update(tasks =>
    tasks.filter(task => task.id !== id)
  );
}
```

## Task Model
```typescript
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: string;
}
```

## Full Service Implementation
```typescript
import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksState = signal<Task[]>([]);

  readonly tasks = this.tasksState.asReadonly();

  readonly todayTasks = computed<Task[]>(() =>
    this.tasksState().filter(t => !t.completed)
  );

  readonly completedTasks = computed<Task[]>(() =>
    this.tasksState().filter(t => t.completed)
  );

  readonly inboxCount = computed<number>(() =>
    this.tasksState().filter(t => !t.completed).length
  );

  readonly todayCount = computed<number>(() =>
    this.tasksState().filter(t => !t.completed).length
  );

  readonly completedCount = computed<number>(() =>
    this.tasksState().filter(t => t.completed).length
  );

  addTask(text: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    this.tasksState.update(tasks => [newTask, ...tasks]);
  }

  toggleTask(id: string): void {
    this.tasksState.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: string): void {
    this.tasksState.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }
}
```

## Design Principles Applied

| Principle | Application |
|-----------|-------------|
| Single Responsibility | Only manages task state and operations |
| Open/Closed | Add new computed signals without modifying existing |
| Immutability | `update()` returns new arrays, never mutates |
| Predictability | Pure transformations in map/filter |
| Reactivity | All state via signals, all derivations via computed |

## State Mutation Rules
- ✓ Use `update()` to derive new state from previous state
- ✓ Use `set()` to replace state entirely
- ✗ Never use `mutate()` (removed in modern Angular)
- ✗ Never directly access `tasksState()` to mutate
- ✗ Never `push()`, `splice()`, or modify arrays in place

## Unit Tests

### Test cases
1. ✓ Initial state: empty tasks array
2. ✓ `addTask` creates task with unique id, text, completed=false
3. ✓ `addTask` trims whitespace from text
4. ✓ `addTask` does not add empty text task
5. ✓ `toggleTask` changes completed=false to true
6. ✓ `toggleTask` changes completed=true to false
7. ✓ `toggleTask` does not affect other tasks
8. ✓ `deleteTask` removes task from list
9. ✓ `deleteTask` does not affect other tasks
10. ✓ `todayTasks` computed returns only incomplete tasks
11. ✓ `completedTasks` computed returns only completed tasks
12. ✓ `inboxCount` equals number of incomplete tasks
13. ✓ `completedCount` equals number of completed tasks
14. ✓ Computed values update reactively on state change

### Test example
```typescript
describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should add a task', () => {
    service.addTask('Buy groceries');
    const tasks = service.tasks();

    expect(tasks.length).toBe(1);
    expect(tasks[0].text).toBe('Buy groceries');
    expect(tasks[0].completed).toBe(false);
    expect(tasks[0].id).toBeTruthy();
  });

  it('should toggle task completion', () => {
    service.addTask('Test task');
    const id = service.tasks()[0].id;

    service.toggleTask(id);
    expect(service.tasks()[0].completed).toBe(true);

    service.toggleTask(id);
    expect(service.tasks()[0].completed).toBe(false);
  });

  it('should delete a task', () => {
    service.addTask('Task to delete');
    service.addTask('Task to keep');

    const idToDelete = service.tasks()[0].id;
    service.deleteTask(idToDelete);

    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].text).toBe('Task to keep');
  });

  it('should compute todayTasks as only incomplete tasks', () => {
    service.addTask('Task 1');
    service.addTask('Task 2');
    const id = service.tasks()[0].id;
    service.toggleTask(id);

    expect(service.todayTasks().length).toBe(1);
    expect(service.completedTasks().length).toBe(1);
  });
});
```

## Implementation Notes
- `providedIn: 'root'` ensures singleton across the app
- `asReadonly()` on `tasksState` prevents external mutation
- `crypto.randomUUID()` for unique IDs without external dependencies
- `update()` takes a pure function — no side effects
- All computeds are lazy — only recalculate when accessed and state changes
- Service is designed to be easily extendable with API calls

## Future Enhancements
- **Persistence**: LocalStorage sync via `effect()`
- **API Integration**: HTTP calls with loading/error states
- **Optimistic Updates**: Update UI before API confirmation
- **Undo/Redo**: Maintain action history with previous states
- **Due Date Filtering**: Separate today vs future tasks
- **Task Reordering**: Position tracking for drag-and-drop
