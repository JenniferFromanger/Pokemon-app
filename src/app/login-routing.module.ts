import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
})
export class LoginRoutingModule {}
