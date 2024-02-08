import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private http:HttpClient) { 
    
  } 
  // common code start
  doAdminLogin(obj:any){
    return this.http.post("http://127.0.0.1:8000/doAdminLogin/",obj);
  }
  getAdminDetails(id:any){
    return this.http.get("http://127.0.0.1:8000/getAdminDetails/"+id);
  }
  getPurchesUnits(){
    return this.http.get("http://127.0.0.1:8000/getPurchesUnits/");
  }
  getPaymentMethods(){
    return this.http.get("http://127.0.0.1:8000/getPaymentMethods/");
  }
  getBill(token:any,method:any){
    return this.http.get("http://127.0.0.1:8000/getBill/"+token+"/"+method);
  }
  getGstPercent(){
    return this.http.get("http://127.0.0.1:8000/getGstPercent/");
  }
  // common code end
  // admin control start 
  getPaymentMethod(id:any){
    return this.http.get("http://127.0.0.1:8000/getPaymentMethod/"+id);
  }
  editPaymentMethod(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editPaymentMethod/"+id,obj);
  }
  deletePaymentMethod(id:any){
    return this.http.delete("http://127.0.0.1:8000/deletePaymentMethod/"+id);
  }
  addPaymentMethod(obj:any){
    return this.http.post("http://127.0.0.1:8000/addPaymentMethod/",obj);
  }
  getGstPercent1(id:any){
    return this.http.get("http://127.0.0.1:8000/getGstPercent1/"+id);
  }
  editGstPercent(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editGstPercent/"+id,obj);
  }
  getPaperCustomerName(id:any){
    return this.http.get("http://127.0.0.1:8000/getPaperCustomerName/"+id);
  }
  edditPurchesPartyName(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/edditPurchesPartyName/"+id,obj);
  }
  deletePurchesPaperCustomer(id:any){
    return this.http.delete("http://127.0.0.1:8000/deletePurchesPaperCustomer/"+id);
  }
  getPurchesProductPaperName(id:any){
    return this.http.get("http://127.0.0.1:8000/getPurchesProductPaperName/"+id);
  }
  edditPurchesPaperProductName(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/edditPurchesPaperProductName/"+id,obj);
  }
  getPurchesProductCoverPartyName(id:any){
    return this.http.get("http://127.0.0.1:8000/getPurchesProductCoverPartyName/"+id);
  }
  edditPurchesCoverPartyName(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/edditPurchesCoverPartyName/"+id,obj);
  }
  deletePurchesCoverCustomer(id:any){
    return this.http.delete("http://127.0.0.1:8000/deletePurchesCoverCustomer/"+id);
  }
  getPurchesProductCoverName(id:any){
    return this.http.get("http://127.0.0.1:8000/getPurchesProductCoverName/"+id);
  }
  edditPurchesCoverProductName(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/edditPurchesCoverProductName/"+id,obj);
  }
  getManufacturerNamee(id:any){
    return this.http.get("http://127.0.0.1:8000/getManufacturerNamee/"+id);
  }
  edditManufacturerName(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/edditManufacturerName/"+id,obj);
  }
  deleteManufacturer(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteManufacturer/"+id);
  }
  getManufacturedProductNamee(id:any){
    return this.http.get("http://127.0.0.1:8000/getManufacturedProductNamee/"+id);
  }
  edditManufacturedProdutName(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/edditManufacturedProdutName/"+id,obj);
  }
  getSellCustomer(id:any){
    return this.http.get("http://127.0.0.1:8000/getSellCustomer/"+id);
  }
  edditSellCustomerName(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/edditSellCustomerName/"+id,obj);
  }
  deleteSellCustomer(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteSellCustomer/"+id);
  }
  getAdminAllDetails(){
    return this.http.get("http://127.0.0.1:8000/getAdminAllDetails/");
  }
  getAdminDataForEdit(id:any){
    return this.http.get("http://127.0.0.1:8000/getAdminDataForEdit/"+id);
  }
  editAdminData(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editAdminData/"+id,obj);
  }
  addNewAdminData(obj:any){
    return this.http.post("http://127.0.0.1:8000/addNewAdminData/",obj);
  }
  deleteAdmin(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteAdmin/"+id);
  }
  // admin control end 
  // paper service start 
  getPurchesPartyName(){
    return this.http.get("http://127.0.0.1:8000/getPurchesPartyName/");
  }
  addPurchesPartyName(obj:any){
    return this.http.post("http://127.0.0.1:8000/addPurchesPartyName/",obj);
  }
  Addbill(obj:any){
    return this.http.post("http://127.0.0.1:8000/addPurchesMeterial/",obj);
  }
  getAllPurchesBill(){
    return this.http.get("http://127.0.0.1:8000/getAllPurchesBill/");
  }
  getPurchesProductName(){
    return this.http.get("http://127.0.0.1:8000/getPurchesProductName/");
  }
  addPurchesProductName(obj:any){
    return this.http.post("http://127.0.0.1:8000/addPurchesProductName/",obj);
  }
  getPurchesBillNo(){
    return this.http.get("http://127.0.0.1:8000/getPurchesBillNo/");
  }
  editPurchesMeterial(id: string, data: any) {
    return this.http.patch("http://127.0.0.1:8000/editPurchesMeterial/" + id, data);
  }
  
  // paper service end 
  // invoice start 
  getAllInvoiceBill(){
    return this.http.get("http://127.0.0.1:8000/getAllInvoiceBill/");
  }
  getInvoiceBillNo(){
    return this.http.get("http://127.0.0.1:8000/getInvoiceBillNo/");
  }
  addInvoice(obj:any){
    return this.http.post("http://127.0.0.1:8000/addInvoice/",obj);
  }
  editInvoice(id: string, data: any) {
    return this.http.patch("http://127.0.0.1:8000/editInvoice/" + id, data);
  }
  // invoice end 
  // cover service  start 
  getPurchesCoverPartyName(){
    return this.http.get("http://127.0.0.1:8000/getPurchesCoverPartyName/");
  }
  addPurchesCoverPartyName(obj:any){
    return this.http.post("http://127.0.0.1:8000/addPurchesCoverPartyName/",obj);
  }
  AddPurchesbill(obj:any){
    return this.http.post("http://127.0.0.1:8000/addPurchesCoverMeterial/",obj);
  }
  getAllPurchesCoverBill(){
    return this.http.get("http://127.0.0.1:8000/getAllPurchesCoverBill/");
  }
  getPurchesCoverProductName(){
    return this.http.get("http://127.0.0.1:8000/getPurchesCoverProductName/");
  }
  addPurchesCoverProductName(obj:any){
    return this.http.post("http://127.0.0.1:8000/addPurchesCoverProductName/",obj);
  }
  getPurchesCoverBillNo(){
    return this.http.get("http://127.0.0.1:8000/getPurchesCoverBillNo/");
  }
  editPurchesCoverMeterial(id: string, data: any) {
    return this.http.patch("http://127.0.0.1:8000/editPurchesCoverMeterial/" + id, data);
  }
  // cover service end 
  // manufacture service start 
  addManufactureProductName(obj:any){
    return this.http.post("http://127.0.0.1:8000/addManufactureProductName/",obj);
  }
  getManufactureProductName(){
    return this.http.get("http://127.0.0.1:8000/getManufactureProductName/");
  }
  addManufactureProduct(obj:any){
    return this.http.post("http://127.0.0.1:8000/addManufactureProduct/",obj);
  }
  getManufacturerName(){
    return this.http.get("http://127.0.0.1:8000/getManufacturerName/");
  }
  addManufacturerName(obj:any){
    return this.http.post("http://127.0.0.1:8000/addManufacturerName/",obj);
  }
  getAllMnufactureProduct(){
    return this.http.get("http://127.0.0.1:8000/getAllMnufactureProduct/");
  }
  getAllMnufactureProductDetail(id:any){
    return this.http.get("http://127.0.0.1:8000/getAllMnufactureProductDetail/"+id);
  }
  getManufactureBillNo(){
    return this.http.get("http://127.0.0.1:8000/getManufactureBillNo/");
  }
  editManufactureMeterial(id: string, data: any) {
    return this.http.patch("http://127.0.0.1:8000/editManufactureMeterial/" + id, data);
  }
  // manufacture service end 
  // sell start 
  addSellProductMeterial(obj:any){
    return this.http.post("http://127.0.0.1:8000/addSellProductMeterial/",obj);
  }
  getSellProductPartyName(){
    return this.http.get("http://127.0.0.1:8000/getSellProductPartyName/");
  }
  addSellProductPartyName(obj:any){
    return this.http.post("http://127.0.0.1:8000/addSellProductPartyName/",obj);
  }
  getSellProductBillNo(){
    return this.http.get("http://127.0.0.1:8000/getSellProductBillNo/");
  }
  getAllSellProductBill(){
    return this.http.get("http://127.0.0.1:8000/getAllSellProductBill/");
  }
  editSellMeterial(id: string, data: any) {
    return this.http.patch("http://127.0.0.1:8000/editSellMeterial/" + id, data);
  }
  // sell end 
  // user start 
  editCompanyDetails(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editCompanyDetails/"+id,obj);
  }
  getCompanyDetails(){
    return this.http.get("http://127.0.0.1:8000/getCompanyDetails/");
  }
  getSliderDetails(){
    return this.http.get("http://127.0.0.1:8000/getSliderDetails/")
  }
  getSliderDetailsForEdit(id:any){
    return this.http.get("http://127.0.0.1:8000/getSliderDetailsForEdit/"+id)
  }
  editSliderDetails(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editSliderDetails/"+id,obj)
  }
  addSliderDetails(obj:any){
    return this.http.post("http://127.0.0.1:8000/addSliderDetails/",obj)
  }
  deleteSliderDetails(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteSliderDetails/"+id)
  }
  getAllProductDetails(){
    return this.http.get("http://127.0.0.1:8000/getAllProductDetails/")
  }
  getProductDetailsForEdit(id:any){
    return this.http.get("http://127.0.0.1:8000/getProductDetailsForEdit/"+id)
  }
  editProductDetails(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editProductDetails/"+id,obj)
  }
  deleteProductDetails(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteProductDetails/"+id)
  }
  addProductDetails(obj:any){
    return this.http.post("http://127.0.0.1:8000/addProductDetails/",obj)
  }
  getAllBannerDetails(){
    return this.http.get("http://127.0.0.1:8000/getAllBannerDetails/")
  }
  getBannerDetailsForEdit(id:any){
    return this.http.get("http://127.0.0.1:8000/getBannerDetailsForEdit/"+id)
  }
  editBannesDetails(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editBannesDetails/"+id,obj)
  }
  getAllBackgroundDetails(){
    return this.http.get("http://127.0.0.1:8000/getAllBackgroundDetails/")
  }
  getBackgroundDetailsForEdit(id:any){
    return this.http.get("http://127.0.0.1:8000/getBackgroundDetailsForEdit/"+id)
  }
  editBackgroundDetails(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editBackgroundDetails/"+id,obj)
  }
  getAllTeamDetails(){
    return this.http.get("http://127.0.0.1:8000/getAllTeamDetails/")
  }
  getTeamDetailsForEdit(id:any){
    return this.http.get("http://127.0.0.1:8000/getTeamDetailsForEdit/"+id)
  }
  editTeamDetails(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editTeamDetails/"+id,obj)
  }
  deleteTeamDetails(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteTeamDetails/"+id)
  }
  addTeamDetails(obj:any){
    return this.http.post("http://127.0.0.1:8000/addTeamDetails/",obj)
  }
  getAllWorkingDetails(){
    return this.http.get("http://127.0.0.1:8000/getAllWorkingDetails/")
  }
  getWorkingDetailsForEdit(id:any){
    return this.http.get("http://127.0.0.1:8000/getWorkingDetailsForEdit/"+id)
  }
  editWorkingDetails(id:any,obj:any){
    return this.http.patch("http://127.0.0.1:8000/editWorkingDetails/"+id,obj)
  }
  deleteWorkingDetails(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteWorkingDetails/"+id)
  }
  addWorkingDetails(obj:any){
    return this.http.post("http://127.0.0.1:8000/addWorkingDetails/",obj)
  }
  saveMessage(obj:any){
    return this.http.post("http://127.0.0.1:8000/saveMessage/",obj)
  }
  getAllMessage(){
    return this.http.get("http://127.0.0.1:8000/getAllMessage/")
  }
  deleteMesasgeDetails(id:any){
    return this.http.delete("http://127.0.0.1:8000/deleteMesasgeDetails/"+id)
  }
  // user end 
}
