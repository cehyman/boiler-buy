# Generated by Django 4.1.1 on 2022-10-04 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='stock',
            field=models.IntegerField(default=1),
        ),
    ]