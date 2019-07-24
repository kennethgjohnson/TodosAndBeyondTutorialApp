import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { AppSettings } from 'src/app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public getTodos(username: String): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${AppSettings.API_URL}/user/${username}/todos`);
  }

  public getTodo(username: String, id: Number): Observable<Todo> {
    return this.http.get<Todo>(`${AppSettings.API_URL}/user/${username}/todos/${id}`);
  }

  public saveTodo(username: String, todo: Todo):  Observable<Todo> {
    return this.http.put<Todo>(`${AppSettings.API_URL}/user/${username}/todos/${todo.id}`, todo);
  }

  public createTodo(username: String, todo: Todo):  Observable<Todo> {
    return this.http.post<Todo>(`${AppSettings.API_URL}/user/${username}/todos`, todo);
  }

  public deleteTodo(username: String, id: Number): Observable<void> {
    return this.http.delete<void>(`${AppSettings.API_URL}/user/${username}/todos/${id}`);
  }
}
