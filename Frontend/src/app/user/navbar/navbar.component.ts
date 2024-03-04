import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input()uPageName:any;
  constructor(private api:ApiService){
    this.getCompanyDetails()
  }
  loader=false
  companyDetails:any
  getCompanyDetails() {
   this.loader=true
    this.api.getCompanyInfo().subscribe((res: any) => {
      this.companyDetails=res.data
      this.loader=false
    })
  }
}
