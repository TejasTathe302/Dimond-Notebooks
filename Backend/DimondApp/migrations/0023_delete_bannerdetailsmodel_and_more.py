# Generated by Django 5.0.1 on 2024-02-06 11:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('DimondApp', '0022_bannerdetailsmodel_companybackgroundmodel_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BannerDetailsModel',
        ),
        migrations.DeleteModel(
            name='CompanyBackgroundModel',
        ),
        migrations.DeleteModel(
            name='CompanyProfileModel',
        ),
        migrations.DeleteModel(
            name='ProductDetailsModel',
        ),
        migrations.DeleteModel(
            name='SliderDetailsModel',
        ),
        migrations.DeleteModel(
            name='TeamMembersModel',
        ),
        migrations.DeleteModel(
            name='WorkingAreaMdel',
        ),
    ]