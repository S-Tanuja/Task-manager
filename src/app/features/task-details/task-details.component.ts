import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  taskForm: FormGroup;
  btnClicked = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<TaskDetailsComponent>) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.taskForm.patchValue(this.data)
    this.data?.status === 'true' ? this.taskForm.get('status')?.setValue('true') : this.taskForm.get('status')?.setValue('false')
  }

  saveChanges(): void {
    this.btnClicked = true
    if (this.taskForm.valid) {
      let formValue
      if (this.data?.id) {
        formValue = {
          ...this.taskForm.value,
          id: this.data.id
        }
      } else {
        formValue = {
          ...this.taskForm.value,
        }
      }
      this.dialogRef.close(formValue);
    } 
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
