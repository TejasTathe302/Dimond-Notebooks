import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaperComponent } from './paper/paper.component';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { HistoryComponent } from './history/history.component';
import { UsercComponent } from './userc/userc.component';
import { AdmincComponent } from './adminc/adminc.component';
import { SellComponent } from './sell/sell.component';
import { PrintBillComponent } from './print-bill/print-bill.component';
import { CoverComponent } from './cover/cover.component';
import { FooterComponent } from './footer/footer.component';
import { adminGuard } from '../admin.guard';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[adminGuard]},
  {path:"home",component:HomeComponent,canActivate:[adminGuard]},
  {path:"login",component:LoginComponent},
  {path:"paper",component:PaperComponent,canActivate:[adminGuard]},
  {path:"cover",component:CoverComponent,canActivate:[adminGuard]},
  {path:"manufacture",component:ManufactureComponent,canActivate:[adminGuard]},
  {path:"history",component:HistoryComponent,canActivate:[adminGuard]},
  {path:"userc",component:UsercComponent,canActivate:[adminGuard]},
  {path:"adminc",component:AdmincComponent,canActivate:[adminGuard]},
  {path:"sell",component:SellComponent,canActivate:[adminGuard]},
  {path:"footer",component:FooterComponent,canActivate:[adminGuard]},
  {path:"printBill/:token",component:PrintBillComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
