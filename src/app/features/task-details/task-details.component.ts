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
  taskForm : FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder , private dialogRef : DialogRef) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: [''],
    });
  }


  ngOnInit(): void {
    this.taskForm.setValue(this.data)
    console.log(this.data)
  }

  saveChanges(): void {
    if (this.taskForm.valid) {
      const { taskName, title, description, dueDate, status } = this.taskForm.value;
      Object.assign(this.data, { taskName, title, description, dueDate, status });
      this.dialogRef.close();
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
