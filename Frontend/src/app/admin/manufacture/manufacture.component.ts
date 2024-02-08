import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss'],
})
export class ManufactureComponent implements OnInit {
  adminpage: any = "manufacture";
  productForm!: FormGroup;
  method: any = "Add new"
  loader = false;
  @ViewChildren('inputField') inputFields: QueryList<ElementRef> | undefined;
  setFocus(): void {
    setTimeout(() => {
      if (this.inputFields && this.inputFields.length > 0) {
        const lastInputField = this.inputFields.last.nativeElement;
        lastInputField.focus();
      }
    });
  }
  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.GetUnits();
    this.GetPary();
    this.getPurchesCoverName();
    this.getPurchesProductName();
    this.getManufactureProductName();
    this.getBillNo();
  }
  myDate = new Date();
  day = String(this.myDate.getDate()).padStart(2, '0');
  month = String(this.myDate.getMonth() + 1).padStart(2, '0'); // January is 0!
  year = this.myDate.getFullYear();
  formattedDate = `${this.day}-${this.month}-${this.year}`;
  setdate() {
    this.productForm.patchValue({
      staticData: {
        date: this.formattedDate
      }
    });
  }
  showModal1: boolean = false;
  openModal(): void {
    this.showModal1 = true;
  }
  closeModal1(newItem: any) {
    if (newItem !== '') {
      var obj = { "name": newItem };
      this.loader = true;
      this.api.addPurchesProductName(obj).subscribe((res) => {
        this.loader = false;
        this.router.navigate(['/admin']).then(() => {
          this.router.navigate(["/admin/manufacture"]);
        });
      })
    }
    this.showModal1 = false;
  }
  closeModal1Direct() {
    this.showModal1 = false;
  }
  products: any;
  getManufactureProductName() {
    this.loader = true;
    this.api.getManufactureProductName().subscribe((res: any) => {
      this.loader = false;
      this.products = res.data;
    })
  }
  party: any;
  GetPary() {
    this.loader = true;
    this.api.getManufacturerName().subscribe((res: any) => {
      this.loader = false;
      this.party = res.data;
    })
  }
  showModal: boolean = false;
  handleChange(selectedValue: string): void {
    if (selectedValue === 'modal') {
      this.showModal = true;
    } else {
      this.showModal = false;
    }
  }
  closeModal(newParty: string): void {
    if (newParty !== '') {
      var obj = { "name": newParty };
      this.loader = true;
      this.api.addManufacturerName(obj).subscribe((res) => {
        this.loader = false;
        this.productForm.patchValue({
          staticData: {
            manufacturer_name: newParty
          }
        });
        this.GetPary();
      });
    } else {
      this.productForm.patchValue({
        staticData: {
          manufacturer_name: ''
        }
      });
    }
    this.showModal = false;
  }
  closeModalDirect() {
    this.showModal = false;
    this.productForm.patchValue({
      staticData: {
        manufacturer_name: ''
      }
    });
  }
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      staticData: this.formBuilder.group({
        manufacturer_name: ['', Validators.required],
        date: [''],
        totalQuantity: [0]
      }),
      products: this.formBuilder.array([this.initProduct()])
    });
    this.setdate();
  }
  initProduct() {
    return this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      paper: ['', Validators.required],
      cover: ['', Validators.required],
      unit: ['', Validators.required],
      manufacture_expences: ['', Validators.required]
    });
  }
  get productArray() {
    return this.productForm.get('products') as FormArray;
  }
  units: any;
  GetUnits() {
    this.loader = true;
    this.api.getPurchesUnits().subscribe((res: any) => {
      this.loader = false;
      this.units = res.data;
    })
  }
  paper: any;
  getPurchesProductName() {
    this.loader = true;
    this.api.getPurchesProductName().subscribe((res: any) => {
      this.loader = false;
      this.paper = res.data;
    })
  }
  cover: any;
  getPurchesCoverName() {
    this.loader = true;
    this.api.getPurchesCoverProductName().subscribe((res: any) => {
      this.loader = false;
      this.cover = res.data;
    })
  }
  addRow() {
    const control = this.productForm.get('products') as FormArray;
    control.push(this.initProduct());
    this.setFocus();
  }
  removeRow(index: number) {
    const control = this.productForm.get('products') as FormArray;
    control.removeAt(index);
  }
  
  calculateAmount(index: number) {
    let totalQuantity = 0;
    const sd = this.productForm.value;
    for (const product of sd.products) {
      const productQuantity = Number(product.quantity);
      const productUnit = product.unit;
      if (productUnit === "DZN") {
        totalQuantity += productQuantity * 12;
      } else {
        totalQuantity += productQuantity;
      }
    }
    this.productForm.patchValue({
      staticData: {
        totalQuantity: totalQuantity
      }
    });
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      for (let data of this.productForm.value.products) {
        let quanti = data.quantity;
        if (data.unit === "DZN") {
          quanti = quanti * 12;
        }
        for (let pa of this.paper) {
          if (pa.name === data.paper) {
            if (pa.quantity < quanti) {
              alert("Please cheack Paper stock of " + data.paper)
              return
            }
          }
        }
        for (let co of this.cover) {
          if (co.name === data.cover) {
            if (co.quantity < quanti) {
              alert("Please cheack Cover stock of " + data.cover)
              return
            }
          }
        }
      }
      this.loader = true;
      this.api.addManufactureProduct(this.productForm.value).subscribe((res: any) => {
        this.loader = false;
        if (res["status"] === "success") {
          this.alert("success","Success...!", "Bill Saved Succesfully..!");
          this.router.navigate(['/admin']).then(() => {
            this.router.navigate(["/admin/manufacture"]);
          });
        }
        else{
          this.alert("error","Oops...", "Something went wrong..!");
        }
      });
    }
    else {
      this.logInvalidControls(this.productForm);
    }
  }
  logInvalidControls(formGroup: FormGroup | FormArray) {
    let invalidFound = false;
    Object.keys(formGroup.controls).forEach(field => {
      if (!invalidFound) {
        const control = formGroup.get(field);
        if (control instanceof FormControl && control.invalid) {
          alert("Please Provide Correct : " + field);
          invalidFound = true;
        } else if (control instanceof FormGroup || control instanceof FormArray) {
          this.logInvalidControls(control);
          if (invalidFound) return;
        }
      }
    });
  }
  allBills: any[] = [];
  filteredBills: any[] = [];
  page: number = 1;
  count: number = 0;
  tableSizes: number[] = [5, 10, 25, 50];
  tableSize: number = 5;
  searchText: string = '';

  monthBills: { [key: string]: any[] } = {};
  selectedMonth: string = '';
  getAllPurchaseBill() {
    this.loader = true;
    this.api.getAllMnufactureProduct().subscribe((res: any) => {
      this.loader = false;
      this.allBills = res.data;
      this.groupBillsByMonth();
      this.applySearchFilter();
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.applySearchFilter();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event;
    this.page = 1;
    this.applySearchFilter();
  }
  groupBillsByMonth() {
    this.allBills.forEach((bill: any) => {
      const billDate = this.parseDate(bill.date);
      const monthYearKey = `${billDate.getMonth() + 1}-${billDate.getFullYear()}`;
      if (!this.monthBills[monthYearKey]) {
        this.monthBills[monthYearKey] = [];
      }
      this.monthBills[monthYearKey].push(bill);
    });
  }
  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  onMonthChange(selectedMonth: string) {
    this.selectedMonth = selectedMonth;
    this.page = 1;
    this.applySearchFilter();
  }
  applySearchFilter() {
    this.filteredBills = [...this.allBills];
    if (this.searchText) {
      this.filteredBills = this.filteredBills.filter((bill) =>
        bill.manufacturer_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        bill.date.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    if (this.selectedMonth) {
      this.filteredBills = this.filteredBills.filter((bill) => {
        const billDate = this.parseDate(bill.date);
        const monthYearKey = `${billDate.getMonth() + 1}-${billDate.getFullYear()}`;
        return monthYearKey === this.selectedMonth;
      });
    }
    this.count = this.filteredBills.length;
  }

  getMonths(): string[] {
    return Object.keys(this.monthBills);
  }
  calculateTotal(column: string): number {
    if (Array.isArray(this.products)) {
      return this.products.reduce((total: any, data: any) => Number(total) + Number(data[column]), 0);
    } else {
      return 0;
    }
  }
  calculateTotalt(column: string): number {
    if (Array.isArray(this.filteredBills)) {
      return this.filteredBills.reduce((total: any, data: any) => Number(total) + Number(data[column]), 0);
    } else {
      return 0;
    }
  }
  billdet = false;
  ManBilldet() {
    this.billdet = !this.billdet;
    if (this.billdet) {
      this.getAllPurchaseBill();
    }
  }
  stockdet = false;
  ManStockdet() {
    this.stockdet = !this.stockdet;
  }
  showModal2: boolean = false;
  closeModal2(): void {
    this.showModal2 = false;
  }
  billDetail: any;
  viewDetails(id: any) {
    this.loader = true;
    this.api.getAllMnufactureProductDetail(id).subscribe((res: any) => {
      this.loader = false;
      this.billDetail = res;
      this.showModal2 = true;
    });
  }
  
  ClearBill() {
    this.router.navigate(['/admin']).then(() => {
      this.router.navigate(["/admin/manufacture"]);
    });
  }
  billNo: any;
  getBillNo() {
    this.loader = true;
    this.api.getManufactureBillNo().subscribe((res: any) => {
      this.loader = false;
      this.billNo = res.id + 1
    })
  }
  getForEditBill(id: any) {
    this.loader = true;
    this.api.getBill(id, 'manufacture').subscribe((res: any) => {
      if (res["status"] === "success") {
        this.scrollToTop();
      this.loader = false;
      const bill = res["bill"];
      const products = res["items"];
      if (bill && products) {
        this.method = "Edit"
        this.billNo = bill.id
        this.productForm.patchValue({
          staticData: {
            manufacturer_name: bill.manufacturer_name,
            date: bill.date,
            totalQuantity: bill.totalQuantity
          }
        });
        const productsControl = this.productForm.get('products') as FormArray;
        productsControl.clear();
        products.forEach((item: any) => {
          productsControl.push(this.formBuilder.group({
            productName: [item.productName, Validators.required],
            quantity: [item.quantity, [Validators.required, Validators.pattern(/^\d+$/)]],
            paper: [item.paper, Validators.required],
            cover: [item.cover, Validators.required],
            unit: [item.unit, Validators.required],
            manufacture_expences: [item.manufacture_expences, Validators.required]
          }));
        });
      }
    }
    else{
      this.alert("error","Oops...", "Something went wrong..!");
    }
    });
  }
  editPurchesMeterial() {
      if (this.productForm.valid) {
        this.loader = true;
        this.api.editManufactureMeterial(this.billNo, this.productForm.value).subscribe((res: any) => {
          this.loader = false;
          if (res["status"] === "success") {
            this.alert("success","Success...!", "Bill Edited Succesfully..!");
            this.router.navigate(['/admin']).then(() => {
              this.router.navigate(["/admin/manufacture"]);
            });
          }
          else {
            this.alert("error","Oops...", "Something went wrong..!");
          }
        });
      } else {
        this.logInvalidControls(this.productForm);
      }
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  alert(icon:any,title:any,text:any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}

