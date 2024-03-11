import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'main-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-task-list.component.html',
  styleUrl: './main-task-list.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MainTaskListComponent implements OnInit {
  dialogRef: MatDialogRef<TaskDetailsComponent> | undefined
  tasks!: any[]
  status !: boolean
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getTasksFromLocalStorage()
  }

  getTasks() {
    this.tasks = [
      { id: 1, title: 'Task 1', taskName: 'Bring Groceries', description: 'Rice, Oil, Wheat', dueDate: '2024-03-15', status: 'false' },
      { id: 2, title: 'Task 2', taskName: 'Go Shopping', description: 'Kurtis, Pants, Specs', dueDate: '2024-03-20', status: 'false' }
    ];

//Demonstration of dependency injection

    // this.taskService.getTasks().subscribe((tasks) => {
    //   this.tasks = tasks;
    // });
  }

  updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasksFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks');

      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      } else {
        this.getTasks();
      }
    } else {
      this.getTasks();
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((t: { id: number; }) => t.id !== taskId);
    this.updateLocalStorage()
  }

  generateUniqueId(): string {
    return new Date().getTime().toString();
  }

  //Use of same method to create and update the code to minimise use of components making code efficient

  openTaskDetailsDialog(task?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.data = task || {};
    dialogConfig.disableClose = false

    if (!this.dialogRef || !this.dialogRef.getState() || this.dialogRef.getState() === 2) {
      this.dialogRef = this.dialog.open(TaskDetailsComponent, dialogConfig);

      this.dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          if (!data.id) {
            data.id = this.generateUniqueId(); 
          }
  
          const existingTaskIndex = this.tasks.findIndex((t) => t.id === data.id);
  
          if (existingTaskIndex !== -1) {
            if (!this.tasks[existingTaskIndex].isUpdated) {
              this.tasks[existingTaskIndex] = { ...this.tasks[existingTaskIndex], ...data, isUpdated: true };
            } else {
              this.tasks.push(data);
            }
          } else {
            this.tasks.push(data);
          }  
          this.updateLocalStorage();
        }
      });
    } else {
      this.dialogRef.componentInstance.data = task;
      this.updateLocalStorage()
    }
  }
}
