import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { GraphComponent } from './graph/graph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatDividerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
