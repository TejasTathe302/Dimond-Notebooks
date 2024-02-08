from .models import BannerDetailsModel, CompanyBackgroundModel, CompanyProfileModel, GstPercentModel, InvoiceItemsModel, InvoiceModel, ManufactureDetailsModel, ManufactureProductDetailsModel, ManufactureProductNameModel, ManufacturerNameMdel, ProductDetailsModel, PurchesBillModel, PurchesCoverBillModel, PurchesCoverItemsModel, PurchesCoverPartyNameMdel, PurchesItemsModel, PurchesPartyNameMdel, SellProductBillModel, SellProductItemsModel, SellProductPartyNameMdel, SliderDetailsModel, TeamMembersModel, UserMessageModel, WorkingAreaMdel, adminDetailsModel, paymentMethodModel, purchesCoverProductNameModel, purchesProductNameModel, purchesUnitModel
from rest_framework import serializers
# common code start
class PurchesUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model=purchesUnitModel
        fields='__all__'

class paymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model=paymentMethodModel
        fields='__all__'

class adminDetailsSerilizer(serializers.ModelSerializer):
    class Meta:
        model=adminDetailsModel
        fields='__all__'     
# common end 
# purches paper start 
class PurchesBillSerializer(serializers.ModelSerializer):
    class Meta:
        model=PurchesBillModel
        fields='__all__'

class PurchesItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchesItemsModel
        fields = ["productName","quantity","unit","rate","amount","BillDetails"]
        extra_kwargs = {'BillDetails': {'required': False}}

class PurchesPartySerializer(serializers.ModelSerializer):
    class Meta:
        model=PurchesPartyNameMdel
        fields='__all__'

class purchesProductNameSerializer(serializers.ModelSerializer):
    class Meta:
        model=purchesProductNameModel
        fields='__all__'

# purches paper end 
# invoice start 
class InvoiceBillSerializer(serializers.ModelSerializer):
    class Meta:
        model=InvoiceModel
        fields='__all__'

class InvoiceItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItemsModel
        fields = ["productName","quantity","unit","rate","amount","BillDetails"]
        extra_kwargs = {'BillDetails': {'required': False}}
# invoice end
# purches cover start
class PurchesCoverBillSerializer(serializers.ModelSerializer):
    class Meta:
        model=PurchesCoverBillModel
        fields='__all__'

class PurchesCoverItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchesCoverItemsModel
        fields = ["productName","quantity","unit","rate","amount","BillDetails"]
        extra_kwargs = {'BillDetails': {'required': False}}

class PurchesCoverItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchesCoverItemsModel
        fields = "__all__"
        extra_kwargs = {'BillDetails': {'required': False}}

class PurchesCoverPartySerializer(serializers.ModelSerializer):
    class Meta:
        model=PurchesCoverPartyNameMdel
        fields='__all__'

class purchesCoverProductNameSerializer(serializers.ModelSerializer):
    class Meta:
        model=purchesCoverProductNameModel
        fields='__all__' 

# purches cover end 
        
# Manufacture start 
class ManufactureProductNameSerializer(serializers.ModelSerializer):
    class Meta:
        model=ManufactureProductNameModel
        fields='__all__' 

class ManufactureDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=ManufactureDetailsModel
        fields='__all__'

class ManufactureProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManufactureProductDetailsModel
        fields = ["productName","quantity","paper","cover","unit","manufacture_expences"]
        extra_kwargs = {'manufactureDetails': {'required': False}}

class ManufacturerNameSerializer(serializers.ModelSerializer):
    class Meta:
        model=ManufacturerNameMdel
        fields='__all__'

# Manufacture start 
# sell start 
        
class SellProductBillSerializer(serializers.ModelSerializer):
    class Meta:
        model=SellProductBillModel
        fields=["Vender_name","vendor_mobile","paymentMethod","subTotal","totalQuantity","isGST","gstAmount","gstPercent","roundOff","roundOffAmount","discountPercent","discountAmount","finalTotal","AdvanceAmount","balance","savingAmount","date"]
        extra_kwargs = {'profit': {'required': False}}

class SellProductLastBillSerializer(serializers.ModelSerializer):
    class Meta:
        model=SellProductBillModel
        fields='__all__'

class SellProductItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellProductItemsModel
        fields = ["productName","quantity","unit","rate","amount","profit","BillDetails"]
        extra_kwargs = {'BillDetails': {'required': False}}

class SellProductPartySerializer(serializers.ModelSerializer):
    class Meta:
        model=SellProductPartyNameMdel
        fields='__all__'

class GstPercentSerializer(serializers.ModelSerializer):
    class Meta:
        model=GstPercentModel
        fields='__all__'

# sell end 
# user start 
class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=CompanyProfileModel
        fields="__all__"       

class SliderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=SliderDetailsModel
        fields="__all__"    

class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductDetailsModel
        fields="__all__"  

class BannerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=BannerDetailsModel
        fields="__all__"  

class CompanyBackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model=CompanyBackgroundModel
        fields="__all__"

class TeamMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model=TeamMembersModel
        fields="__all__"

class WorkingAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model=WorkingAreaMdel
        fields="__all__" 

class UserMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserMessageModel
        fields="__all__"
# user end 