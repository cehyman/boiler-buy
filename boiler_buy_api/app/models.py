from email.policy import default
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Listing(models.Model):
    name = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    def __str__(self):
        return self.name
        
class Product(models.Model):
    productType = models.CharField(max_length=50)
    priceDollars = models.PositiveIntegerField()
    priceCents = models.PositiveSmallIntegerField()
    shippingDollars = models.PositiveIntegerField()
    shippingCents = models.PositiveSmallIntegerField()
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    reported = models.BooleanField()
    isPending = models.BooleanField()
    isSold = models.BooleanField()
    canShip = models.BooleanField()
    canMeet = models.BooleanField()

class Account(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=50, primary_key=True)
    shop = models.ForeignKey("Shop", on_delete=models.CASCADE, null=True)
    sellerRating = models.FloatField(default=0)
    sellerRatingCount = models.IntegerField(default=0)
    def __str__(self):
        return str(self.username)

class Shop(models.Model):
    description = models.CharField(max_length=250)
    isVisible = models.BooleanField()
    products = models.ManyToManyField("Product")