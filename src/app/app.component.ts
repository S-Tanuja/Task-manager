import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { popOutAnimation  } from './animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [popOutAnimation],
})
export class AppComponent {
  title = 'task-manager';
}
