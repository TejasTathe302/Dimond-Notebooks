import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  userPage="about"
  constructor(private api:ApiService){
    this.getBannerDetails()
    this.getbackgroundDetails()
    this.getCompanyDetails()
    this.getTemDetails()
    this.getWorkingDetails()
  }
  loader = false;
  BannerDetails: any;
  getBannerDetails() {
    this.loader = true;
    this.api.getAllBannerDetails().subscribe((res: any) => {
      for (let data of res.data) {
        if (data.pageName === "About") {
          this.BannerDetails = data;
          break;
        }
      }
      this.loader = false;
    });
  }
  companyDetails:any
  getCompanyDetails() {
   this.loader=true
    this.api.getCompanyInfo().subscribe((res: any) => {
      this.companyDetails=res.data
      this.loader=false
    })
  }
  backgroundDetails:any
  getbackgroundDetails() {
   this.loader=true
    this.api.getAllBackgroundDetails().subscribe((res: any) => {
      this.backgroundDetails=res.data
      this.loader=false
    })
  }
  teamDetails:any
  getTemDetails(){
    this.loader=true 
    this.api.getAllTeamDetails().subscribe((res: any) => {
      this.teamDetails=res.data
      this.loader=false
    })
  }
  workingDetails:any
  getWorkingDetails(){
    this.loader=true 
    this.api.getAllWorkingDetails().subscribe((res: any) => {
      this.workingDetails=res.data
      this.loader=false
    })
  }
  
}
