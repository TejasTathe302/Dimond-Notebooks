import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  userPage = "products"
  constructor(private api: ApiService) {
    this.getBannerDetails();
    this.getAppProductDetails();
  }
  loader = false;
  BannerDetails: any;
  getBannerDetails() {
    this.loader = true;
    this.api.getAllBannerDetails().subscribe((res: any) => {
      for (let data of res.data) {
        if (data.pageName === "Products") {
          this.BannerDetails = data;
          break;
        }
      }
      this.loader = false;
    });
  }
  products: any;
  filteredProducts: any[]=[]
  category: any[] = [];
  filterDataBy="All"
  getAppProductDetails() {
    this.loader=true
    this.api.getAllProductDetails().subscribe((res: any) => {
      console.log(res.data);
      this.products = res.data;
      const uniqueCategories = new Set(this.products.map((product: any) => product.category));
      this.category = Array.from(uniqueCategories) as string[];
      this.filteredProducts = this.products;
    });
    this.loader=false
  }
  filterData(method: string) {
    this.filterDataBy = method;
    if (method === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product: any) => product.category === method);
    }
  }
  
}