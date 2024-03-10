import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {

  }

  getTasks() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
