# Generated by Django 4.1.1 on 2022-12-09 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_chatgroup'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatgroup',
            name='finalPriceCents',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='chatgroup',
            name='finalPriceDollars',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='chatgroup',
            name='quantity',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='chatgroup',
            name='shippingPriceCents',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='chatgroup',
            name='shippingPriceDollars',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
