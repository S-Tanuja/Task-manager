import { Routes } from '@angular/router';
import { MainTaskListComponent } from './features/main-task-list/main-task-list.component';
import { TaskDetailsComponent } from './features/task-details/task-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: MainTaskListComponent },
    { path: 'tasks/:id', component: TaskDetailsComponent },
];
