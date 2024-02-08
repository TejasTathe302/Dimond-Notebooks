import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {
  adminpage: any = "cover";
  method: any = "Add new"
  Total: number = 0;
  loader = false;
  productForm!: FormGroup;
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
    this.getPurchesProductName();
    this.GetPaymentMethod();
    this.getBillNo();
  }
  gstPercent: any;
  getGstPercent() {
  this.loader = true;
    this.api.getGstPercent().subscribe((res: any) => {
      this.loader = false;
      for (const item of res.data) {
        if (item.name === 'PurchesCoverGst') {
          this.gstPercent = item.GstPercent
          this.productForm.patchValue({
            staticData: {
              gstPercent: item.GstPercent
            }
          });
          break;
        }
      }
    })
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
  units: any;
  GetUnits() {
    this.loader = true;
    this.api.getPurchesUnits().subscribe((res: any) => {
      this.loader = false;
      this.units = res.data;
    })
  }
  products: any;
  getPurchesProductName() {
    this.loader = true;
    this.api.getPurchesCoverProductName().subscribe((res: any) => {
      this.loader = false;
      this.products = res.data;
    })
  }
  stockdet = false;
  ManStockdet() {
    this.stockdet = !this.stockdet;
  }
  showModal1: boolean = false;
  openModal(): void {
    this.showModal1 = true;
  }
  closeModal1(newItem: any) {
    if (newItem !== '') {
      this.loader = true;
      var obj = { "name": newItem };
      this.api.addPurchesCoverProductName(obj).subscribe((res) => {
        this.loader = false;
        this.router.navigate(['/admin']).then(() => {
          this.router.navigate(["/admin/cover"]);
        });
      })
    }
    this.showModal1 = false;
  }
  closeModal1Direct() {
    this.showModal1 = false;
  }
  billNo: any;
  getBillNo() {
    this.loader = true;
    this.api.getPurchesCoverBillNo().subscribe((res: any) => {
      this.loader = false;
      this.billNo = res.id + 1
    })
  }
  party: any;
  GetPary() {
    this.loader = true;
    this.api.getPurchesCoverPartyName().subscribe((res: any) => {
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
      this.loader = true;
      var obj = { "name": newParty };
      this.api.addPurchesCoverPartyName(obj).subscribe((res) => {
        this.loader = false;
        this.productForm.patchValue({
          staticData: {
            Vender_name: newParty
          }
        });
        this.GetPary();
      });
    } else {
      this.productForm.patchValue({
        staticData: {
          Vender_name: ''
        }
      });
    }
    this.showModal = false;
  }
  closeModalDirect() {
    this.showModal = false;
    this.productForm.patchValue({
      staticData: {
        Vender_name: ''
      }
    });
  }
  paynmentMethod: any;
  GetPaymentMethod() {
    this.loader = true;
    this.api.getPaymentMethods().subscribe((res: any) => {
      this.loader = false;
      this.paynmentMethod = res.data;
      if (this.paynmentMethod && this.paynmentMethod.length > 0) {
        this.productForm.patchValue({
          staticData: {
            paymentMethod: this.paynmentMethod[0].name
          }
        });
      }
    });
  }
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      staticData: this.formBuilder.group({
        Vender_name: ['', Validators.required],
        vendor_mobile: ['', [Validators.required]],//,Validators.pattern('^[0-9]{10}$')]],
        paymentMethod: [''],
        subTotal: [0],
        totalQuantity: [0],
        isGST: [false],
        gstAmount: [0],
        gstPercent: [0],
        roundOff: [true],
        roundOffAmount: [0],
        discountPercent: [0],
        discountAmount: [0],
        finalTotal: [0],
        AdvanceAmount: [0],
        balance: [0],
        savingAmount: [0],
        date: ['']
      }),
      products: this.formBuilder.array([this.initProduct()])
    });
    this.setdate();
    this.getGstPercent();
  }
  initProduct() {
    return this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      unit: ['', Validators.required],
      rate: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      amount: ['']
    });
  }
  get productArray() {
    return this.productForm.get('products') as FormArray;
  }
  checkRoundOff() {
    const roundOffControl = this.productForm.get('staticData.roundOff');
    const roundOffValue = roundOffControl?.value;
    this.productForm.patchValue({
      staticData: {
        roundOff: roundOffValue
      }
    });
    this.calculateSavingAmount();
    this.calculateFinalTotal();
    this.calulateBalence();
  }
  checkGst() {
    const isGSTControl = this.productForm.get('staticData.isGST');
    const isGSTValue = isGSTControl?.value;
    this.productForm.patchValue({
      staticData: {
        isGST: isGSTValue
      }
    });
    this.calculateSavingAmount()
    this.calculateFinalTotal();
    this.calulateBalence();
  }
  isDiscountPrcent = false;
  checkDiscount() {
    this.isDiscountAmount = false;
    this.productForm.patchValue({
      staticData: {
        discountAmount: 0
      }
    });
    const discountPercentControl = this.productForm.get('staticData.discountPercent');
    const discountPercentValue = discountPercentControl?.value;
    this.productForm.patchValue({
      staticData: {
        discountPercent: discountPercentValue
      }
    });
    if (this.productForm.value.staticData.discountPercent > 0) {
      this.isDiscountPrcent = true;
    }
    else {
      this.isDiscountPrcent = false;
    }
    this.calculateFinalTotal();
    this.calculateSavingAmount();
    this.calulateBalence();
  }
  isDiscountAmount = false
  checkDiscountAmount() {
    this.isDiscountPrcent = false
    this.productForm.patchValue({
      staticData: {
        discountPercent: 0
      }
    });
    const discountAmountControl = this.productForm.get('staticData.discountAmount');
    const discountAmountValue = discountAmountControl?.value;
    this.productForm.patchValue({
      staticData: {
        discountAmount: discountAmountValue
      }
    });
    if (this.productForm.value.staticData.discountAmount > 0) {
      this.isDiscountAmount = true;
    }
    else {
      this.isDiscountAmount = false;
    }
    this.calculateFinalTotal();
    this.calculateSavingAmount();
    this.calulateBalence();
  }
  calulateBalence() {
    this.productForm.patchValue({
      staticData: {
        balance: this.productForm.value.staticData.finalTotal - this.productForm.value.staticData.AdvanceAmount
      }
    });
  }
  calculateSavingAmount() {
    if (this.productForm.value.staticData.roundOffAmount > 0) {
      if (this.productForm.value.staticData.roundOff) {
        this.productForm.patchValue({
          staticData: {
            savingAmount: Number(this.productForm.value.staticData.discountAmount) + this.productForm.value.staticData.roundOffAmount
          }
        });
      }
      else {
        this.productForm.patchValue({
          staticData: {
            savingAmount: this.productForm.value.staticData.discountAmount
          }
        });
      }
    }
    else {
      this.productForm.patchValue({
        staticData: {
          savingAmount: this.productForm.value.staticData.discountAmount
        }
      });
    }
  }

  addRow() {
    const control = this.productForm.get('products') as FormArray;
    control.push(this.initProduct());
    this.setFocus();
    this.calculateSubTotal();
    this.calculateSavingAmount();
    this.calulateBalence();
    this.calculateFinalTotal();
  }
  removeRow(index: number) {
    const control = this.productForm.get('products') as FormArray;
    control.removeAt(index);
    this.calculateSubTotal();
    this.calculateSavingAmount();
    this.calulateBalence();
    this.calculateFinalTotal();
  }
  calculateAmount(index: number) {
    const product = this.productArray.at(index);
    const quantity = product.get('quantity')?.value;
    const rate = product.get('rate')?.value;
    const unit = product.get('unit')?.value;
    let amount = quantity * rate;
    // if (unit === "DZN") {
    //   amount *= 12;
    // }
  
    product.patchValue({ amount: amount });
  
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
    this.calculateSubTotal();
    this.calculateSavingAmount();
    this.calulateBalence();
    this.calculateFinalTotal();
  }
  calculateSubTotal(){
    let totalamount = 0;
    const sd = this.productForm.value;
    for (const product of sd.products) {
        totalamount +=Number(product.amount);
    }
    this.productForm.patchValue({
      staticData: {
        subTotal: totalamount
      }
    });
  }
  calculateFinalTotal(): void {
    const subTotal = this.productForm.value.staticData.subTotal
    const isGstChecked = this.productForm.value.staticData.isGST;
    if (isGstChecked) {
      const gstAmount = subTotal * (Number(this.gstPercent) / 100);
      this.Total = subTotal + gstAmount;
      this.productForm.patchValue({
        staticData: {
          gstAmount: gstAmount
        }
      });
    }
    else {
      const gstAmount = subTotal * (Number(this.gstPercent) / 100);
      this.productForm.patchValue({
        staticData: {
          gstAmount: gstAmount
        }
      });
      this.Total = subTotal;
    }
    if (this.isDiscountPrcent) {
      const oldFinal = this.Total;
      const discountAmount = (this.Total * this.productForm.value.staticData.discountPercent) / 100;
      this.Total -= discountAmount;
      this.productForm.patchValue({
        staticData: {
          discountAmount: oldFinal - this.Total
        }
      });
    }
    if (this.isDiscountAmount) {
      const oldFinal = this.Total;
      if (oldFinal > 0) {
        const discountPercentage = (this.productForm.value.staticData.discountAmount / oldFinal) * 100;
        this.Total -= this.productForm.value.staticData.discountAmount;
        this.productForm.patchValue({
          staticData: {
            discountPercent: discountPercentage
          }
        });
      }
      else {
        this.productForm.patchValue({
          staticData: {
            discountPercent: 0
          }
        });
      }
    }
    if (this.productForm.value.staticData.roundOff) {
      this.productForm.patchValue({
        staticData: {
          finalTotal: Math.round(this.Total)
        }
      });
      const olDroundOff = this.Total - Number(this.productForm.value.staticData.finalTotal);
      this.productForm.patchValue({
        staticData: {
          roundOffAmount: olDroundOff
        }
      });
    }
    else {
      this.productForm.patchValue({
        staticData: {
          finalTotal: this.Total
        }
      });
      const olDroundOff = this.Total - Number(Math.round(this.Total));
      this.productForm.patchValue({
        staticData: {
          roundOffAmount: olDroundOff
        }
      });
    }
    this.productForm.patchValue({
      staticData: {
        AdvanceAmount: this.productForm.value.staticData.finalTotal
      }
    });
    this.calculateSavingAmount();
    this.calulateBalence();
  }
  ClearBill() {
    this.router.navigate(['/admin']).then(() => {
      this.router.navigate(["/admin/cover"]);
    });
  }
  onSubmit(method: any) {
    if (method === 1) {
      if (this.productForm.valid) {
        this.loader = true;
        this.api.AddPurchesbill(this.productForm.value).subscribe((res: any) => {
          this.loader = false;
          if (res["status"] === "success") {
            this.alert("success","Success...!", "Bill Saved Succesfully..!");
            this.router.navigate(['/admin']).then(() => {
              this.router.navigate(["/admin/cover"]);
            });
          }
          else{
            this.alert("error","Oops...", "Something went wrong!");
          }
        });
      } else {
        this.logInvalidControls(this.productForm);
      }
    }
    else if (method === 2) {
      if (this.productForm.valid) {
        this.loader = false;
        this.api.AddPurchesbill(this.productForm.value).subscribe((res: any) => {
          this.loader = false;
          if (res["status"] === "success") {
            this.router.navigate(['/admin/printBill', res['token']], { queryParams: { method: 'cover' } });
          }
          else{
            this.alert("error","Oops...", "Something went wrong..!");
          }
        });
      } else {
        this.logInvalidControls(this.productForm);
      }
    }
    else {
      alert("something went wrong....")
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
  calculateTotal(column: string): number {
    if (Array.isArray(this.products)) {
      return this.products.reduce((total: any, data: any) => Number(total) + Number(data[column]), 0);
    } else {
      return 0;
    }
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
    this.api.getAllPurchesCoverBill().subscribe((res: any) => {
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
        bill.Vender_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
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
  getForEditBill(id: any) {
    this.loader = true;
    this.api.getBill(id, 'cover').subscribe((res: any) => {
      if (res["status"] === "success") {
      this.scrollToTop();
      this.loader = false;
      const bill = res["bill"];
      const products = res["items"];
      this.Total = 0
      this.calculateFinalTotal();
      if (bill && products) {
        this.method = "Edit"
        this.billNo = bill.id
        this.productForm.patchValue({
          staticData: {
            Vender_name: bill.Vender_name,
            vendor_mobile: bill.vendor_mobile,
            paymentMethod: bill.paymentMethod,
            subTotal: bill.subTotal,
            totalQuantity: bill.totalQuantity,
            isGST: bill.isGST,
            gstAmount: bill.gstAmount,
            gstPercent: bill.gstPercent,
            roundOff: bill.roundOff,
            roundOffAmount: bill.roundOffAmount,
            discountPercent: bill.discountPercent,
            discountAmount: bill.discountAmount,
            finalTotal: bill.finalTotal,
            AdvanceAmount: bill.AdvanceAmount,
            balance: bill.balance,
            savingAmount: bill.savingAmount,
            date: bill.date
          }
        });
        const productsControl = this.productForm.get('products') as FormArray;
        productsControl.clear();
        products.forEach((item: any) => {
          productsControl.push(this.formBuilder.group({
            productName: [item.productName, Validators.required],
            quantity: [item.quantity, [Validators.required, Validators.pattern(/^\d+$/)]],
            unit: [item.unit, Validators.required],
            rate: [item.rate, [Validators.required, Validators.pattern(/^\d+$/)]],
            amount: [item.amount]
          }));
          this.calculateFinalTotal();
        });
      }
    }
    else{
      this.alert("error","Oops...", "Something went wrong..!");
    }
    });
  }
  editPurchesMeterial(method: any) {
    if (method === 1) {
      if (this.productForm.valid) {
        this.loader = true;
        this.api.editPurchesCoverMeterial(this.billNo, this.productForm.value).subscribe((res: any) => {
          this.loader = false;
          if (res["status"] === "success") {
            this.alert("success","Success...!", "Bill Edited Succesfully..!");
            this.router.navigate(['/admin']).then(() => {
              this.router.navigate(["/admin/cover"]);
            });
          }
          else{
            this.alert("error","Oops...", "Something went wrong..!");
          }
        });
      } else {
        this.logInvalidControls(this.productForm);
      }
    }
    else if (method === 2) {
      if (this.productForm.valid) {
        this.loader = true;
        this.api.editPurchesCoverMeterial(this.billNo, this.productForm.value).subscribe((res: any) => {
          this.loader = false;
          if (res["status"] === "success") {
            this.router.navigate(['/admin/printBill', res['token']], { queryParams: { method: 'cover' } });
          }
          else{
            this.alert("error","Oops...", "Something went wrong..!");
          }
        });
      } else {
        this.logInvalidControls(this.productForm);
      }
    }
    else {
      alert("something went wrong....")
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





