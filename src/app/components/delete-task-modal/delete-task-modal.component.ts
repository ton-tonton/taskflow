import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-delete-task-modal',
  standalone: true,
  imports: [ButtonComponent, FaIconComponent],
  templateUrl: './delete-task-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteTaskModalComponent {
  isOpen = input<boolean>(false);
  taskId = input.required<number>();

  confirmDelete = output<number>();
  closed = output<void>();

  /**
   * @ignore
   * References to the dialog elements for controlling visibility.
   */
  dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');

  /**
   * @ignore
   * References to the cancel button elements for controlling focus wrapper.
   */
  cancelBtnRef = viewChild('cancelBtnRef', { read: ElementRef });

  readonly faXmark = faXmark;

  constructor() {
    effect(() => {
      const dialog = this.dialogRef()?.nativeElement;
      if (dialog) {
        if (this.isOpen()) {
          dialog.showModal();
          setTimeout(() => {
            const cancelWrapper = this.cancelBtnRef()?.nativeElement;
            const button = cancelWrapper?.querySelector('button');
            if (button) {
              button.focus();
            } else {
              cancelWrapper?.focus();
            }
          }, 50);
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

  onConfirmDelete() {
    this.confirmDelete.emit(this.taskId());
    this.onClose();
  }
}
