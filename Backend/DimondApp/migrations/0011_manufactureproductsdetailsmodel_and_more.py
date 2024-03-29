# Generated by Django 5.0.1 on 2024-01-26 11:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DimondApp', '0010_manufacturernamemdel'),
    ]

    operations = [
        migrations.CreateModel(
            name='ManufactureProductsDetailsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.CharField(max_length=200)),
                ('quantity', models.CharField(max_length=200)),
                ('paper', models.CharField(max_length=200)),
                ('cover', models.CharField(max_length=200)),
                ('unit', models.CharField(max_length=200)),
                ('manufactureDetails', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='DimondApp.manufacturedetailsmodel')),
            ],
        ),
        migrations.DeleteModel(
            name='ManufactureProductDetailsModel',
        ),
    ]
