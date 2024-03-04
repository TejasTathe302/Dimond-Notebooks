import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userc',
  templateUrl: './userc.component.html',
  styleUrls: ['./userc.component.scss']
})
export class UsercComponent {
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  loader = false
  ngOnInit(): void {
    this.setCompanyDetailsForm();

  }
  adminpage: any = "userc";
  companyDetails = false;
  companyData: any;
  CompanyDetailsForm!: FormGroup;
  file: any;
  edit = false
  editDet() {
    this.edit = !this.edit
  }
  companyId: any
  getCompanyDetailss() {
    this.edit = false
    this.companyDetails = !this.companyDetails;
    this.loader = true;
    this.api.getCompanyInfo().subscribe((res: any) => {
      this.loader = false
      const data = res.data;
      this.companyId = res.data.id
      this.file = data.logo;
      this.CompanyDetailsForm.patchValue({
        name: data.name,
        address: data.address,
        mobile: data.mobile,
        email: data.email,
        description: data.description,
        facebookLink: data.facebookLink,
        instagramLink: data.instagramLink,
        linkdinLink: data.linkdinLink,
        twiterLink: data.twiterLink,
        mapLocationUrl: data.mapLocationUrl,
        discountPercent: data.discountPercent,
      });
    });
  }
  setCompanyDetailsForm() {
    this.CompanyDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      facebookLink: ['', Validators.required],
      instagramLink: ['', Validators.required],
      linkdinLink: ['', Validators.required],
      twiterLink: ['', Validators.required],
      mapLocationUrl: ['', Validators.required],
      logo: [],
    });
  }
  editCompanyDetails(): void {
    if (this.CompanyDetailsForm.valid) {
      const data = new FormData();
      data.append("name", this.CompanyDetailsForm.value.name);
      data.append("address", this.CompanyDetailsForm.value.address);
      data.append("mobile", this.CompanyDetailsForm.value.mobile);
      data.append("email", this.CompanyDetailsForm.value.email);
      data.append("description", this.CompanyDetailsForm.value.description);
      data.append("facebookLink", this.CompanyDetailsForm.value.facebookLink);
      data.append("instagramLink", this.CompanyDetailsForm.value.instagramLink);
      data.append("linkdinLink", this.CompanyDetailsForm.value.linkdinLink);
      data.append("twiterLink", this.CompanyDetailsForm.value.twiterLink);
      data.append("mapLocationUrl", this.CompanyDetailsForm.value.mapLocationUrl);
      if (this.file) {
        data.append("logo", this.file);
      }
      this.loader = true;
      this.api.editCompanyDetails(this.companyId, data).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to edit this record..!");
        }
        this.loader = false
        this.edit = !this.edit
        this.getCompanyDetailss()
      }
      );
    } else {
      alert("Please provide correct details..!");
    }
  }
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }






  openModel1 = false
  sliderDetails = false
  SliderData: any
  adminAction = ''
  adminMethod = ''
  firstText = ''
  secondText = ''
  thirdText = ''
  fourthText = ''
  fifthText = ''
  sixthText = ''
  seventhText = ''
  secondFile: any
  first = false
  second = false
  third = false
  fourth = false
  fifth = false
  sixth = false
  seventh = false
  image = false
  category = false
  categoryValue = ''
  id = ''
  ProductData: any;
  productDetails = false
  bannerData: any;
  bannerDetails = false
  backgroundData: any;
  backgroundDetails = false
  teamData: any;
  teamDetails = false
  workingData: any;
  workingDetails = false
  messageData: any;
  messageDetails = false
  firstInfo = ''
  secondInfo = ''
  thirdInfo = ''
  fourthInfo = ''
  fifthInfo = ''
  sixthInfo = ''
  seventhInfo = ''
  getDetails(method: any) {
    if (method === "Slider Details") {
      this.getAllSiderDetails()
      this.sliderDetails = !this.sliderDetails
    }
    else if (method === "Product Details") {
      this.getAllProductDetails()
      this.productDetails = !this.productDetails
    }
    else if (method === "Banner Details") {
      this.getAllBannerDetails()
      this.bannerDetails = !this.bannerDetails
    }
    else if (method === "Background Details") {
      this.getAllBackgroundDetails()
      this.backgroundDetails = !this.backgroundDetails
    }
    else if (method === "Team Details") {
      this.getAllTeamDetails()
      this.teamDetails = !this.teamDetails
    }
    else if (method === "Working Area Details") {
      this.getAllWorkingAreaDetails()
      this.workingDetails = !this.workingDetails
    }
    else if (method === "Message Details") {
      this.getAllMessage()
      this.messageDetails = !this.messageDetails
    }
    else {
      this.alert("error", "Oops...", "Something went wrong..!")
    }
  }
  getAllSiderDetails() {
    this.loader = true;
    this.api.getSliderDetails().subscribe((res: any) => {
      this.loader = false
      this.SliderData = res.data;
    })
  }
  getAllProductDetails() {
    this.loader = true;
    this.api.getAllProductDetails().subscribe((res: any) => {
      this.loader = false
      this.ProductData = res.data;
    })
  }
  getAllBannerDetails() {
    this.loader = true;
    this.api.getAllBannerDetails().subscribe((res: any) => {
      this.loader = false
      this.bannerData = res.data;
    })
  }
  getAllBackgroundDetails() {
    this.loader = true;
    this.api.getAllBackgroundDetails().subscribe((res: any) => {
      this.loader = false
      this.backgroundData = res.data;
    })
  }
  getAllTeamDetails() {
    this.loader = true;
    this.api.getAllTeamDetails().subscribe((res: any) => {
      this.loader = false
      this.teamData = res.data;
    })
  }
  getAllWorkingAreaDetails() {
    this.loader = true;
    this.api.getAllWorkingDetails().subscribe((res: any) => {
      this.loader = false
      this.workingData = res.data;
    })
  }
  getAllMessage() {
    this.loader = true;
    this.api.getAllMessage().subscribe((res: any) => {
      this.loader = false
      this.messageData = res.data;
    })
  }
  getDataForEdit(id: any, method: any) {
    this.adminAction = "Edit"
    this.adminMethod = method
    if (method === "Slider Details") {
      this.loader = true;
      this.api.getSliderDetailsForEdit(id).subscribe((res: any) => {
        this.loader = false
        this.id = id
        this.openModel1 = !this.openModel1
        this.firstText = res.data.heading
        this.first = true
        this.firstInfo = "Heading"
        this.secondText = res.data.caption
        this.second = true
        this.secondInfo = "Caption"
        this.secondFile = res.data.image
        this.image = true
      })
    }
    else if (method === "Product Details") {
      this.loader = true;
      this.api.getProductDetailsForEdit(id).subscribe((res: any) => {
        this.loader = false
        this.id = id
        this.openModel1 = !this.openModel1
        this.firstText = res.data.name
        this.first = true
        this.firstInfo = "Name"
        this.categoryValue = res.data.category
        this.category = true
        this.thirdText = res.data.description
        this.third = true
        this.thirdInfo = "Description"
        this.secondFile = res.data.image
        this.image = true
      })
    }
    else if (method === "Banner Details") {
      this.loader = true;
      this.api.getBannerDetailsForEdit(id).subscribe((res: any) => {
        this.loader = false
        this.id = id
        this.openModel1 = !this.openModel1
        this.firstText = res.data.heading
        this.first = true
        this.firstInfo = "Heading"
        this.secondText = res.data.description
        this.second = true
        this.secondInfo = "Description"
        this.secondFile = res.data.image
        this.image = true
      })
    }
    else if (method === "Background Details") {
      this.loader = true;
      this.api.getBackgroundDetailsForEdit(id).subscribe((res: any) => {
        this.loader = false
        this.id = id
        this.openModel1 = !this.openModel1
        this.firstText = res.data.heading
        this.first = true
        this.firstInfo = "Heading"
        this.secondText = res.data.description_first
        this.second = true
        this.secondInfo = "First Desription"
        this.thirdText = res.data.description_second
        this.third = true
        this.thirdInfo = "Second Desription"
        this.secondFile = res.data.image
        this.image = true
      })
    }
    else if (method === "Team Details") {
      this.loader = true;
      this.api.getTeamDetailsForEdit(id).subscribe((res: any) => {
        this.loader = false
        this.id = id
        this.openModel1 = !this.openModel1
        this.firstText = res.data.name
        this.first = true
        this.firstInfo = "Name"
        this.secondText = res.data.position
        this.second = true
        this.secondInfo = "Position"
        this.thirdText = res.data.description
        this.third = true
        this.thirdInfo = "Description"
        this.fourthText = res.data.facebookLink
        this.fourth = true
        this.fourthInfo = "Facebook Link"
        this.fifthText = res.data.twiterLink
        this.fifth = true
        this.fifthInfo = "Twiter Link"
        this.sixthText = res.data.linkdinLink
        this.sixth = true
        this.sixthInfo = "linkdin link"
        this.seventhText = res.data.instagramLink
        this.seventh = true
        this.seventhInfo = "Instagram Link"
        this.secondFile = res.data.image
        this.image = true
      })
    }
    else if (method === "Working Area Details") {
      this.loader = true;
      this.api.getWorkingDetailsForEdit(id).subscribe((res: any) => {
        this.loader = false
        this.id = id
        this.openModel1 = !this.openModel1
        this.firstText = res.data.heading
        this.first = true
        this.firstInfo = "Heading"
        this.secondText = res.data.description
        this.second = true
        this.secondInfo = "Description"
      })
    }
    else {
      this.alert("error", "Oops...", "Something went wrong..!")
    }
  }
  EditAdminDetails() {
    const obj = new FormData()
    if (this.adminMethod === "Slider Details") {
      if (this.secondFile && this.firstText && this.secondText) {
        obj.append("image", this.secondFile)
        obj.append("heading", this.firstText)
        obj.append("caption", this.secondText)
        this.loader = true;
        this.api.editSliderDetails(this.id, obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Edited Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to edit this record..!");
          }
          this.loader = false
          this.getAllSiderDetails()
        })
      }
      else {
        alert("Please fill all the details..!")
        return
      }
    }
    else if (this.adminMethod === "Product Details") {
      if (this.secondFile && this.firstText && this.categoryValue && this.thirdText) {
        obj.append("image", this.secondFile)
        obj.append("name", this.firstText)
        obj.append("category", this.categoryValue)
        obj.append("description", this.thirdText)
        this.loader = true;
        this.api.editProductDetails(this.id, obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Edited Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to edit this record..!");
          }
          this.loader = false
          this.getAllProductDetails()
        })
      }
      else {
        alert("Please fill all the details..!")
        return
      }
    }
    else if (this.adminMethod === "Banner Details") {
      if (this.secondFile && this.firstText && this.secondText) {
        obj.append("image", this.secondFile)
        obj.append("heading", this.firstText)
        obj.append("description", this.secondText)
        this.loader = true;
        this.api.editBannesDetails(this.id, obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Edited Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to edit this record..!");
          }
          this.loader = false
          this.getAllBannerDetails()
        })
      }
      else {
        alert("Please fill all the details..!")
        return
      }
    }
    else if (this.adminMethod === "Background Details") {
      if (this.secondFile && this.firstText && this.secondText && this.thirdText) {
        obj.append("image", this.secondFile)
        obj.append("heading", this.firstText)
        obj.append("description_first", this.secondText)
        obj.append("description_second", this.thirdText)
        this.loader = true;
        this.api.editBackgroundDetails(this.id, obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Edited Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to edit this record..!");
          }
          this.loader = false
          this.getAllBackgroundDetails()
        })
      }
      else {
        alert("Please fill all the details..!")
        return
      }
    }
    else if (this.adminMethod === "Team Details") {
      if (this.secondFile && this.firstText && this.secondText && this.thirdText && this.fourthText && this.fifthText && this.sixthText && this.seventhText) {
        obj.append("image", this.secondFile)
        obj.append("name", this.firstText)
        obj.append("position", this.secondText)
        obj.append("description", this.thirdText)
        obj.append("facebookLink", this.fourthText)
        obj.append("twiterLink", this.fifthText)
        obj.append("linkdinLink", this.sixthText)
        obj.append("instagramLink", this.seventhText)
        this.loader = true;
        this.api.editTeamDetails(this.id, obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Edited Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to edit this record..!");
          }
          this.loader = false
          this.getAllTeamDetails()
        })
      }
      else {
        alert("Please fill all the details..!")
        return
      }
    }
    else if (this.adminMethod === "Working Area Details") {
      if (this.firstText && this.secondText) {
        obj.append("heading", this.firstText)
        obj.append("description", this.secondText)
        this.loader = true;
        this.api.editWorkingDetails(this.id, obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Edited Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to edit this record..!");
          }
          this.loader = false
          this.getAllWorkingAreaDetails()
        })
      }
      else {
        alert("Please fill all the details..!")
        return
      }
    }
    else {
      this.alert("error", "Oops...", "Something went wrong..!")
    }
    this.openModel1 = false
    this.adminAction = ''
    this.adminMethod = ''
    this.firstText = ''
    this.secondText = ''
    this.thirdText = ''
    this.fourthText = ''
    this.fifthText = ''
    this.sixthText = ''
    this.seventhText = ''
    this.first = false
    this.second = false
    this.third = false
    this.fourth = false
    this.image = false
    this.fifth = false
    this.sixth = false
    this.seventh = false
    this.id = ''
    this.secondFile;
    this.category = false
    this.categoryValue = ''

  }
  deleteData(id: any, method: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (method === "Slider Details") {
          this.loader = true;
          this.api.deleteSliderDetails(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false
            this.getAllSiderDetails()
          })
        }
        else if (method === "Product Details") {
          this.loader = true;
          this.api.deleteProductDetails(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false
            this.getAllProductDetails()
          })
        }
        else if (method === "Team Details") {
          this.loader = true;
          this.api.deleteTeamDetails(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false
            this.getAllTeamDetails()
          })
        }
        else if (method === "Working Area Details") {
          this.loader = true;
          this.api.deleteWorkingDetails(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false
            this.getAllWorkingAreaDetails()
          })
        }
        else if (method === "Message Details") {
          this.loader = true;
          this.api.deleteMesasgeDetails(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false
            this.getAllMessage()
          })
        }
        else {

          this.alert("error", "Oops...", "Something went wrong..!")
        }
      }
    });
  }
  addNewDetails(method: any) {
    this.adminAction = "Add"
    this.adminMethod = method
    if (method === "Slider Details") {
      this.openModel1 = !this.openModel1
      this.first = true
      this.firstInfo = "Heading"
      this.second = true
      this.secondInfo = "Caption"
      this.image = true
    }
    else if (method === "Product Details") {
      this.openModel1 = !this.openModel1
      this.first = true
      this.firstInfo = "Name"
      this.category = true
      this.third = true
      this.thirdInfo = "Description"
      this.image = true
    }
    else if (method === "Team Details") {
      this.openModel1 = !this.openModel1
      this.first = true
      this.firstInfo = "Name"
      this.second = true
      this.secondInfo = "Position"
      this.third = true
      this.thirdInfo = "Description"
      this.fourth = true
      this.fourthInfo = "FacebookLink"
      this.fifth = true
      this.fifthInfo = "Twiter Link"
      this.sixth = true
      this.sixthInfo = "Linkdin Link"
      this.seventh = true
      this.seventhInfo = "Intagram Link"
      this.image = true
    }
    else if (method === "Working Area Details") {
      this.openModel1 = !this.openModel1
      this.first = true
      this.firstInfo = "Heading"
      this.second = true
      this.secondInfo = "Description"
    }
  }
  addNewAdminDetails() {
    const obj = new FormData()
    if (this.adminMethod === "Slider Details") {
      if (this.secondFile && this.firstText && this.secondText) {
        obj.append("image", this.secondFile)
        obj.append("heading", this.firstText)
        obj.append("caption", this.secondText)
        this.loader = true;
        this.api.addSliderDetails(obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Added Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to add this record..!");
          }
          this.loader = false
          this.getAllSiderDetails()
        })
      }
      else {
      }
    }
    else if (this.adminMethod === "Product Details") {
      if (this.secondFile && this.firstText && this.categoryValue && this.thirdText) {
        obj.append("image", this.secondFile)
        obj.append("name", this.firstText)
        obj.append("category", this.categoryValue)
        obj.append("description", this.thirdText)
        this.loader = true;
        this.api.addProductDetails(obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Added Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to add this record..!");
          }
          this.loader = false
          this.getAllProductDetails()
        })
      }
      else {
        alert("Please provide correct details.."!)
        return
      }
    }
    else if (this.adminMethod === "Team Details") {
      if (this.secondFile && this.firstText && this.secondText && this.thirdText && this.fourthText && this.fifthText && this.sixthText && this.seventhText) {
        obj.append("image", this.secondFile)
        obj.append("name", this.firstText)
        obj.append("position", this.secondText)
        obj.append("description", this.thirdText)
        obj.append("facebookLink", this.fourthText)
        obj.append("twiterLink", this.fifthText)
        obj.append("linkdinLink", this.sixthText)
        obj.append("instagramLink", this.seventhText)
        this.loader = true;
        this.api.addTeamDetails(obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Added Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to add this record..!");
          }
          this.loader = false
          this.getAllTeamDetails()
        })
      }
      else {
        alert("Please provide correct details..!")
        return
      }
    }
    else if (this.adminMethod === "Working Area Details") {
      if (this.firstText && this.secondText) {
        obj.append("heading", this.firstText)
        obj.append("description", this.secondText)
        this.loader = true;
        this.api.addWorkingDetails(obj).subscribe((res: any) => {
          if (res["status"] === "success") {
            this.alert("success", "Success...!", "Record Added Successfully..!");
          }
          else {
            this.alert("error", "Oops...", "Not able to add this record..!");
          }
          this.loader = false
          this.getAllWorkingAreaDetails()
        })
      }
      else {
        alert("Please fill all the details..!")
        return
      }
    }
    else {
      this.alert("error", "Oops...", "Something went wrong..!")
    }
    this.openModel1 = false
    this.adminAction = ''
    this.adminMethod = ''
    this.firstText = ''
    this.secondText = ''
    this.thirdText = ''
    this.fourthText = ''
    this.first = false
    this.second = false
    this.third = false
    this.fourth = false
    this.image = false
    this.secondFile;
    this.id = ''
    this.category = false
    this.categoryValue = ''
    this.fifthText = ''
    this.sixthText = ''
    this.seventhText = ''
    this.fifth = false
    this.sixth = false
    this.seventh = false
  }
  cancelAdminEdit() {
    this.openModel1 = false
    this.adminAction = ''
    this.adminMethod = ''
    this.firstText = ''
    this.secondText = ''
    this.thirdText = ''
    this.fourthText = ''
    this.first = false
    this.second = false
    this.third = false
    this.fourth = false
    this.secondFile;
    this.image = false
    this.id = ''
    this.category = false
    this.categoryValue = ''
    this.fifth = false
    this.sixth = false
    this.seventh = false
    this.fifthText = ''
    this.sixthText = ''
    this.seventhText = ''
  }
  onFileChangeSecond(event: any) {
    if (event.target.files.length > 0) {
      this.secondFile = event.target.files[0];
    }
  }
  alert(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
