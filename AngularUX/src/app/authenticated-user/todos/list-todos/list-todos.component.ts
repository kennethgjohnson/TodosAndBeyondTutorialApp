import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/authentication/authentication.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {
  todos: Array<Todo>;

  private username: String = "";
  public message: String = "";
  constructor(
    private router: Router,
    private todoService: TodoService,
    private authenticator: AuthenticationService) { }

  ngOnInit(): void {
    this.username = this.authenticator.getAuthenticatedUserPrincipal().getUserName();
    this.reloadTodos();
  }

  reloadTodos(): void {
    this.todoService.getTodos(this.username).subscribe(
      response => this.handleGetTodosSuccess(response),
      response => this.handleGetTodosError(response)
    );
  }


  isTodoUpdatesEnabled(): Boolean {
    return this.hasResourceRight("TodosUpdate");
  }

  hasResourceRight(resource: String): Boolean {
    return this.authenticator.getAuthenticatedUserPrincipal().hasResource(resource);
  }

  isTodoDeleteEnabled(): Boolean {
    return this.hasResourceRight("TodosDelete");
  }

  isTodoCreatesEnabled(): Boolean {
    return this.hasResourceRight("TodosCreate");
  }

  handleGetTodosSuccess(response: Todo[]): void {
    console.log("handleGetTodosSuccess:" + JSON.stringify(response));
    this.todos = response;
  }

  handleGetTodosError(response: HttpErrorResponse): void {
    let errorMessage: String = response.message + (response.error ? (" " + response.error.error + ": " + response.error.message) : "");
    this.router.navigate([`/error/${encodeURIComponent(<string>errorMessage)}`]);
  }

  deleteTodo(id: Number): void {
    this.todoService.deleteTodo(this.username, id).subscribe(
        response => this.handleDeleteTodoSuccess(response, id),
        response => this.handleDeleteTodoError(response, id)
    );
  }

  handleDeleteTodoSuccess(response: any, id: Number): void {
    this.message = `Todo ${id} successfully deleted.`;
    this.reloadTodos();
  }

  handleDeleteTodoError(response: HttpErrorResponse, id: Number): void {
    if (response.status === 404) {
      this.message = `Todo ${id} already deleted.`;
    } else {
      let errorMessage: String = response.message + (response.error ? (" " + response.error.error + ": " + response.error.message) : "");
      this.router.navigate([`/error/${encodeURIComponent(<string>errorMessage)}`]);
    }
  }

  updateTodo(id: Number): void {
    this.router.navigate([`/todos/${id}/update`]);
  }

  createTodos(): void {
    this.router.navigate([`/todos/create`]);
  }

}

