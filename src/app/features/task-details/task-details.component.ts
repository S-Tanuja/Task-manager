import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
      taskName: [''],
      title: [''],
      description: [''],
      dueDate: [''],
      status: [false],
    });
  }


  ngOnInit(): void {
    this.taskForm.patchValue(this.data)
    this.data.status === false ? this.taskForm.get('status')?.setValue('Completed') : this.taskForm.get('status')?.setValue('Incomplete')
  }


  saveChanges(form : any): void {
    // if (this.taskForm.valid) {
      // const { taskName, title, description, dueDate, status } = this.taskForm.value;
      // Object.assign(this.data, { taskName, title,
      //    description, dueDate, status });
         console.log(form)
         console.log(this.taskForm.value)
      this.dialogRef.close(this.taskForm.value);
    // }
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
