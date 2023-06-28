import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { authGuard } from './guard/auth.guard';
import { SandBoxComponent } from './sand-box/sand-box.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sandbox', component: SandBoxComponent },
  { path: '', component: AccueilComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
