from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from .models import BannerDetailsModel, CompanyBackgroundModel, CompanyProfileModel, GstPercentModel, InvoiceItemsModel, InvoiceModel, ManufactureDetailsModel, ManufactureProductDetailsModel, ManufactureProductNameModel, ManufacturerNameMdel, ProductDetailsModel, PurchesBillModel, PurchesCoverBillModel, PurchesCoverItemsModel, PurchesCoverPartyNameMdel, PurchesItemsModel, PurchesPartyNameMdel, SellProductBillModel, SellProductItemsModel, SellProductPartyNameMdel, SliderDetailsModel, TeamMembersModel, UserMessageModel, WorkingAreaMdel, adminDetailsModel, paymentMethodModel, purchesCoverProductNameModel, purchesProductNameModel, purchesUnitModel
import jwt
from django.db.models import F
from .serializers import BannerDetailsSerializer, CompanyBackgroundSerializer, CompanyProfileSerializer, GstPercentSerializer, InvoiceBillSerializer, InvoiceItemsSerializer, ManufactureDetailsSerializer, ManufactureProductDetailsSerializer, ManufactureProductNameSerializer, ManufacturerNameSerializer, ProductDetailsSerializer, PurchesBillSerializer, PurchesCoverBillSerializer, PurchesCoverItemSerializer, PurchesCoverItemsSerializer, PurchesCoverPartySerializer, PurchesItemsSerializer, PurchesPartySerializer, PurchesUnitSerializer, SellProductBillSerializer, SellProductItemsSerializer, SellProductLastBillSerializer, SellProductPartySerializer, SliderDetailsSerializer, TeamMembersSerializer, UserMessageSerializer, WorkingAreaSerializer, adminDetailsSerilizer, paymentMethodSerializer, purchesCoverProductNameSerializer, purchesProductNameSerializer
# common code start 

def emptyUrl(req):
    return JsonResponse({"status":"success"})

key='dimond'
def sendToken(id):
    token_payload = {"bill_id":id}
    token = jwt.encode(token_payload, key , algorithm='HS256')
    return token

def acceptToken(token):
    token_payload = jwt.decode(token, key, algorithms='HS256')
    id = token_payload.get("bill_id")
    return id

@api_view(['POST'])
def doAdminLogin(req):
    user_input = req.data.get('admin_login_uname_mobile')
    upassword = req.data.get('admin_login_password')
    user = adminDetailsModel.objects.filter(
        Q(email=user_input) | Q(mobile=user_input),
        password=upassword
    )
    if user.exists():
        return JsonResponse({"status":"success","token":sendToken(user[0].id)})
    else:
        return JsonResponse({"status":"fail","token":''})

@api_view(['GET'])
def getAdminDetails(req,id):
    admin=adminDetailsModel.objects.get(id=acceptToken(id))
    adminSerializer=adminDetailsSerilizer(admin,many=False)
    if(len(adminSerializer.data)>0):
        return JsonResponse({"data":adminSerializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getGstPercent(req):
    items=GstPercentModel.objects.all()
    serializer=GstPercentSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPaymentMethods(req):
    items=paymentMethodModel.objects.all()
    serializer=paymentMethodSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPurchesUnits(req):
    items=purchesUnitModel.objects.all()
    serializer=PurchesUnitSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getBill(req,token,method):
    if(method =="paper"):
        getBill=PurchesBillModel.objects.get(id=acceptToken(token))
        billSerializer=PurchesBillSerializer(getBill,many=False)
        getItems=PurchesItemsModel.objects.filter(BillDetails=acceptToken(token))
        itemSerializer=PurchesItemsSerializer(getItems,many=True)
    elif(method == "cover"):
        getBill=PurchesCoverBillModel.objects.get(id=acceptToken(token))
        billSerializer=PurchesCoverBillSerializer(getBill,many=False)
        getItems=PurchesCoverItemsModel.objects.filter(BillDetails=acceptToken(token))
        itemSerializer=PurchesCoverItemSerializer(getItems,many=True)
    elif(method == "sell"):
        getBill=SellProductBillModel.objects.get(id=acceptToken(token))
        billSerializer=SellProductLastBillSerializer(getBill,many=False)
        getItems=SellProductItemsModel.objects.filter(BillDetails=acceptToken(token))
        itemSerializer=SellProductItemsSerializer(getItems,many=True)
    elif(method =="history"):
        getBill=InvoiceModel.objects.get(id=acceptToken(token))
        billSerializer=InvoiceBillSerializer(getBill,many=False)
        getItems=InvoiceItemsModel.objects.filter(BillDetails=acceptToken(token))
        itemSerializer=InvoiceItemsSerializer(getItems,many=True)
    else:
        getBill=ManufactureDetailsModel.objects.get(id=acceptToken(token))
        billSerializer=ManufactureDetailsSerializer(getBill,many=False)
        getItems=ManufactureProductDetailsModel.objects.filter(manufactureDetails=acceptToken(token))
        itemSerializer=ManufactureProductDetailsSerializer(getItems,many=True)
    if(len(billSerializer.data)>0):
        return JsonResponse({"bill":billSerializer.data,"items":itemSerializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

# common code end
# admin control start 

@api_view(['GET'])
def getPaymentMethod(req,id):
    items=paymentMethodModel.objects.get(id=id)
    serializer=paymentMethodSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editPaymentMethod(req,id):
    items=paymentMethodModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getGstPercent1(req,id):
    items=GstPercentModel.objects.get(id=id)
    serializer=GstPercentSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editGstPercent(req,id):
    items=GstPercentModel.objects.get(id=id)
    items.GstPercent=req.data.get("GstPercent")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deletePaymentMethod(req,id):
    items=paymentMethodModel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['POST'])
def addPaymentMethod(req):
    serializer = paymentMethodSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPaperCustomerName(req,id):
    items=PurchesPartyNameMdel.objects.get(id=id)
    serializer=PurchesPartySerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def edditPurchesPartyName(req,id):
    items=PurchesPartyNameMdel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deletePurchesPaperCustomer(req,id):
    items=PurchesPartyNameMdel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getPurchesProductPaperName(req,id):
    items=purchesProductNameModel.objects.get(id=id)
    serializer=purchesProductNameSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def edditPurchesPaperProductName(req,id):
    items=purchesProductNameModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getPurchesProductCoverPartyName(req,id):
    items=PurchesCoverPartyNameMdel.objects.get(id=id)
    serializer=purchesCoverProductNameSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def edditPurchesCoverPartyName(req,id):
    items=PurchesCoverPartyNameMdel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deletePurchesCoverCustomer(req,id):
    items=PurchesCoverPartyNameMdel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getPurchesProductCoverName(req,id):
    items=purchesCoverProductNameModel.objects.get(id=id)
    serializer=purchesCoverProductNameSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def edditPurchesCoverProductName(req,id):
    items=purchesCoverProductNameModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getManufacturerNamee(req,id):
    items=ManufacturerNameMdel.objects.get(id=id)
    serializer=ManufacturerNameSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def edditManufacturerName(req,id):
    items=ManufacturerNameMdel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deleteManufacturer(req,id):
    items=ManufacturerNameMdel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getManufacturedProductNamee(req,id):
    items=ManufactureProductNameModel.objects.get(id=id)
    serializer=ManufactureProductNameSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def edditManufacturedProdutName(req,id):
    items=ManufactureProductNameModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getSellCustomer(req,id):
    items=SellProductPartyNameMdel.objects.get(id=id)
    serializer=SellProductPartySerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def edditSellCustomerName(req,id):
    items=SellProductPartyNameMdel.objects.get(id=id)
    items.name=req.data.get("name")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deleteSellCustomer(req,id):
    items=SellProductPartyNameMdel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getAdminAllDetails(req):
    items=adminDetailsModel.objects.all()
    serializer=adminDetailsSerilizer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getAdminDataForEdit(req,id):
    items=adminDetailsModel.objects.get(id=id)
    serializer=adminDetailsSerilizer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def EditeditAdminData(req,id):
    items=adminDetailsModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.email=req.data.get("email")
    items.mobile=req.data.get("mobile")
    items.password=req.data.get("password")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['POST'])
def addNewAdminData(req):
    serializer = adminDetailsSerilizer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['DELETE'])
def deleteAdmin(req,id):
    items=adminDetailsModel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

# admin control end 
# invoice start 

@api_view(['POST'])
def addInvoice(request):
    bill_data = request.data.get('staticData', {})
    items_data = request.data.get('products', [])
    purches_bill_serializer = InvoiceBillSerializer(data=bill_data)
    purches_items_serializer = InvoiceItemsSerializer(data=items_data, many=True)
    if purches_bill_serializer.is_valid() and purches_items_serializer.is_valid():
        bill_instance = purches_bill_serializer.save()
        for item_data in purches_items_serializer.validated_data:
            item_data["BillDetails"] = bill_instance  
            InvoiceItemsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getInvoiceBillNo(req):
    last_entry = InvoiceModel.objects.last()
    if last_entry:
        serializer = InvoiceBillSerializer(last_entry)
        return JsonResponse({"id": serializer.data['id'],"status":"success"}, safe=False)
    return JsonResponse({"status": "fail"})

@api_view(['GET'])
def getAllInvoiceBill(req):
    items = list(InvoiceModel.objects.all())[::-1]
    serializer=InvoiceBillSerializer(items,many=True)
    for data in serializer.data:
        data['id']=sendToken(data['id'])
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editInvoice(req,id):
    try:
        bill_instance = InvoiceModel.objects.get(id=id)
    except InvoiceModel.DoesNotExist:
        return JsonResponse({"status":"fail"}, status=404)
    bill_serializer = InvoiceBillSerializer(instance=bill_instance, data=req.data['staticData'], partial=True)
    items_serializer = InvoiceItemsSerializer(data=req.data['products'], many=True)
    if bill_serializer.is_valid() and items_serializer.is_valid():
        bill_serializer.save()
        InvoiceItemsModel.objects.filter(BillDetails=bill_instance).delete()
        for item_data in items_serializer.validated_data:
            item_data["BillDetails"] = bill_instance
            InvoiceItemsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

# invoice end 
# purches paper start  

@api_view(['POST'])
def addPurchesMeterial(request):
    bill_data = request.data.get('staticData', {})
    items_data = request.data.get('products', [])
    purches_bill_serializer = PurchesBillSerializer(data=bill_data)
    purches_items_serializer = PurchesItemsSerializer(data=items_data, many=True)
    if purches_bill_serializer.is_valid() and purches_items_serializer.is_valid():
        bill_instance = purches_bill_serializer.save()
        for item_data in purches_items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            rate = item_data['rate']
            unit = item_data['unit']
            if(unit == "DZN"):
                quantity=float(quantity)*12
            product_instance = purchesProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) + float(quantity)
            product_instance.amount = float(product_instance.amount) +  float(rate)
            product_instance.save()
            item_data["BillDetails"] = bill_instance  
            PurchesItemsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editPurchesMeterial(req,id):
    try:
        bill_instance = PurchesBillModel.objects.get(id=id)
    except PurchesBillModel.DoesNotExist:
        return JsonResponse({"status":"fail"}, status=404)
    bill_serializer = PurchesBillSerializer(instance=bill_instance, data=req.data['staticData'], partial=True)
    items_serializer = PurchesItemsSerializer(data=req.data['products'], many=True)
    if bill_serializer.is_valid() and items_serializer.is_valid():
        bill_serializer.save()
        old_data=PurchesItemsModel.objects.filter(BillDetails=bill_instance)
        for item_data in old_data:
            product_name = item_data.productName
            quantity = item_data.quantity
            rate = item_data.rate
            unit = item_data.unit
            if(unit == "DZN"):
                quantity=float(quantity)*12
            product_instance = purchesProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) - float(quantity)
            product_instance.amount = float(product_instance.amount) -  float(rate)
            product_instance.save()
        old_data.delete()
        for item_data in items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            rate = item_data['rate']
            unit = item_data['unit']
            if(unit == "DZN"):
                quantity=float(quantity)*12
            product_instance = purchesProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) + float(quantity)
            product_instance.amount = float(product_instance.amount) +  float(rate)
            product_instance.save()
            item_data["BillDetails"] = bill_instance
            PurchesItemsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPurchesBillNo(req):
    last_entry = PurchesBillModel.objects.last()
    if last_entry:
        serializer = PurchesBillSerializer(last_entry)
        return JsonResponse({"id": serializer.data['id'],"status":"success"}, safe=False)
    return JsonResponse({"status": "fail"})

@api_view(['GET'])
def getAllPurchesBill(req):
    items = list(PurchesBillModel.objects.all())[::-1]
    serializer=PurchesBillSerializer(items,many=True)
    for data in serializer.data:
        data['id']=sendToken(data['id'])
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPurchesPartyName(req):
    items=PurchesPartyNameMdel.objects.all()
    serializer=PurchesPartySerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['POST'])
def addPurchesPartyName(req):
    serializer = PurchesPartySerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPurchesProductName(req):
    items=purchesProductNameModel.objects.all()
    serializer=purchesProductNameSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['POST'])
def addPurchesProductName(req):
    serializer = purchesProductNameSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

# purches paper  end 
# purches cover  start

@api_view(['POST'])
def addPurchesCoverMeterial(request):
    bill_data = request.data.get('staticData', {})
    items_data = request.data.get('products', [])
    purches_bill_serializer = PurchesCoverBillSerializer(data=bill_data)
    purches_items_serializer = PurchesCoverItemsSerializer(data=items_data, many=True)
    if purches_bill_serializer.is_valid() and purches_items_serializer.is_valid():
        bill_instance = purches_bill_serializer.save()
        for item_data in purches_items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            rate = item_data['rate']
            unit = item_data['unit']
            if(unit == "DZN"):
                quantity=float(quantity)*12
            product_instance = purchesCoverProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) + float(quantity)
            product_instance.amount = float(product_instance.amount) +  float(rate)
            product_instance.save()
            item_data["BillDetails"] = bill_instance  
            PurchesCoverItemsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editPurchesCoverMeterial(req,id):
    try:
        bill_instance = PurchesCoverBillModel.objects.get(id=id)
    except PurchesCoverBillModel.DoesNotExist:
        return JsonResponse({"status":"fail"})
    bill_serializer = PurchesCoverBillSerializer(instance=bill_instance, data=req.data['staticData'], partial=True)
    items_serializer = PurchesCoverItemsSerializer(data=req.data['products'], many=True)
    if bill_serializer.is_valid() and items_serializer.is_valid():
        bill_serializer.save()
        old_data=PurchesCoverItemsModel.objects.filter(BillDetails=bill_instance)
        for item_data in old_data:
            product_name = item_data.productName
            quantity = item_data.quantity
            rate = item_data.rate
            unit = item_data.unit
            if(unit == "DZN"):
                quantity=float(quantity)*12
            product_instance = purchesCoverProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) - float(quantity)
            product_instance.amount = float(product_instance.amount) -  float(rate)
            product_instance.save()
        old_data.delete()
        for item_data in items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            rate = item_data['rate']
            unit = item_data['unit']
            if(unit == "DZN"):
                quantity=float(quantity)*12
            product_instance = purchesCoverProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) + float(quantity)
            product_instance.amount = float(product_instance.amount) +  float(rate)
            product_instance.save()
            item_data["BillDetails"] = bill_instance
            PurchesCoverItemsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPurchesCoverPartyName(req):
    items=PurchesCoverPartyNameMdel.objects.all()
    serializer=PurchesCoverPartySerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPurchesCoverBillNo(req):
    last_entry = PurchesCoverBillModel.objects.last()
    if last_entry:
        serializer = PurchesCoverBillSerializer(last_entry)
        return JsonResponse({"id": serializer.data['id'],"status":"success"}, safe=False)
    return JsonResponse({"status": "fail"})

@api_view(['POST'])
def addPurchesCoverPartyName(req):
    serializer = PurchesCoverPartySerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getAllPurchesCoverBill(req):
    items = list(PurchesCoverBillModel.objects.all())[::-1]
    serializer=PurchesCoverBillSerializer(items,many=True)
    for data in serializer.data:
        data['id']=sendToken(data['id'])
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getPurchesCoverProductName(req):
    items=purchesCoverProductNameModel.objects.all()
    serializer=purchesCoverProductNameSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['POST'])
def addPurchesCoverProductName(req):
    serializer = purchesCoverProductNameSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

# purches cover end 
# manufacture product start 

@api_view(['GET'])
def getManufactureProductName(req):
    items=ManufactureProductNameModel.objects.all()
    serializer=ManufactureProductNameSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['POST'])
def addManufactureProductName(req):
    serializer = ManufactureProductNameSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getManufactureBillNo(req):
    last_entry = ManufactureDetailsModel.objects.last()
    if last_entry:
        serializer = ManufactureDetailsSerializer(last_entry)
        return JsonResponse({"id": serializer.data['id'],"status":"success"}, safe=False)
    return JsonResponse({"status": "fail"})

@api_view(['POST'])
def addManufactureProduct(request):
    bill_data = request.data.get('staticData', {})
    items_data = request.data.get('products', [])
    purches_bill_serializer = ManufactureDetailsSerializer(data=bill_data)
    purches_items_serializer = ManufactureProductDetailsSerializer(data=items_data, many=True)
    if purches_bill_serializer.is_valid() and purches_items_serializer.is_valid():
        bill_instance = purches_bill_serializer.save()
        for item_data in purches_items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            unit = item_data['unit']
            if(unit == "DZN"):
                quantity=float(quantity)*12
            paper=item_data["paper"]
            paper_instance = purchesProductNameModel.objects.get(name=paper)
            paper_price_per_pice= float(paper_instance.amount)/float(paper_instance.quantity)
            paper_instance.amount=float(paper_instance.amount)-float((float(paper_instance.amount)/float(paper_instance.quantity))*float(quantity))
            paper_instance.quantity=float(paper_instance.quantity)-float(quantity)
            paper_instance.save()
            cover=item_data["cover"]
            cover_instance = purchesCoverProductNameModel.objects.get(name=cover)
            cover_price_per_pice=float(cover_instance.amount)/float(cover_instance.quantity)
            cover_instance.amount=float(cover_instance.amount)-float((float(cover_instance.amount)/float(cover_instance.quantity))*float(quantity))
            cover_instance.quantity=float(cover_instance.quantity)-float(quantity)
            cover_instance.save()
            rate = (float(paper_price_per_pice) + float(cover_price_per_pice) + float(item_data["manufacture_expences"]))*float(quantity)
            product_instance = ManufactureProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) + float(quantity)
            product_instance.amount = float(product_instance.amount) +  float(rate)
            product_instance.save()
            item_data["manufactureDetails"] = bill_instance 
            ManufactureProductDetailsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editManufactureMeterial(req,id):
    try:
        bill_instance = ManufactureDetailsModel.objects.get(id=id)
    except ManufactureDetailsModel.DoesNotExist:
        return JsonResponse({"status":"fail"})
    bill_serializer = ManufactureDetailsSerializer(instance=bill_instance, data=req.data['staticData'], partial=True)
    items_serializer = ManufactureProductDetailsSerializer(data=req.data['products'], many=True)
    if bill_serializer.is_valid() and items_serializer.is_valid():
        bill_serializer.save()
        old_data=ManufactureProductDetailsModel.objects.filter(manufactureDetails=bill_instance)
        for item_data in old_data:
            product_name = item_data.productName
            quantity = item_data.quantity
            unit = item_data.unit
            if(unit == "DZN"):
                quantity=float(quantity)*12
            paper=item_data.paper
            paper_instance = purchesProductNameModel.objects.get(name=paper)
            paper_price_per_pice= float(paper_instance.amount)/float(paper_instance.quantity)
            paper_instance.amount=float(paper_instance.amount)+float((float(paper_instance.amount)/float(paper_instance.quantity))*float(quantity))
            paper_instance.quantity=float(paper_instance.quantity)+float(quantity)
            paper_instance.save()
            cover=item_data.cover
            cover_instance = purchesCoverProductNameModel.objects.get(name=cover)
            cover_price_per_pice=float(cover_instance.amount)/float(cover_instance.quantity)
            cover_instance.amount=float(cover_instance.amount)+float((float(cover_instance.amount)/float(cover_instance.quantity))*float(quantity))
            cover_instance.quantity=float(cover_instance.quantity)+float(quantity)
            cover_instance.save()
            rate = (float(paper_price_per_pice) + float(cover_price_per_pice) + float(item_data.manufacture_expences))*float(quantity)
            product_instance = ManufactureProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) - float(quantity)
            product_instance.amount = float(product_instance.amount) -  float(rate)
            product_instance.save()
        old_data.delete()
        for item_data in items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            unit = item_data['unit']
            if(unit == "DZN"):
                quantity=float(quantity)*12
            paper=item_data["paper"]
            paper_instance = purchesProductNameModel.objects.get(name=paper)
            paper_price_per_pice= float(paper_instance.amount)/float(paper_instance.quantity)
            paper_instance.amount=float(paper_instance.amount)-float((float(paper_instance.amount)/float(paper_instance.quantity))*float(quantity))
            paper_instance.quantity=float(paper_instance.quantity)-float(quantity)
            paper_instance.save()
            cover=item_data["cover"]
            cover_instance = purchesCoverProductNameModel.objects.get(name=cover)
            cover_price_per_pice=float(cover_instance.amount)/float(cover_instance.quantity)
            cover_instance.amount=float(cover_instance.amount)-float((float(cover_instance.amount)/float(cover_instance.quantity))*float(quantity))
            cover_instance.quantity=float(cover_instance.quantity)-float(quantity)
            cover_instance.save()
            rate = (float(paper_price_per_pice) + float(cover_price_per_pice) + float(item_data["manufacture_expences"]))*float(quantity)
            product_instance = ManufactureProductNameModel.objects.get(name=product_name)
            product_instance.quantity = float(product_instance.quantity) + float(quantity)
            product_instance.amount = float(product_instance.amount) +  float(rate)
            product_instance.save()
            item_data["manufactureDetails"] = bill_instance
            ManufactureProductDetailsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['POST']) 
def addManufacturerName(req):
    serializer = ManufacturerNameSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getManufacturerName(req):
    items=ManufacturerNameMdel.objects.all()
    serializer=ManufacturerNameSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getAllMnufactureProduct(req):
    items = list(ManufactureDetailsModel.objects.all())[::-1]
    serializer=ManufactureDetailsSerializer(items,many=True)
    for data in serializer.data:
        data['id']=sendToken(data['id'])
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getAllMnufactureProductDetail(req,token):
    items=ManufactureDetailsModel.objects.get(id=acceptToken(token))
    serializer=ManufactureDetailsSerializer(items,many=False)
    items1=ManufactureProductDetailsModel.objects.filter(manufactureDetails=acceptToken(token))
    serializer1=ManufactureProductDetailsSerializer(items1,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"manufacturarDetails":serializer.data,"manufactureProductDetails":serializer1.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

# manufacture product end
# sell start 

@api_view(['POST'])
def addSellProductMeterial(request):
    bill_data = request.data.get('staticData', {})
    items_data = request.data.get('products', [])
    purches_bill_serializer = SellProductBillSerializer(data=bill_data)
    purches_items_serializer = SellProductItemsSerializer(data=items_data, many=True)
    if purches_bill_serializer.is_valid() and purches_items_serializer.is_valid():
        bill_instance = purches_bill_serializer.save()
        totprofit=0
        for item_data in purches_items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            unit = item_data['unit']
            amount=item_data["amount"]
            if(unit == "DZN"):
                quantity=float(quantity)*12
            manproduct = ManufactureProductNameModel.objects.get(name=product_name)
            man_pro_price_per_pice=float(manproduct.amount)/float(manproduct.quantity)
            manproduct.amount=float(manproduct.amount)-float((float(manproduct.amount)/float(manproduct.quantity))*float(quantity))
            manproduct.quantity=float(manproduct.quantity)-float(quantity)
            manproduct.save()
            prfit_per_piece=float(float(amount)/float(quantity))-man_pro_price_per_pice
            item_data["profit"]=prfit_per_piece
            item_data["BillDetails"] = bill_instance
            totprofit +=prfit_per_piece
            SellProductItemsModel.objects.create(**item_data)
        getmanproduct = SellProductBillModel.objects.get(id=bill_instance.id)
        getmanproduct.profit=totprofit
        getmanproduct.save()
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editSellMeterial(req,id):
    try:
        bill_instance = SellProductBillModel.objects.get(id=id)
    except SellProductBillModel.DoesNotExist:
        return JsonResponse({"status":"fail"}, status=404)
    bill_serializer = SellProductBillSerializer(instance=bill_instance, data=req.data['staticData'], partial=True)
    items_serializer = SellProductItemsSerializer(data=req.data['products'], many=True)
    if bill_serializer.is_valid() and items_serializer.is_valid():
        bill_serializer.save()
        old_data=SellProductItemsModel.objects.filter(BillDetails=bill_instance)
        totprofit=0
        for item_data in old_data:
            product_name = item_data.productName
            quantity = item_data.quantity
            unit = item_data.unit
            amount=item_data.amount
            if(unit == "DZN"):
                quantity=float(quantity)*12
            manproduct = ManufactureProductNameModel.objects.get(name=product_name)
            man_pro_price_per_pice=float(manproduct.amount)/float(manproduct.quantity)
            manproduct.amount=float(manproduct.amount)+float((float(manproduct.amount)/float(manproduct.quantity))*float(quantity))
            manproduct.quantity=float(manproduct.quantity)+float(quantity)
            manproduct.save()
        old_data.delete()
        for item_data in items_serializer.validated_data:
            product_name = item_data['productName']
            quantity = item_data['quantity']
            unit = item_data['unit']
            amount=item_data["amount"]
            if(unit == "DZN"):
                quantity=float(quantity)*12
            manproduct = ManufactureProductNameModel.objects.get(name=product_name)
            man_pro_price_per_pice=float(manproduct.amount)/float(manproduct.quantity)
            manproduct.amount=float(manproduct.amount)-float((float(manproduct.amount)/float(manproduct.quantity))*float(quantity))
            manproduct.quantity=float(manproduct.quantity)-float(quantity)
            manproduct.save()
            prfit_per_piece=float(float(amount)/float(quantity))-man_pro_price_per_pice
            item_data["profit"]=prfit_per_piece
            item_data["BillDetails"] = bill_instance
            totprofit +=prfit_per_piece
            SellProductItemsModel.objects.create(**item_data)
        return JsonResponse({"status": "success", "token": sendToken(bill_instance.id)})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getSellProductPartyName(req):
    items=SellProductPartyNameMdel.objects.all()
    serializer=SellProductPartySerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['POST'])
def addSellProductPartyName(req):
    serializer = SellProductPartySerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getSellProductBillNo(req):
    last_entry = SellProductBillModel.objects.last()
    if last_entry:
        serializer = SellProductLastBillSerializer(last_entry)
        return JsonResponse({"id": serializer.data['id'],"status":"success"}, safe=False)
    return JsonResponse({"status": "fail"})

@api_view(['GET'])
def getAllSellProductBill(req):
    items = list(SellProductBillModel.objects.all())[::-1]
    serializer=SellProductLastBillSerializer(items,many=True)
    for data in serializer.data:
        data['id']=sendToken(data['id'])
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

# sell end 
# user start 
@api_view(['PATCH'])
def editCompanyDetails(req,id):
    items=CompanyProfileModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.address=req.data.get("address")
    items.email=req.data.get("email")
    items.description=req.data.get("description")
    items.facebookLink=req.data.get("facebookLink")
    items.instagramLink=req.data.get("instagramLink")
    items.linkdinLink=req.data.get("linkdinLink")
    items.twiterLink=req.data.get("twiterLink")
    items.mapLocationUrl=req.data.get("mapLocationUrl")
    if(req.data.get("logo")):
        items.logo=req.data.get("logo")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getCompanyDetails(req):
    first_entry = CompanyProfileModel.objects.first()
    if first_entry:
        serializer = CompanyProfileSerializer(first_entry,many=False)
        return JsonResponse({"data": serializer.data,"status":"success"}, safe=False)
    return JsonResponse({"status": "fail"})

@api_view(['GET'])
def getSliderDetails(req):
    items=SliderDetailsModel.objects.all()
    serializer=SliderDetailsSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getSliderDetailsForEdit(req,id):
    items=SliderDetailsModel.objects.get(id=id)
    serializer=SliderDetailsSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editSliderDetails(req,id):
    items=SliderDetailsModel.objects.get(id=id)
    items.heading=req.data.get("heading")
    items.caption=req.data.get("caption")
    if(req.data.get("image")):
        items.image=req.data.get("image")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['POST'])
def addSliderDetails(req):
    serializer = SliderDetailsSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['DELETE'])
def deleteSliderDetails(req,id):
    items=SliderDetailsModel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getAllProductDetails(req):
    items=list(ProductDetailsModel.objects.all())[::-1]
    serializer=ProductDetailsSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getProductDetailsForEdit(req,id):
    items=ProductDetailsModel.objects.get(id=id)
    serializer=ProductDetailsSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editProductDetails(req,id):
    items=ProductDetailsModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.category=req.data.get("category")
    items.description=req.data.get("description")
    if(req.data.get("image")):
        items.image=req.data.get("image")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deleteProductDetails(req,id):
    items=ProductDetailsModel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['POST'])
def addProductDetails(req):
    serializer = ProductDetailsSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getAllBannerDetails(req):
    items=BannerDetailsModel.objects.all()
    serializer=BannerDetailsSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getBannerDetailsForEdit(req,id):
    items=BannerDetailsModel.objects.get(id=id)
    serializer=BannerDetailsSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editBannesDetails(req,id):
    items=BannerDetailsModel.objects.get(id=id)
    items.heading=req.data.get("heading")
    items.description=req.data.get("description")
    if(req.data.get("image")):
        items.image=req.data.get("image")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getAllBackgroundDetails(req):
    items=CompanyBackgroundModel.objects.all()
    serializer=CompanyBackgroundSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getBackgroundDetailsForEdit(req,id):
    items=CompanyBackgroundModel.objects.get(id=id)
    serializer=CompanyBackgroundSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editBackgroundDetails(req,id):
    items=CompanyBackgroundModel.objects.get(id=id)
    items.heading=req.data.get("heading")
    items.description_first=req.data.get("description_first")
    items.description_second=req.data.get("description_second")
    if(req.data.get("image")):
        items.image=req.data.get("image")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['GET'])
def getAllTeamDetails(req):
    items=TeamMembersModel.objects.all()
    serializer=TeamMembersSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getTeamDetailsForEdit(req,id):
    items=TeamMembersModel.objects.get(id=id)
    serializer=TeamMembersSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editTeamDetails(req,id):
    items=TeamMembersModel.objects.get(id=id)
    items.name=req.data.get("name")
    items.position=req.data.get("position")
    items.description=req.data.get("description")
    items.facebookLink=req.data.get("facebookLink")
    items.instagramLink=req.data.get("instagramLink")
    items.twiterLink=req.data.get("twiterLink")
    items.linkdinLink=req.data.get("linkdinLink")
    if(req.data.get("image")):
        items.image=req.data.get("image")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deleteTeamDetails(req,id):
    items=TeamMembersModel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['POST'])
def addTeamDetails(req):
    serializer = TeamMembersSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getAllWorkingDetails(req):
    items=WorkingAreaMdel.objects.all()
    serializer=WorkingAreaSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getWorkingDetailsForEdit(req,id):
    items=WorkingAreaMdel.objects.get(id=id)
    serializer=WorkingAreaSerializer(items,many=False)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['PATCH'])
def editWorkingDetails(req,id):
    items=WorkingAreaMdel.objects.get(id=id)
    items.heading=req.data.get("heading")
    items.description=req.data.get("description")
    items.save()
    return JsonResponse({"status":"success"})

@api_view(['DELETE'])
def deleteWorkingDetails(req,id):
    items=WorkingAreaMdel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

@api_view(['POST'])
def addWorkingDetails(req):
    serializer = WorkingAreaSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['POST'])
def saveMessage(req):
    serializer = UserMessageSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success"})
    return JsonResponse({"status":"fail"})

@api_view(['GET'])
def getAllMessage(req):
    items=UserMessageModel.objects.all()
    serializer=UserMessageSerializer(items,many=True)
    if(len(serializer.data)>0):
        return JsonResponse({"data":serializer.data,"status":"success"},safe=False)
    return JsonResponse({"status":"fail"})

@api_view(['DELETE'])
def deleteMesasgeDetails(req,id):
    items=UserMessageModel.objects.get(id=id)
    items.delete()
    return JsonResponse({"status":"success"})

# user end  