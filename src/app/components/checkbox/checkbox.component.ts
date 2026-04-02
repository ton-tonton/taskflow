import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkbox',
  imports: [FaIconComponent],
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  ariaLabel = input<string | undefined>(undefined);

  /**
   * Event emitted when the checkbox state changes.
   */
  checkedChange = output<boolean>();

  /**
   * @ignore
   * Unchecked state icon.
   */
  readonly faSquare = faSquare;

  /**
   * @ignore
   * Checked state icon.
   */
  readonly faSquareCheck = faSquareCheck;

  /**
   * @ignore
   * Handles the native change event and emits the new state.
   * @param event Event
   */
  onCheckChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
