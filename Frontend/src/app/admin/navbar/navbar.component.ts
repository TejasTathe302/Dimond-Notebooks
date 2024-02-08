import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input()aPageName:any;
  AdminToken:any;
  constructor(private api:ApiService, private router:Router){
    this.AdminToken=localStorage.getItem("AdminToken")
    this.getAdmin();
  }
  adminName:any;
  getAdmin(){
    if(this.AdminToken){
      this.api.getAdminDetails(this.AdminToken).subscribe((res:any)=>{
        this.adminName=res.data['name']
      })
    }
  }
  logOut(){
    localStorage.removeItem('AdminToken')
    this.AdminToken=false
    this.router.navigate(['admin/login'])
  }
}
