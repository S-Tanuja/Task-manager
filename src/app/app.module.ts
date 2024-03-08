import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { MainTaskListComponent } from './features/main-task-list/main-task-list.component'; 
import { TaskDetailsComponent } from './features/task-details/task-details.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';
import { HttpClient } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    MainTaskListComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    CommonModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule ,
    HttpClient 
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
