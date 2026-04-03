import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial state: empty tasks array', () => {
    expect(service.tasks()).toEqual([]);
  });

  it('should add a task with unique id, text, completed=false', () => {
    service.addTask('Buy groceries');
    const tasks = service.tasks();

    expect(tasks.length).toBe(1);
    expect(tasks[0].text).toBe('Buy groceries');
    expect(tasks[0].completed).toBe(false);
    expect(tasks[0].id).toBe(1);
  });

  it('should trim whitespace from text when adding', () => {
    service.addTask('  Trimmed task  ');
    expect(service.tasks()[0].text).toBe('Trimmed task');
  });

  it('should not add a task if the text is empty', () => {
    service.addTask('   ');
    expect(service.tasks().length).toBe(0);
  });

  it('should toggle task completion state', () => {
    service.addTask('Test task');
    const id = service.tasks()[0].id;

    // completed=false to true
    service.toggleTask(id);
    expect(service.tasks()[0].completed).toBe(true);

    // completed=true to false
    service.toggleTask(id);
    expect(service.tasks()[0].completed).toBe(false);
  });

  it('should not affect other tasks when toggling', () => {
    service.addTask('Task 1');
    service.addTask('Task 2');

    const task1Id = service.tasks().find(t => t.text === 'Task 1')!.id;
    service.toggleTask(task1Id);

    const task2 = service.tasks().find(t => t.text === 'Task 2')!;
    expect(task2.completed).toBe(false);
  });

  it('should delete a task', () => {
    service.addTask('Task to delete');
    service.addTask('Task to keep');

    const idToDelete = service.tasks().find(t => t.text === 'Task to delete')!.id;
    service.deleteTask(idToDelete);

    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].text).toBe('Task to keep');
  });

  it('should not affect other tasks when deleting', () => {
    service.addTask('Task 1');
    service.addTask('Task 2');

    const task1Id = service.tasks().find(t => t.text === 'Task 1')!.id;
    service.deleteTask(task1Id);

    const match = service.tasks().find(t => t.text === 'Task 2');
    expect(match).toBeTruthy();
  });

  it('should correctly compute todayTasks (only incomplete)', () => {
    service.addTask('Task 1');
    service.addTask('Task 2'); // Task 2 will be completed
    const id = service.tasks()[0].id; // Task 2 id (since unshift)
    service.toggleTask(id);

    expect(service.todayTasks().length).toBe(1);
    expect(service.todayTasks()[0].text).toBe('Task 1');
  });

  it('should correctly compute completedTasks (only completed)', () => {
    service.addTask('Task 1');
    service.addTask('Task 2');
    const id = service.tasks()[0].id;
    service.toggleTask(id);

    expect(service.completedTasks().length).toBe(1);
    expect(service.completedTasks()[0].text).toBe('Task 2');
  });

  it('should compute counts correctly', () => {
    service.addTask('1');
    service.addTask('2');
    service.addTask('3');

    service.toggleTask(service.tasks()[0].id);

    // 2 tasks are incomplete, 1 is completed
    expect(service.inboxCount()).toBe(2);
    expect(service.todayCount()).toBe(2);
    expect(service.completedCount()).toBe(1);
  });

  it('should update computed values reactively', () => {
    service.addTask('Reactive validation');
    expect(service.inboxCount()).toBe(1);

    service.toggleTask(service.tasks()[0].id);
    expect(service.inboxCount()).toBe(0);
    expect(service.completedCount()).toBe(1);
  });
});
