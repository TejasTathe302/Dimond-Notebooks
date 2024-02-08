from django.db import models



# common start
class adminDetailsModel(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    mobile=models.CharField(max_length=15)
    password=models.CharField(max_length=100)

class purchesUnitModel(models.Model):
    name = models.CharField(max_length=200)

class paymentMethodModel(models.Model):
    name = models.CharField(max_length=200)

class GstPercentModel(models.Model):
    name=models.CharField(max_length=200)
    GstPercent=models.CharField(max_length=200)

#common end

# paper section start 
class PurchesBillModel(models.Model):
    Vender_name = models.CharField(max_length=200)
    vendor_mobile = models.CharField(max_length=15)
    paymentMethod = models.CharField(max_length=50)
    subTotal = models.CharField(max_length=200)
    totalQuantity = models.CharField(max_length=200)
    isGST = models.BooleanField()
    gstAmount = models.CharField(max_length=200)
    gstPercent=models.CharField(max_length=200,default=0)
    roundOff = models.BooleanField()
    roundOffAmount = models.CharField(max_length=200)
    discountPercent = models.CharField(max_length=200)
    discountAmount = models.CharField(max_length=200)
    finalTotal = models.CharField(max_length=200)
    AdvanceAmount = models.CharField(max_length=200)
    balance = models.CharField(max_length=200)
    savingAmount = models.CharField(max_length=200)
    date = models.CharField(max_length=20)

class PurchesItemsModel(models.Model):
    BillDetails = models.ForeignKey(PurchesBillModel, on_delete=models.CASCADE)
    productName = models.CharField(max_length=200)
    quantity = models.CharField(max_length=200)
    unit = models.CharField(max_length=50)
    rate = models.CharField(max_length=200)
    amount = models.CharField(max_length=200)

class purchesProductNameModel(models.Model):
    name = models.CharField(max_length=200)
    quantity=models.CharField(max_length=50,default=0)
    amount=models.CharField(max_length=50,default=0)
    
class PurchesPartyNameMdel(models.Model):
    name = models.CharField(max_length=200)

# papers section end
# invoice section start
class InvoiceModel(models.Model):
    Vender_name = models.CharField(max_length=200)
    vendor_mobile = models.CharField(max_length=15)
    paymentMethod = models.CharField(max_length=50)
    subTotal = models.CharField(max_length=200)
    totalQuantity = models.CharField(max_length=200)
    isGST = models.BooleanField()
    gstAmount = models.CharField(max_length=200)
    gstPercent=models.CharField(max_length=200,default=0)
    roundOff = models.BooleanField()
    roundOffAmount = models.CharField(max_length=200)
    discountPercent = models.CharField(max_length=200)
    discountAmount = models.CharField(max_length=200)
    finalTotal = models.CharField(max_length=200)
    AdvanceAmount = models.CharField(max_length=200)
    balance = models.CharField(max_length=200)
    savingAmount = models.CharField(max_length=200)
    date = models.CharField(max_length=20)

class InvoiceItemsModel(models.Model):
    BillDetails = models.ForeignKey(InvoiceModel, on_delete=models.CASCADE)
    productName = models.CharField(max_length=200)
    quantity = models.CharField(max_length=200)
    unit = models.CharField(max_length=50)
    rate = models.CharField(max_length=200)
    amount = models.CharField(max_length=200)
# invoice section end
# cover section start 
class PurchesCoverBillModel(models.Model):
    Vender_name = models.CharField(max_length=200)
    vendor_mobile = models.CharField(max_length=15)
    paymentMethod = models.CharField(max_length=50)
    subTotal = models.CharField(max_length=200)
    totalQuantity = models.CharField(max_length=200)
    isGST = models.BooleanField()
    gstAmount = models.CharField(max_length=200)
    gstPercent=models.CharField(max_length=200,default=0)
    roundOff = models.BooleanField()
    roundOffAmount = models.CharField(max_length=200)
    discountPercent = models.CharField(max_length=200)
    discountAmount = models.CharField(max_length=200)
    finalTotal = models.CharField(max_length=200)
    AdvanceAmount = models.CharField(max_length=200)
    balance = models.CharField(max_length=200)
    savingAmount = models.CharField(max_length=200)
    date = models.CharField(max_length=20)

class PurchesCoverItemsModel(models.Model):
    BillDetails = models.ForeignKey(PurchesCoverBillModel, on_delete=models.CASCADE)
    productName = models.CharField(max_length=200)
    quantity = models.CharField(max_length=200)
    unit = models.CharField(max_length=50)
    rate = models.CharField(max_length=200)
    amount = models.CharField(max_length=200)

class purchesCoverProductNameModel(models.Model):
    name = models.CharField(max_length=200)
    quantity=models.CharField(max_length=50,default=0)
    amount=models.CharField(max_length=50,default=0)
    
class PurchesCoverPartyNameMdel(models.Model):
    name = models.CharField(max_length=200)

# purches cover section end
    
# manufacture cover model start 
class ManufactureProductNameModel(models.Model):
    name = models.CharField(max_length=200)
    quantity=models.CharField(max_length=50,default=0)
    amount=models.CharField(max_length=50,default=0)

class ManufactureDetailsModel(models.Model):
    manufacturer_name=models.CharField(max_length=255)
    totalQuantity=models.CharField(max_length=200)
    date=models.CharField(max_length=25)

class ManufactureProductDetailsModel(models.Model):
    productName=models.CharField(max_length=200)
    quantity=models.CharField(max_length=200)
    paper=models.CharField(max_length=200)
    cover=models.CharField(max_length=200)
    unit=models.CharField(max_length=200)
    manufacture_expences=models.CharField(max_length=200)
    manufactureDetails=models.ForeignKey(ManufactureDetailsModel, on_delete=models.CASCADE)

class ManufacturerNameMdel(models.Model):
    name = models.CharField(max_length=200)
# manufacture cover model end
    
# sell start

class SellProductBillModel(models.Model):
    Vender_name = models.CharField(max_length=200)
    vendor_mobile = models.CharField(max_length=15)
    paymentMethod = models.CharField(max_length=50)
    subTotal = models.CharField(max_length=200)
    totalQuantity = models.CharField(max_length=200)
    isGST = models.BooleanField()
    gstAmount = models.CharField(max_length=200)
    gstPercent=models.CharField(max_length=200,default=0)
    roundOff = models.BooleanField()
    roundOffAmount = models.CharField(max_length=200)
    discountPercent = models.CharField(max_length=200)
    discountAmount = models.CharField(max_length=200)
    finalTotal = models.CharField(max_length=200)
    AdvanceAmount = models.CharField(max_length=200)
    balance = models.CharField(max_length=200)
    savingAmount = models.CharField(max_length=200)
    date = models.CharField(max_length=20)
    profit=models.CharField(max_length=2000,default=0)

class SellProductItemsModel(models.Model):
    BillDetails = models.ForeignKey(SellProductBillModel, on_delete=models.CASCADE)
    productName = models.CharField(max_length=200)
    quantity = models.CharField(max_length=200)
    unit = models.CharField(max_length=50)
    rate = models.CharField(max_length=200)
    amount = models.CharField(max_length=200)
    profit= models.CharField(max_length=200,default=0)
    
class SellProductPartyNameMdel(models.Model):
    name = models.CharField(max_length=200)

# sell end


# user part start

class SliderDetailsModel(models.Model):
    image=models.ImageField(upload_to="static/images")
    heading=models.CharField(max_length=250)
    caption=models.TextField()

class ProductDetailsModel(models.Model):
    image=models.ImageField(upload_to="static/images")
    name=models.CharField(max_length=250)
    category=models.CharField(max_length=200)
    description=models.TextField()

class BannerDetailsModel(models.Model):
    pageName=models.CharField(max_length=50)
    image=models.ImageField(upload_to="static/images")
    heading=models.CharField(max_length=200)
    description=models.CharField(max_length=255)

class CompanyBackgroundModel(models.Model): 
    image=models.ImageField(upload_to="static/images")
    heading=models.CharField(max_length=255)
    description_first=models.CharField(max_length=255)
    description_second=models.CharField(max_length=255)

class CompanyProfileModel(models.Model):
    logo=models.ImageField(upload_to="static/images")
    name=models.CharField(max_length=200)
    address=models.TextField()
    mobile=models.CharField(max_length=14)
    email=models.CharField(max_length=200)
    description=models.TextField()
    facebookLink=models.TextField()
    instagramLink=models.TextField() 
    linkdinLink=models.TextField()
    twiterLink=models.TextField()
    mapLocationUrl=models.TextField()

class TeamMembersModel(models.Model):
    image=models.ImageField(upload_to="static/images")
    name=models.CharField(max_length=200)
    position=models.CharField(max_length=200)
    description=models.TextField()
    facebookLink=models.TextField()
    instagramLink=models.TextField()
    linkdinLink=models.TextField()
    twiterLink=models.TextField()

class WorkingAreaMdel(models.Model):
    heading=models.CharField(max_length=250)
    description=models.TextField()

class UserMessageModel(models.Model):
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    subject=models.CharField(max_length=200)
    message=models.TextField()