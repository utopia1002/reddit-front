import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CategoryComponent} from './category/category.component';
import { DetailComponent } from './detail/detail.component';
import { PostwriteComponent } from './postwrite/postwrite.component';
import { LoginComponent } from './login/login.component';
import { PosteditComponent } from './postedit/postedit.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

const AppRoutes: Routes = [
  {path:'', component: MainComponent, pathMatch:'full'},
  {path:'category/:id', component: CategoryComponent },
  {path:'post/add', component:PostwriteComponent, pathMatch:'full',
    canActivate: [AuthGuard]},
  {path:'post/:id', component: DetailComponent },
  {path:'login', component: LoginComponent },
  {path:'post/edit/:id', component: PosteditComponent, pathMatch:'full'},
  {path:'signup', component: SignupComponent },
]
export const AppRouterModule = RouterModule.forRoot(AppRoutes, {useHash: true});
