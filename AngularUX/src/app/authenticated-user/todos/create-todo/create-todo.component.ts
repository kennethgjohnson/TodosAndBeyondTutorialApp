import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AppSettings } from 'src/app/app.settings';
import { AuthenticationService } from 'src/app/common/authentication/authentication.service';


@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  todo: Todo = new Todo(AppSettings.UNINITIALIZED_ID, "", false, null);
  username: String = "";
  errorMessage: String;

  @ViewChild('description', { read: ElementRef }) descriptionElement: ElementRef;
  @ViewChild('todoForm') angularForm: NgForm;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public todoService: TodoService,
    public authenticator: AuthenticationService) { }

  ngOnInit(): void {
    this.username = this.authenticator.getAuthenticatedUserPrincipal().getUserName();
    this.descriptionElement.nativeElement.focus();

  }

  saveTodo(): void {
    if (this.angularForm.invalid) {
      return;
    }
    this.todoService.createTodo(this.username, this.todo).subscribe(
      response => this.handleSaveTodoSuccess(response),
      response => this.handleSaveTodoError(response)
    );
  }

  handleSaveTodoSuccess(todo: Todo): void {
    this.todo = todo;
    this.router.navigate(["todos"]);
    console.log(todo);
  }

  handleSaveTodoError(response: HttpErrorResponse): void {
    this.errorMessage = response.message + (response.error ? (" " + response.error.error + ": " + response.error.message) : "");
  }



}
