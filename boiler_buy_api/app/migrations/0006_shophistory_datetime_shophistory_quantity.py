# Generated by Django 4.1.1 on 2022-11-04 04:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_merge_20221104_0415'),
    ]

    operations = [
        migrations.AddField(
            model_name='shophistory',
            name='dateTime',
            field=models.DateTimeField(default=datetime.datetime(1970, 1, 1, 0, 0)),
        ),
        migrations.AddField(
            model_name='shophistory',
            name='quantity',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]