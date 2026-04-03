import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksState = signal<Task[]>([]);
  private nextId = 1;

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
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    const newTask: Task = {
      id: this.nextId++,
      text: trimmedText,
      completed: false,
      createdAt: new Date()
    };
    this.tasksState.update(tasks => [newTask, ...tasks]);
  }

  toggleTask(id: number): void {
    this.tasksState.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: number): void {
    this.tasksState.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }
}
