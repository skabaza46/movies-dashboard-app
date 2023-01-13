import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { GraphComponent } from './graph/graph.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
// const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
//   { path: 'table', component: TableComponent, canActivate: [AuthGuard], pathMatch: 'full' },
//   { path: 'charts', component: GraphComponent, canActivate: [AuthGuard], pathMatch: 'full' },
//   { path: 'login', component: LoginComponent, pathMatch: 'full' }

// ];

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,},
  { path: 'table', component: TableComponent,  pathMatch: 'full' },
  { path: 'charts', component: GraphComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
