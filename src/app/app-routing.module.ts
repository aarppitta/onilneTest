import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {'path':'', component : LoginComponent},
  {'path':'login', component : LoginComponent},
  {'path':'register', component : RegisterComponent},
  {'path':'dashboard', component : DashboardComponent},
  {'path':'test', component : TestComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
