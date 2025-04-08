import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { DesafiosComponent } from './desafios/desafios.component';
import { MeusDesafiosComponent } from './meus-desafios/meus-desafios.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "cadastrar", component: CadastrarComponent },
  { path: "desafios", component: DesafiosComponent },
  { path: "meus-desafios", component: MeusDesafiosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
