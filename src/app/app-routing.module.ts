import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { GraphComponent } from './graph/graph.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'table', component: TableComponent, pathMatch: 'full' },
  { path: 'charts', component: GraphComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
