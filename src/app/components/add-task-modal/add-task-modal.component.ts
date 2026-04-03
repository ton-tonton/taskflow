import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../button/button.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [ButtonComponent, FaIconComponent, FormsModule],
  templateUrl: './add-task-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskModalComponent {
  isOpen = input<boolean>(false);
  taskAdded = output<Task>();
  closed = output<void>();

  /**
   * @ignore
   * References to the dialog elements for controlling visibility.
   */
  dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');

  /**
   * @ignore
   * References to the input elements for controlling focus.
   */
  inputRef = viewChild<ElementRef<HTMLTextAreaElement>>('inputRef');

  faXmark = faXmark;
  taskName = '';

  constructor() {
    effect(() => {
      const dialog = this.dialogRef()?.nativeElement;
      if (dialog) {
        if (this.isOpen()) {
          this.taskName = ''; // Reset input when modal opens
          dialog.showModal();
          setTimeout(() => {
            this.inputRef()?.nativeElement.focus();
          }, 50); // slight delay to ensure dialog has rendered
        } else {
          dialog.close();
        }
      }
    });
  }

  onClose() {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent) {
    const dialog = this.dialogRef()?.nativeElement;
    // If the click is precisely on the dialog element it's a backdrop click.
    if (dialog && event.target === dialog) {
      this.onClose();
    }
  }

  onAddTask() {
    if (this.taskName.trim().length > 0) {
      const newTask: Task = {
        id: Date.now(),
        text: this.taskName.trim(),
        completed: false,
        createdAt: new Date(),
      };
      this.taskAdded.emit(newTask);
      this.taskName = '';
      this.onClose();
    }
  }
}

