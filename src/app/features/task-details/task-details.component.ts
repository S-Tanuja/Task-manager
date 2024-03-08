import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { log } from 'console';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  @Input() data: any
  taskForm !: FormGroup;

  constructor(private fb: FormBuilder , private dialogRef : DialogRef) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: [this.data.taskName, Validators.required],
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      dueDate: [this.data.dueDate, Validators.required],
      status: [this.data.status],
    });
  }

  saveChanges(): void {
    if (this.taskForm.valid) {
      const { taskName, title, description, dueDate, status } = this.taskForm.value;
      Object.assign(this.data, { taskName, title, description, dueDate, status });
      this.dialogRef.close();
    }
  }

}
