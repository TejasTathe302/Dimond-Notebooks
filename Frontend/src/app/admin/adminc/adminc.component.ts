import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminc',
  templateUrl: './adminc.component.html',
  styleUrls: ['./adminc.component.scss']
})
export class AdmincComponent {
  adminpage: any = "adminc";
  loader = false;
  ngModelValue11:any ;
  constructor(private api: ApiService, private router: Router) {
  }
  paymentMethod = false;
  GstData = false;
  paperCustomer = false;
  purchesPaperProduts = false;
  coverCustomer = false;
  purchesCoverProduts = false;
  Manufacturer = false;
  ManufacturedProduts = false;
  SellCustomer = false;
  getDetails(method: any) {
    if (method === "Payment Method Details") {
      this.paymentMethod = !this.paymentMethod;
      this.getPaymentMethods()
    }
    else if (method === "Gst Percent Details") {
      this.GstData = !this.GstData;
      this.getGstPercents()
    }
    else if (method === "Purches Paper Customer Details") {
      this.paperCustomer = !this.paperCustomer;
      this.getPapercustomerNames()
    }
    else if (method === "Purches Paper Product Details") {
      this.purchesPaperProduts = !this.purchesPaperProduts;
      this.getPurchesProductName()
    }
    else if (method === "Purches Cover Customer Details") {
      this.coverCustomer = !this.coverCustomer;
      this.getPurchesCoverCustomerName()
    }
    else if (method === "Purches Cover Product Details") {
      this.purchesCoverProduts = !this.purchesCoverProduts;
      this.getPurchesCoverProductName()
    }
    else if (method === "Manufacturer Details") {
      this.Manufacturer = !this.Manufacturer;
      this.getManufacturerName()
    }
    else if (method === "Manufactured Product Details") {
      this.ManufacturedProduts = !this.ManufacturedProduts;
      this.getManufacturedProdutsName()
    }
    else if (method === "Sell Customer Details") {
      this.SellCustomer = !this.SellCustomer;
      this.getSellCustomerData()
    }
    else {
      this.alert("error", "Oops...", "Something Went Wrong..!");
    }
  }


  payment: any;
  getPaymentMethods() {
    this.loader = true;
    this.api.getPaymentMethods().subscribe((res: any) => {
      this.loader = false;
      this.payment = res.data;
    })
  }
  GstPercent: any;
  getGstPercents() {
    this.loader = true;
    this.api.getGstPercent().subscribe((res: any) => {
      this.loader = false;
      this.GstPercent = res.data;
    })
  }
  paperCustomerData: any;
  getPapercustomerNames() {
    this.loader = true;
    this.api.getPurchesPartyName().subscribe((res: any) => {
      this.loader = false;
      this.paperCustomerData = res.data;
    })
  }
  purchesPaperProdutData: any;
  getPurchesProductName() {
    this.loader = true;
    this.api.getPurchesProductName().subscribe((res: any) => {
      this.loader = false;
      this.purchesPaperProdutData = res.data;
    })
  }
  purchescoverCustomerData: any;
  getPurchesCoverCustomerName() {
    this.loader = true;
    this.api.getPurchesCoverPartyName().subscribe((res: any) => {
      this.loader = false;
      this.purchescoverCustomerData = res.data;
    })
  }
  purchesCoverProdutData: any;
  getPurchesCoverProductName() {
    this.loader = true;
    this.api.getPurchesCoverProductName().subscribe((res: any) => {
      this.loader = false;
      this.purchesCoverProdutData = res.data;
    })
  }
  ManufacturerData: any;
  getManufacturerName() {
    this.loader = true;
    this.api.getManufacturerName().subscribe((res: any) => {
      this.loader = false;
      this.ManufacturerData = res.data;
    })
  }
  ManufacturedProdutsData: any;
  getManufacturedProdutsName() {
    this.loader = true;
    this.api.getManufactureProductName().subscribe((res: any) => {
      this.loader = false;
      this.ManufacturedProdutsData = res.data;
    })
  }
  SellCustomerData: any;
  getSellCustomerData() {
    this.loader = true;
    this.api.getSellProductPartyName().subscribe((res: any) => {
      this.loader = false;
      this.SellCustomerData = res.data;
    })
  }
  openModel = false
  MethodId: any;
  getDataForEdit(id: any, method: any) {
    if (method === "Payment Method Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getPaymentMethod(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else if (method === "Gst Percent Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getGstPercent1(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.GstPercent;
      })
    }
    else if (method === "Purches Paper Customer Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getPaperCustomerName(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else if (method === "Purches Paper Product Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getPurchesProductPaperName(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else if (method === "Purches Cover Customer Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getPurchesProductCoverPartyName(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else if (method === "Purches Cover Product Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getPurchesProductCoverName(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else if (method === "Manufacturer Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getManufacturerNamee(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else if (method === "Manufactured Product Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getManufacturedProductNamee(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else if (method === "Sell Customer Details") {
      this.MethodId = id;
      this.loader = true;
      this.api.getSellCustomer(id).subscribe((res: any) => {
        this.loader = false;
        this.openModel = !this.openModel
        this.ngModelValue11 = res.data.name;
      })
    }
    else {
      this.alert("error", "Oops...", "Something Went Wrong..!");
    }
    this.Action = "Edit"
    this.method = method
  }
  cancelEdit() {
    this.openModel = !this.openModel
    this.ngModelValue11 = ''
    this.MethodId = 0
  }
  Action = ''
  method: any;
  addNewDetails(method: any) {
    this.openModel = !this.openModel
    this.method = method
    this.Action = "Add"
  }

  EditDetails() {
    const obj={"name":this.ngModelValue11}
    if(this.ngModelValue11==''){
      alert('Please Provide Correct Details...')
    }
    else{
    if (this.method === "Payment Method Details") {
      this.loader = true;
      this.api.editPaymentMethod(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getPaymentMethods();
      })
    }
    else if (this.method === "Gst Percent Details") {
      const obj1 = { "GstPercent": this.ngModelValue11 }
      this.loader = true;
      this.api.editGstPercent(this.MethodId, obj1).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getGstPercents();
      })
    }
    else if (this.method === "Purches Paper Customer Details") {
      this.loader = true;
      this.api.edditPurchesPartyName(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getPapercustomerNames();
      })
    }
    else if (this.method === "Purches Paper Product Details") {
      this.loader = true;
      this.api.edditPurchesPaperProductName(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getPurchesProductName();
      })
    }
    else if (this.method === "Purches Cover Customer Details") {
      this.loader = true;
      this.api.edditPurchesCoverPartyName(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getPurchesCoverCustomerName();
      })
    }
    else if (this.method === "Purches Cover Product Details") {
      this.loader = true;
      this.api.edditPurchesCoverProductName(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getPurchesCoverProductName();
      })
    }
    else if (this.method === "Manufacturer Details") {
      this.loader = true;
      this.api.edditManufacturerName(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getManufacturerName();
      })
    }
    else if (this.method === "Manufactured Product Details") {
      this.loader = true;
      this.api.edditManufacturedProdutName(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getManufacturedProdutsName();
      })
    }
    else if (this.method === "Sell Customer Details") {
      this.loader = true;
      this.api.edditSellCustomerName(this.MethodId, obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to Edit this record..!");
        }
        this.loader = false;
        this.getSellCustomerData();
      })
    }
    else {
      this.alert("error", "Oops...", "Something Went Wrong..!");

    }
    this.openModel = !this.openModel
    this.ngModelValue11 = '';
    this.method = ''
  }
  }

  AddNewDetails() {
    if(this.ngModelValue11==''){
      alert('Please Provide Correct Details...')
    }
    else{
    const obj = { "name": this.ngModelValue11 }
    if (this.method === 'paymentMethod') {
      this.loader = true;
      this.api.addPaymentMethod(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getPaymentMethods();
      })
    }
    else if (this.method === 'paperCustomer') {
      this.loader = true;
      this.api.addPurchesPartyName(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getPapercustomerNames();
      })
    }
    else if (this.method === 'purchesPaperProduts') {
      this.loader = true;
      this.api.addPurchesProductName(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getPurchesProductName();
      })
    }
    else if (this.method === 'coverCustomer') {
      this.loader = true;
      this.api.addPurchesCoverPartyName(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getPurchesCoverCustomerName();
      })
    }
    else if (this.method === 'purchesCoverProduts') {
      this.loader = true;
      this.api.addPurchesCoverProductName(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getPurchesCoverProductName();
      })
    }
    else if (this.method === 'Manufacturer') {
      this.loader = true;
      this.api.addManufacturerName(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getManufacturerName();
      })
    }
    else if (this.method === 'ManufacturedProduts') {
      this.loader = true;
      this.api.addManufactureProductName(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getManufacturedProdutsName();
      })
    }
    else if (this.method === 'SellCustomer') {
      this.loader = true;
      this.api.addSellProductPartyName(obj).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getSellCustomerData();
      })
    }
    else {
      this.alert("error", "Oops...", "Something Went Wrong..!");
    }
    this.openModel = !this.openModel
    this.ngModelValue11 = '';
    this.method = ''  
  }
  }

  deletePayment(id: any, method: any) {
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
        if (method === 'paymentMethod') {
          this.loader = true;
          this.api.deletePaymentMethod(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false;
            this.getPaymentMethods();
          })
        }
        else if (method === 'paperCustomer') {
          this.loader = true;
          this.api.deletePurchesPaperCustomer(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false;
            this.getPapercustomerNames();
          })
        }
        else if (method === 'coverCustomer') {
          this.loader = true;
          this.api.deletePurchesCoverCustomer(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false;
            this.getPurchesCoverCustomerName();
          })
        }
        else if (method === 'Manufacturer') {
          this.loader = true;
          this.api.deleteManufacturer(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false;
            this.getManufacturerName();
          })
        }
        else if (method === 'SellCustomer') {
          this.loader = true;
          this.api.deleteSellCustomer(id).subscribe((res: any) => {
            if (res["status"] === "success") {
              this.alert("success", "Success...!", "Record Deleted Successfully..!");
            }
            else {
              this.alert("error", "Oops...", "Not able to delete this record..!");
            }
            this.loader = false;
            this.getSellCustomerData();
          })
        }
        else {
          this.alert("error", "Oops...", "Something went wrong..!");
        }
      }
    });
  }
  alert(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
  // edit admin details start

  openModel1 = false;
  adminDetails = false;
  adminData: any
  hideAdminAllDetails() {
    this.adminDetails = !this.adminDetails
  }
  openModel2 = false
  openTable() {
    this.openModel2 = true
  }
  closeCodemodel() {
    this.openModel2 = false
  }
  adminCode = '';
  chechAdminCode() {
    if (this.adminCode === "dimond") {
      this.getAdminAllDetails();
      this.adminDetails = !this.adminDetails
      this.openModel2 = false
    }
    else {
      this.alert("error", "Oops...", "Please Provide Correct Code..!");
    }
  }
  getAdminAllDetails() {
    this.loader = true;
    this.api.getAdminAllDetails().subscribe((res: any) => {
      this.loader = false;
      this.adminData = res.data
    })
  }
  AdmindetailsForm = new FormGroup({
    "name": new FormControl('', Validators.required),
    "email": new FormControl('', Validators.required),
    "mobile": new FormControl('', Validators.required),
    "password": new FormControl('', Validators.required)
  })
  adminAction = '';
  adminMethod = '';
  adminId = 0;
  getAdminDataForEdit(id: any) {
    this.loader = true;
    this.api.getAdminDataForEdit(id).subscribe((res: any) => {
      this.loader = false;
      this.openModel1 = !this.openModel1
      this.adminAction = 'Edit'
      this.adminMethod = "admin details"
      this.AdmindetailsForm.patchValue({
        name: res.data.name,
        email: res.data.email,
        mobile: res.data.mobile,
        password: res.data.password
      })
      this.adminId = res.data.id
    })
  }
  EditAdminDetails() {
    if (this.AdmindetailsForm.valid) {
      this.loader = true;
      this.api.editAdminData(this.adminId, this.AdmindetailsForm.value).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "Record Edited Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to edit this record..!");
        }
        this.loader = false;
        this.getAdminAllDetails();
        this.openModel1 = !this.openModel1;
        this.adminAction = ""
        this.adminMethod = ""
        this.AdmindetailsForm.reset();
        this.adminId = 0
      })
    }
    else {
      this.alert("error", "Oops...", "Please provide correct details..!");
    }
  }
  addNew() {
    this.adminMethod = "admin details"
    this.adminAction = 'Add'
    this.openModel1 = !this.openModel1;
  }
  addNewAdminDetails() {
    if (this.AdmindetailsForm.valid) {
      this.adminMethod = "admin details"
      this.openModel1 = !this.openModel1;
      this.loader = true;
      this.api.addNewAdminData(this.AdmindetailsForm.value).subscribe((res: any) => {
        if (res["status"] === "success") {
          this.alert("success", "Success...!", "New Record Added Successfully..!");
        }
        else {
          this.alert("error", "Oops...", "Not able to add this record..!");
        }
        this.loader = false;
        this.getAdminAllDetails();
        this.adminAction = ""
      })
    }
    else {
      this.alert("error", "Oops...", "Please provide correct details..!");
    }
  }
  deleteAdmin(id: any) {
    this.loader = true;
    this.api.deleteAdmin(id).subscribe((res: any) => {
      if (res["status"] === "success") {
        this.alert("success", "Success...!", "Record Deleted Successfully..!");
      }
      else {
        this.alert("error", "Oops...", "Not able to delete this record..!");
      }
      this.loader = false;
      this.getAdminAllDetails();
    })
  }
  cancelAdminEdit() {
    this.openModel1 = !this.openModel1
    this.adminAction = ""
    this.adminMethod = ""
    this.AdmindetailsForm.reset();
    this.adminId = 0
  }
  // edit admin details end
}
