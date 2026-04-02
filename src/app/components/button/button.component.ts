import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

const SIZE_MAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-md py-xs text-sm',
  md: 'px-lg py-sm text-md', // token sizes: lg = 24px, sm = 8px, font-size-md = 16px
  lg: 'px-xl py-md text-lg'
};

const VARIANT_MAP: Record<'primary' | 'outline' | 'error', string> = {
  primary: `
    bg-primary text-text-inverse
    hover:bg-primary hover:text-accent hover:shadow-[0_2px_2px_0_var(--color-accent)]
    active:bg-accent active:text-primary active:border-primary
  `,
  outline: `
    bg-bg-default text-text-primary
    hover:bg-bg-default hover:border-accent hover:text-accent hover:shadow-[0_2px_2px_0_var(--color-accent)]
    active:bg-bg-default active:border-accent active:text-accent
  `,
  error: `
    bg-error text-text-inverse
    hover:bg-primary hover:border-primary hover:text-error hover:shadow-[0_2px_2px_0_var(--color-error)]
    active:bg-error active:border-error active:text-text-inverse
  `
};

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<'primary' | 'outline' | 'error'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  ariaLabel = input<string>();

  clicked = output<MouseEvent>();

  /**
   * @ignore
   * Handles the click event on the button.
   * @param event Event
   */
  onClick(event: MouseEvent) {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }

  /**
   * @ignore
   * Computes the CSS classes for the button based on its variant and size.
   */
  buttonClasses = computed(() => {
    const s = this.size();
    const sizeClasses = SIZE_MAP[s] || SIZE_MAP.md;

    const v = this.variant();
    const variantClasses = VARIANT_MAP[v] || VARIANT_MAP.primary;

    return `${sizeClasses} ${variantClasses}`;
  });
}
