"""
URL configuration for DimondProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from DimondApp import views
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.emptyUrl),
    # common url start
    path('getPurchesUnits/',views.getPurchesUnits),
    path('getPaymentMethods/',views.getPaymentMethods),
    path('getGstPercent/',views.getGstPercent),
    path('getBill/<str:token>/<str:method>/',views.getBill),
    path('doAdminLogin/',views.doAdminLogin),
    path('getAdminDetails/<str:id>',views.getAdminDetails),
    # common url end 
    # admin control start 
    
    path('getPaymentMethod/<str:id>',views.getPaymentMethod),
    path('editPaymentMethod/<str:id>',views.editPaymentMethod),
    path('deletePaymentMethod/<str:id>',views.deletePaymentMethod),
    path('addPaymentMethod/',views.addPaymentMethod),
    path('getGstPercent1/<str:id>',views.getGstPercent1),
    path('editGstPercent/<str:id>',views.editGstPercent),
    path('getPaperCustomerName/<str:id>',views.getPaperCustomerName),
    path('edditPurchesPartyName/<str:id>',views.edditPurchesPartyName),
    path('deletePurchesPaperCustomer/<str:id>',views.deletePurchesPaperCustomer),
    path('getPurchesProductPaperName/<str:id>',views.getPurchesProductPaperName),
    path('edditPurchesPaperProductName/<str:id>',views.edditPurchesPaperProductName),
    path('getPurchesProductCoverPartyName/<str:id>',views.getPurchesProductCoverPartyName),
    path('edditPurchesCoverPartyName/<str:id>',views.edditPurchesCoverPartyName),
    path('deletePurchesCoverCustomer/<str:id>',views.deletePurchesCoverCustomer),
    path('getPurchesProductCoverName/<str:id>',views.getPurchesProductCoverName),
    path('edditPurchesCoverProductName/<str:id>',views.edditPurchesCoverProductName),
    path('getManufacturerNamee/<str:id>',views.getManufacturerNamee),
    path('edditManufacturerName/<str:id>',views.edditManufacturerName),
    path('deleteManufacturer/<str:id>',views.deleteManufacturer),
    path('getManufacturedProductNamee/<str:id>',views.getManufacturedProductNamee),
    path('edditManufacturedProdutName/<str:id>',views.edditManufacturedProdutName),
    path('getSellCustomer/<str:id>',views.getSellCustomer),
    path('edditSellCustomerName/<str:id>',views.edditSellCustomerName),
    path('deleteSellCustomer/<str:id>',views.deleteSellCustomer),
    path('getAdminAllDetails/',views.getAdminAllDetails),
    path('getAdminDataForEdit/<str:id>',views.getAdminDataForEdit),
    path('editAdminData/<str:id>',views.EditeditAdminData),
    path('addNewAdminData/',views.addNewAdminData),
    path('deleteAdmin/<str:id>',views.deleteAdmin),

    # admin control end 
    # paper url start 
    path('addPurchesMeterial/',views.addPurchesMeterial),
    path('getPurchesPartyName/',views.getPurchesPartyName),
    path('addPurchesPartyName/',views.addPurchesPartyName),
    path('getAllPurchesBill/',views.getAllPurchesBill),
    path('getPurchesProductName/',views.getPurchesProductName),
    path('addPurchesProductName/',views.addPurchesProductName), 
    path('getPurchesBillNo/',views.getPurchesBillNo),
    path('editPurchesMeterial/<str:id>',views.editPurchesMeterial),
    # peper url end
    # invoive start 
    path('addInvoice/',views.addInvoice),
    path('getAllInvoiceBill/',views.getAllInvoiceBill),
    path('getInvoiceBillNo/',views.getInvoiceBillNo),
    path('editInvoice/<str:id>',views.editInvoice),

    # invoive end 
    # cover url start 
    path('addPurchesCoverMeterial/',views.addPurchesCoverMeterial),
    path('getPurchesCoverPartyName/',views.getPurchesCoverPartyName),
    path('addPurchesCoverPartyName/',views.addPurchesCoverPartyName),
    path('getAllPurchesCoverBill/',views.getAllPurchesCoverBill),
    path('getPurchesCoverProductName/',views.getPurchesCoverProductName),
    path('addPurchesCoverProductName/',views.addPurchesCoverProductName), 
    path('getPurchesCoverBillNo/',views.getPurchesCoverBillNo),
    path('editPurchesCoverMeterial/<str:id>',views.editPurchesCoverMeterial),

    # cover url end 
    # manufacture url start 
    path('getManufactureProductName/',views.getManufactureProductName),
    path('addManufactureProductName/',views.addManufactureProductName),
    path('addManufactureProduct/',views.addManufactureProduct),
    path('addManufacturerName/',views.addManufacturerName),
    path('getManufacturerName/',views.getManufacturerName),
    path('getAllMnufactureProduct/',views.getAllMnufactureProduct),
    path('getAllMnufactureProductDetail/<str:token>',views.getAllMnufactureProductDetail),
    path('getManufactureBillNo/',views.getManufactureBillNo),
    path('editManufactureMeterial/<str:id>',views.editManufactureMeterial),

    # manufacture url end 
    # sell start 
    path('addSellProductMeterial/',views.addSellProductMeterial),
    path('getSellProductPartyName/',views.getSellProductPartyName),
    path('addSellProductPartyName/',views.addSellProductPartyName),
    path('getSellProductBillNo/',views.getSellProductBillNo),
    path('getAllSellProductBill/',views.getAllSellProductBill),
    path('editSellMeterial/<str:id>',views.editSellMeterial),

    # sell end 
    # user start 
    path('editCompanyDetails/<str:id>',views.editCompanyDetails),
    path('getCompanyDetails/',views.getCompanyDetails),
    path('getSliderDetails/',views.getSliderDetails),
    path('getSliderDetailsForEdit/<str:id>',views.getSliderDetailsForEdit),
    path('editSliderDetails/<str:id>',views.editSliderDetails),
    path('addSliderDetails/',views.addSliderDetails),
    path('deleteSliderDetails/<str:id>',views.deleteSliderDetails),
    path('getAllProductDetails/',views.getAllProductDetails),
    path('getProductDetailsForEdit/<str:id>',views.getProductDetailsForEdit),
    path('editProductDetails/<str:id>',views.editProductDetails),
    path('deleteProductDetails/<str:id>',views.deleteProductDetails),
    path('addProductDetails/',views.addProductDetails),
    path('getAllBannerDetails/',views.getAllBannerDetails),
    path('getBannerDetailsForEdit/<str:id>',views.getBannerDetailsForEdit),
    path('editBannesDetails/<str:id>',views.editBannesDetails),
    path('getAllBackgroundDetails/',views.getAllBackgroundDetails),
    path('getBackgroundDetailsForEdit/<str:id>',views.getBackgroundDetailsForEdit),
    path('editBackgroundDetails/<str:id>',views.editBackgroundDetails),
    path('getAllTeamDetails/',views.getAllTeamDetails),
    path('getTeamDetailsForEdit/<str:id>',views.getTeamDetailsForEdit),
    path('editTeamDetails/<str:id>',views.editTeamDetails),
    path('deleteTeamDetails/<str:id>',views.deleteTeamDetails),
    path('addTeamDetails/',views.addTeamDetails),
    path('getAllWorkingDetails/',views.getAllWorkingDetails),
    path('getWorkingDetailsForEdit/<str:id>',views.getWorkingDetailsForEdit),
    path('editWorkingDetails/<str:id>',views.editWorkingDetails),
    path('deleteWorkingDetails/<str:id>',views.deleteWorkingDetails),
    path('addWorkingDetails/',views.addWorkingDetails),
    path('saveMessage/',views.saveMessage),
    path('getAllMessage/',views.getAllMessage),
    path('deleteMesasgeDetails/<str:id>',views.deleteMesasgeDetails),

    # user end 
]

