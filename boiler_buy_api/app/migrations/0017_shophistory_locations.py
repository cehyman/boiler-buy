# Generated by Django 4.1.1 on 2022-12-08 15:23

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_groupads'),
    ]

    operations = [
        migrations.AddField(
            model_name='shophistory',
            name='locations',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), default=list, size=None),
        ),
    ]
