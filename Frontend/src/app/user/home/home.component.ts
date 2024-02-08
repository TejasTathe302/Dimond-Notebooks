import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userPage="home"
  constructor(private api: ApiService) {
    this.getSliderDetails();
    this.getproductDetails();
    this.getbackgroundDetails()
  }
  loader=false
  sliderDetails:any
  getSliderDetails() {
   this.loader=true
    this.api.getSliderDetails().subscribe((res: any) => {
      this.sliderDetails=res.data
      this.loader=false
    })
  }
  productDetails:any
  getproductDetails() {
   this.loader=true
    this.api.getAllProductDetails().subscribe((res: any) => {
      this.productDetails=res.data
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
}
