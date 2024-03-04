import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private api: ApiService) {
    this.getCompanyDetails();
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
