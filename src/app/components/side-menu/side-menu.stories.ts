import { Meta, StoryObj } from '@storybook/angular';
import { SideMenuComponent } from './side-menu.component';

const meta: Meta<SideMenuComponent> = {
  title: 'Layout/SideMenu',
  component: SideMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    activeView: {
      control: 'radio',
      options: ['inbox', 'today', 'completed']
    },
    navItemClick: { action: 'navItemClick' }
  }
};

export default meta;
type Story = StoryObj<SideMenuComponent>;

export const Default: Story = {
  args: {
    activeView: 'inbox',
    navCounts: {
      inbox: 12,
      today: 5,
      completed: 2
    }
  }
};
