import { Component, ElementRef, Renderer2  } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.scss']
})
export class PrintBillComponent {
  id: any;
  method:any;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private api: ApiService,
    private activatedRouts: ActivatedRoute,
    private router:Router

  ) {
    this.activatedRouts.params.subscribe(params => {
      this.id = params['token'];
      this.method = this.activatedRouts.snapshot.queryParamMap.get('method');
  });
    this.getBill();
    const intervalId=setInterval(() => {
      if (this.productInfo && this.billInfo) {
        this.onPrint();
        clearInterval(intervalId);
        this.router.navigate(["/admin/"+this.method]);
      }
    }, 100)
  }
  productInfo: any;
  billInfo: any;
  str: any
  loader=false;
  getBill(){
    this.loader=true;
    this.api.getBill(this.id,this.method).subscribe((res:any)=>{
      this.loader=false;
      this.productInfo = res["items"]
      this.billInfo=res["bill"]
      this.str = this.convertToWords(Number(res.bill.finalTotal))
    })
  }
  onPrint() {
    const printContent = this.elementRef.nativeElement;
    this.renderer.setStyle(printContent, 'display', 'block');
    window.print();
    this.renderer.setStyle(printContent, 'display', 'inline');
  }
  // decimal to word conversion 
  convertToWords(amount1: number): string {
    const amount = parseFloat(amount1.toFixed(2))
    const integerPart = Math.floor(Number(amount));
    const decimalPart = Math.round((Number(amount) - integerPart) * 100);
    let result = this.convertIntegerToWords(integerPart) +" Rupee";
    if (decimalPart > 0) {
      result += ' and' + this.convertIntegerToWords(decimalPart) + ' Paisa';
    }
    return result;
  }
  private convertIntegerToWords(integerPart: number): string {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if (integerPart === 0) {
      return '';
    }
    if (integerPart < 10) {
      return units[integerPart];
    } else if (integerPart < 20) {
      return teens[integerPart - 10];
    } else if (integerPart < 100) {
      return tens[Math.floor(integerPart / 10)] + ' ' + units[integerPart % 10];
    } else if (integerPart < 1000) {
      return units[Math.floor(integerPart / 100)] + ' Hundred ' + this.convertIntegerToWords(integerPart % 100);
    } else if (integerPart < 1000000) {
      return this.convertIntegerToWords(Math.floor(integerPart / 1000)) + ' Thousand ' + this.convertIntegerToWords(integerPart % 1000);
    } else if (integerPart < 10000000) {
      return this.convertIntegerToWords(Math.floor(integerPart / 100000)) + ' Lakh ' + this.convertIntegerToWords(integerPart % 100000);
    } else {
      return 'Number too large to convert';
    }
  }



}
