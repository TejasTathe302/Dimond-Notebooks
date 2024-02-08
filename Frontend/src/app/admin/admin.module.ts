import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PaperComponent } from './paper/paper.component';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { HistoryComponent } from './history/history.component';
import { UsercComponent } from './userc/userc.component';
import { AdmincComponent } from './adminc/adminc.component';
import { SellComponent } from './sell/sell.component';
import { PrintBillComponent } from './print-bill/print-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoverComponent } from './cover/cover.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgChartsModule } from 'ng2-charts';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PaperComponent,
    ManufactureComponent,
    HistoryComponent,
    UsercComponent,
    AdmincComponent,
    SellComponent,
    PrintBillComponent,
    CoverComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    NgChartsModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class AdminModule { }
