import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faListCheck,
  faInbox,
  faCalendarDay,
  faCalendarWeek
} from '@fortawesome/free-solid-svg-icons';

export type ViewType = 'inbox' | 'today' | 'completed';

export type NavCounts = Partial<Record<ViewType, number>>;

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block h-full w-[250px] bg-springwood-100 overflow-clip border-r border-springwood-200'
  }
})
export class SideMenuComponent {
  activeView = input.required<ViewType>();
  navCounts = input<NavCounts>({ inbox: 0, today: 0, completed: 0 });

  navItemClick = output<ViewType>();

  icons = {
    logo: faListCheck,
    inbox: faInbox,
    today: faCalendarDay,
    completed: faCalendarWeek
  };

  menuItems: { id: ViewType; label: string; icon: any }[] = [
    { id: 'inbox', label: 'Inbox', icon: this.icons.inbox },
    { id: 'today', label: 'Today', icon: this.icons.today },
    { id: 'completed', label: 'Completed', icon: this.icons.completed }
  ];
}
