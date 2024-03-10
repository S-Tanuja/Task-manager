import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TaskServiceService } from '../../task-service.service';
import { log } from 'node:console';

@Component({
  selector: 'main-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-task-list.component.html',
  styleUrl: './main-task-list.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MainTaskListComponent implements OnInit {
  dialogRef: MatDialogRef<TaskDetailsComponent> | null = null;
  tasks!: any[]

  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
   this.getTasks()
  }

  getTasks(){
    this.tasks = [
      { id: 1, title: 'Task 1',taskName : 'Bring Groceries', description:'Rice, Oil, Wheat',dueDate: '2024-03-15', status: false },
      { id: 2, title: 'Task 2',taskName : 'Go Shopping',description:'Kurtis, Pants, Specs', dueDate: '2024-03-20', status: false }
      // Add more tasks as needed
    ];
     // this.taskService.getTasks().subscribe((tasks) => {
    //   this.tasks = tasks;
    // });
  }

  markComplete(taskId: number): void {
    const task = this.tasks.find((t: { id: number; }) => t.id === taskId);
    if (task) {
      task.completed = true;
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((t: { id: number; }) => t.id !== taskId);
  }

  openTaskDetailsDialog(task?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.data = task;
    dialogConfig.position = {};

    if (!this.dialogRef || this.dialogRef.getState() === 2) {
      this.dialogRef = this.dialog.open(TaskDetailsComponent, dialogConfig);

      this.dialogRef.afterClosed().subscribe((formData) => {
        console.log('The dialog was closed');
       if(formData){
        this.tasks.push(formData)
        
        console.log(formData)
       }
         console.log(this.tasks[0])
      });
    } else {
      this.dialogRef.componentInstance.data = task;
    }
  }
}
