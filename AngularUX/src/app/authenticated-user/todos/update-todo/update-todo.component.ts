import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { AuthenticationService } from 'src/app/common/authentication/authentication.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent extends CreateTodoComponent implements OnInit {

  private id: Number;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public todoService: TodoService,
    public authenticator: AuthenticationService) {
    super(route, router, todoService, authenticator);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.id = this.route.snapshot.params['id'];
    this.reloadTodo(this.username, this.id);
  }

  reloadTodo(username: String, id: Number): void {
    this.todoService.getTodo(username, id).subscribe(
      response => this.handleGetTodoSuccess(response),
      response => this.handleGetTodoError(response)
    );
  }

  handleGetTodoSuccess(todo: Todo): void {
    this.todo = todo;
  }

  handleGetTodoError(response: HttpErrorResponse): void {
    let errorMessage: String = response.message + (response.error ? (" " + response.error.error + ": " + response.error.message) : "");
    this.router.navigate([`/error/${encodeURIComponent(<string>errorMessage)}`]);
  }

  saveTodo(): void {
    if (this.angularForm.invalid) {
      return;
    }
    this.todoService.saveTodo(this.username, this.todo).subscribe(
      response => this.handleSaveTodoSuccess(response),
      response => this.handleSaveTodoError(response)
    );
  }

}
