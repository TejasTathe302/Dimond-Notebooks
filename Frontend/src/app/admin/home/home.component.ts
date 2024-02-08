import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'; // Import ChartType interface from 'chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  adminpage = 'home';
  loader = false;
  constructor(
    private api: ApiService
  ) {
    this.getAllPurchaseBill();
  }
  paperStock = false
  checkPaperData() {
    this.paperStock = !this.paperStock;
    if (this.paperStock) {
      this.getPurchesProductName()
    }
  }
  paper: any;
  getPurchesProductName() {
    this.loader=true;
    this.api.getPurchesProductName().subscribe((res: any) => {
      this.loader=false;
      this.paper = res.data;
    })
  }
  coverStock = false
  checkCoverData() {
    this.coverStock = !this.coverStock;
    if (this.coverStock) {
      this.getPurchesCoverProductName();
    }
  }
  cover: any;
  getPurchesCoverProductName() {
    this.loader=true;
    this.api.getPurchesCoverProductName().subscribe((res: any) => {
      this.loader=false;
      this.cover = res.data;
    })
  }
  productStock = false;
  checkProductData() {
    this.productStock = !this.productStock;
    if (this.productStock) {
      this.getManufactureProductName();
    }
  }
  products: any;
  getManufactureProductName() {
    this.loader=true;
    this.api.getManufactureProductName().subscribe((res: any) => {
      this.loader=false;
      this.products = res.data;
    })
  }
  allBills: any[] = [];
  monthBills: any[] = [];
  getAllPurchaseBill() {
    this.loader=true;
    this.api.getAllSellProductBill().subscribe((res: any) => {
      this.loader=false;
      this.allBills = res.data;
      this.groupBillsByMonth();
    });
  }
  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  groupBillsByMonth() {
    const monthYearSet = new Set<string>();
    this.allBills.forEach((bill: any) => {
      const billDate = this.parseDate(bill.date);
      const monthYearKey = `${billDate.getMonth() + 1}-${billDate.getFullYear()}`;
      monthYearSet.add(monthYearKey);
    });
    this.monthBills = Array.from(monthYearSet).sort();
    this.updateBill();
  }
  updateBill() {
    const monthTotals: { [key: string]: number } = {};
    const data: { label: string, total: number }[] = [];
    this.allBills.forEach((bill: any) => {
      const billDate = this.parseDate(bill.date);
      const monthYearKey = `${billDate.getMonth() + 1}-${billDate.getFullYear()}`;
      if (!monthTotals[monthYearKey]) {
        monthTotals[monthYearKey] = 0;
      }
      monthTotals[monthYearKey] += Number(bill.profit);
    });
    Object.keys(monthTotals).forEach((key) => {
      data.push({ label: key, total: monthTotals[key] });
    });
    this.barChartLabels = data.map(item => item.label);
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: data.map(item => item.total),
          label: 'Monthly Profit(₹)',
        },
      ],
    };
  }
  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };
  public barChartLabels: any[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Mothly Profit' },
    ],
  };
  barChartType: ChartType = 'line';
  chartTypes: ChartType[] = ['line', 'bar', 'radar', 'doughnut', 'polarArea', 'pie'];
  currentIndex = 0;
  randomize(): void {
    this.currentIndex = (this.currentIndex + 1) % this.chartTypes.length;
    this.barChartType = this.chartTypes[this.currentIndex];
  }


}