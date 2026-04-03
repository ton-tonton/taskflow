import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskItem } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  title = input.required<string>();
  tasks = input.required<Task[]>();

  taskToggle = output<number>();
  taskDelete = output<number>();

  onTaskToggle(task: Task): void {
    this.taskToggle.emit(task.id);
  }

  onTaskDelete(task: Task): void {
    this.taskDelete.emit(task.id);
  }
}
