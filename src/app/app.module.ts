import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './app.router.module'; //for router
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CategoryComponent } from './category/category.component';
import { DetailComponent } from './detail/detail.component'
import { PostwriteComponent } from './postwrite/postwrite.component';
import { LoginComponent } from './login/login.component';
import { PosteditComponent } from './postedit/postedit.component';
import { AuthGuard } from './auth.guard'
import { SignupComponent } from './signup/signup.component';

export function tokenGetter(){
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    CategoryComponent,
    DetailComponent,
    PostwriteComponent,
    LoginComponent,
    PosteditComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['api-token-auth'],
        blacklistedRoutes: ['']
      }
    }),
    FormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
