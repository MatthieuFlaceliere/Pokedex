import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign/sign-in/sign-in.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { authGuard } from './guard/auth.guard';
import { HomeModule } from './pages/home/home.module';

const routes: Routes = [
  { path: 'home', loadChildren: () => HomeModule, canActivate: [authGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: AccueilComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
