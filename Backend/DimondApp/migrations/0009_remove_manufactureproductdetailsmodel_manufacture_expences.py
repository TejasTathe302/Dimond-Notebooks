# Generated by Django 5.0.1 on 2024-01-26 07:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('DimondApp', '0008_manufacturedetailsmodel_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='manufactureproductdetailsmodel',
            name='manufacture_expences',
        ),
    ]