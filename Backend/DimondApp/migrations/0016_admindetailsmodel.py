# Generated by Django 5.0.1 on 2024-02-02 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DimondApp', '0015_gstpercentmodel_purchesbillmodel_gstpercent_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='adminDetailsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('mobile', models.CharField(max_length=15)),
                ('password', models.CharField(max_length=100)),
            ],
        ),
    ]
