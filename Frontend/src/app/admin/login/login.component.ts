import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private api: ApiService, private router: Router) { }
  adminpage = "login"
  
  adminLoginForm = new FormGroup({
    "admin_login_uname_mobile": new FormControl("", Validators.required),
    "admin_login_password": new FormControl("", Validators.required),
  })
  doLogin() {
    if (this.adminLoginForm.invalid) {
      this.alert("error","Opps..!", "Please Provide Correct Details..!");
      this.adminLoginForm.patchValue(
        {
          admin_login_uname_mobile: "",
          admin_login_password: ""
        }
      )
    }
    else {
      this.api.doAdminLogin(this.adminLoginForm.value).subscribe((res: any) => {
        if (res.status == "success") {
          this.alert("success","Success..!", "Login Successfull..!");
          localStorage.setItem("AdminToken", res.token)
          this.router.navigate(['/admin/home'])
        }
        else {
          this.alert("error","Oops...!", "Please Provide Correct Details..!");
          this.adminLoginForm.patchValue(
            {
              admin_login_uname_mobile: "",
              admin_login_password: ""
            }
          )
        }
      })

    }
    
  }
  alert(icon:any,title:any,text:any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}

