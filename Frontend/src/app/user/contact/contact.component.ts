import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private api:ApiService, private sanitizer: DomSanitizer){
    this.getBannerDetails()
    this.getCompanyDetails()
  }
  userPage="contact"
  loader = false;
  BannerDetails: any;
  getBannerDetails() {
    this.loader = true;
    this.api.getAllBannerDetails().subscribe((res: any) => {
      for (let data of res.data) {
        if (data.pageName === "Contact") {
          this.BannerDetails = data;
          break;
        }
      }
      this.loader = false;
    });
  }
  mapLocationUrl!: SafeResourceUrl;
  companyDetails:any
  getCompanyDetails() {
   this.loader=true
    this.api.getCompanyInfo().subscribe((res: any) => {
      this.companyDetails=res.data
      this.mapLocationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.companyDetails.mapLocationUrl);
      this.loader=false
    })
  }
  contactForm=new FormGroup({
    "name":new FormControl("",Validators.required),
    "email":new FormControl("",Validators.required),
    "subject":new FormControl("",Validators.required),
    "message":new FormControl("",Validators.required),
  })
  saveMessage(){
   this.loader=true
    if(this.contactForm.valid){
      this.api.saveMessage(this.contactForm.value).subscribe((res:any)=>{
        this.contactForm.reset();
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Message Send Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to send this message..!");
        }
      })
    }
    else{
      alert("Please Provide Correct details..!")
    }
   this.loader=false
  }
  alert(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
