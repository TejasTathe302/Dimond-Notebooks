# Generated by Django 5.0.1 on 2024-01-25 06:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DimondApp', '0005_purchesproductnamemodel_amount_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchesCoverBillModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Vender_name', models.CharField(max_length=200)),
                ('vendor_mobile', models.CharField(max_length=15)),
                ('paymentMethod', models.CharField(max_length=50)),
                ('subTotal', models.CharField(max_length=200)),
                ('totalQuantity', models.CharField(max_length=200)),
                ('isGST', models.BooleanField()),
                ('gstAmount', models.CharField(max_length=200)),
                ('roundOff', models.BooleanField()),
                ('roundOffAmount', models.CharField(max_length=200)),
                ('discountPercent', models.CharField(max_length=200)),
                ('discountAmount', models.CharField(max_length=200)),
                ('finalTotal', models.CharField(max_length=200)),
                ('AdvanceAmount', models.CharField(max_length=200)),
                ('balance', models.CharField(max_length=200)),
                ('savingAmount', models.CharField(max_length=200)),
                ('date', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='PurchesCoverPartyNameMdel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='purchesCoverProductNameModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('quantity', models.CharField(default=0, max_length=50)),
                ('amount', models.CharField(default=0, max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='PurchesCoverItemsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.CharField(max_length=200)),
                ('quantity', models.CharField(max_length=200)),
                ('unit', models.CharField(max_length=50)),
                ('rate', models.CharField(max_length=200)),
                ('amount', models.CharField(max_length=200)),
                ('BillDetails', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='DimondApp.purchescoverbillmodel')),
            ],
        ),
    ]