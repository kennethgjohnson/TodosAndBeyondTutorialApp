import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './authenticated-user/welcome/welcome.component';
import { LoginComponent } from './unauthenticated-user/login/login.component';
import { ErrorComponent } from './common/components/error/error.component';
import { MenuComponent } from './common/components/menu/menu.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { LogoutComponent } from './authenticated-user/logout/logout.component';
import { HTTPInterceptorBasicAuthService } from './common/authentication/httpinterceptor-basic-auth.service';
import { AuthenticationService } from './common/authentication/authentication.service';
import { BasicAuthenticationService } from './common/authentication/basic-authentication.service';
import { TodoModule } from './authenticated-user/todos/todo.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TodoModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorBasicAuthService, multi: true},
    {provide: AuthenticationService, useClass: BasicAuthenticationService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
