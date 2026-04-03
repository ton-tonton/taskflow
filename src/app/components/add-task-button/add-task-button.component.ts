import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-task-button',
  imports: [FaIconComponent],
  templateUrl: './add-task-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskButton {
  text = input<string>('Add new task');
  clicked = output<MouseEvent>();

  faPlus = faPlus;
}
