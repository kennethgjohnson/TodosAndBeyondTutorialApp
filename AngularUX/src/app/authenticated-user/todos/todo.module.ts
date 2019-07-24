import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListTodosComponent,
    UpdateTodoComponent,
    CreateTodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class TodoModule { }
