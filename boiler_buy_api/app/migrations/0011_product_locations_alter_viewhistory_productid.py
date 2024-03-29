# Generated by Django 4.1.3 on 2022-11-30 14:54

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_remove_shophistory_buyerid'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='locations',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), default=list, size=None),
        ),
        migrations.AlterField(
            model_name='viewhistory',
            name='productID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.product'),
        ),
    ]
