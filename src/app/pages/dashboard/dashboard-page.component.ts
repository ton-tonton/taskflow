import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ViewType, NavCounts, SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { AddTaskButton } from '../../components/add-task-button/add-task-button.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';
import { DeleteTaskModalComponent } from '../../components/delete-task-modal/delete-task-modal.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    SideMenuComponent,
    AddTaskButton,
    TaskListComponent,
    AddTaskModalComponent,
    DeleteTaskModalComponent
  ],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private taskService = inject(TaskService);

  activeView = signal<ViewType>('inbox');

  todayTasks = this.taskService.todayTasks;
  completedTasks = this.taskService.completedTasks;

  navCounts = computed<NavCounts>(() => ({
    inbox: this.taskService.inboxCount(),
    today: this.taskService.todayCount(),
    completed: this.taskService.completedCount()
  }));

  // Modals state
  isAddModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  taskToDelete = signal<number | null>(null);

  onAddTaskPrompt(): void {
    this.isAddModalOpen.set(true);
  }

  onAddTask(task: Task): void {
    this.taskService.addTask(task.text);
  }

  onAddModalClosed(): void {
    this.isAddModalOpen.set(false);
  }

  onToggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  onDeleteTaskPrompt(id: number): void {
    this.taskToDelete.set(id);
    this.isDeleteModalOpen.set(true);
  }

  onConfirmDelete(id: number): void {
    this.taskService.deleteTask(id);
  }

  onDeleteModalClosed(): void {
    this.isDeleteModalOpen.set(false);
    this.taskToDelete.set(null);
  }
}
