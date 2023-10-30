import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { CreatearticleComponent } from './createarticle/createarticle.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '' , redirectTo: '/home' , pathMatch:'full'},
  { path: 'home' , component: HomeComponent},
  { path: 'article/:id' , component: DetailComponent},
  { path: 'create' , component: CreatearticleComponent},
  { path: 'about' , component: AboutComponent},
  { path: 'privacy' , component: PrivacyComponent},
  { path: 'author/:id' , component: AuthorComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: '**' , component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
