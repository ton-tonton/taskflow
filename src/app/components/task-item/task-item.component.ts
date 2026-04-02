import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  imports: [FaIconComponent, CheckboxComponent],
  templateUrl: './task-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full',
  },
})
export class TaskItem {
  task = input.required<Task>();

  taskToggle = output<Task>();
  taskDelete = output<Task>();

  readonly faTrash = faTrash;

  toggleTask(checked: boolean): void {
    this.task().completed = checked;
    this.taskToggle.emit(this.task());
  }

  deleteTask(): void {
    this.taskDelete.emit(this.task());
  }
}

