import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'main-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-task-list.component.html',
  styleUrl: './main-task-list.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MainTaskListComponent {
  dialogRef: MatDialogRef<TaskDetailsComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  tasks: any = [
    { id: 1, title: 'Task 1', dueDate: '2024-03-15', completed: false },
    { id: 2, title: 'Task 2', dueDate: '2024-03-20', completed: false }
    // Add more tasks as needed
  ];

  markComplete(taskId: number): void {
    const task = this.tasks.find((t: { id: number; }) => t.id === taskId);
    if (task) {
      task.completed = true;
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((t: { id: number; }) => t.id !== taskId);
  }

  openTaskDetailsDialog(task: any): void {
    if (!this.dialogRef || this.dialogRef.getState() === 2) {
      this.dialogRef = this.dialog.open(TaskDetailsComponent, {
        width: '400px',
        data: task,
      });

      this.dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    } else {
      this.dialogRef.componentInstance.data = task;
    }
  }
}
