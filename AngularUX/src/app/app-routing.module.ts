import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './unauthenticated-user/login/login.component';
import { WelcomeComponent } from './authenticated-user/welcome/welcome.component';
import { ErrorComponent } from './common/components/error/error.component';
import { ListTodosComponent } from './authenticated-user/todos/list-todos/list-todos.component';
import { LogoutComponent } from './authenticated-user/logout/logout.component';
import { RouteGuardService } from './common/authentication/route-guard.service';
import { UpdateTodoComponent } from './authenticated-user/todos/update-todo/update-todo.component';
import { CreateTodoComponent } from './authenticated-user/todos/create-todo/create-todo.component';
import { Resources } from './common/authentication/resources';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {
    path: "welcome/:name", component: WelcomeComponent, canActivate: [RouteGuardService],
    data: { requiredPrincipal: Resources.WELCOME_RESOURCE }
  },
  {
    path: "todos", component: ListTodosComponent, canActivate: [RouteGuardService],
    data: { requiredPrincipal: Resources.TODOS_RESOURCE }
  },
  {
    path: "todos/create", component: CreateTodoComponent, canActivate: [RouteGuardService],
    data: { requiredPrincipal: Resources.TODOS_CREATE_RESOURCE }
  },
  {
    path: "todos/:id/update", component: UpdateTodoComponent, canActivate: [RouteGuardService],
    data: { requiredPrincipal: Resources.TODOS_UPDATE_RESOURCE }
  },
  { path: "logout", component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: "error/:error", component: ErrorComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
