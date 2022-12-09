from email.policy import default
from statistics import mode
from datetime import datetime
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.postgres.fields import *
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Listing(models.Model):
    name = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    stock = models.IntegerField(default=1)
    
    def __str__(self):
        return self.name
        
class Product(models.Model):
    productType = models.CharField(max_length=50)
    priceDollars = models.PositiveIntegerField()
    priceCents = models.PositiveSmallIntegerField()
    shippingDollars = models.PositiveIntegerField()
    shippingCents = models.PositiveSmallIntegerField()
    stockCount = models.PositiveBigIntegerField(default=1)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    reported = models.BooleanField(default=False, blank=True)
    isPending = models.BooleanField(default=False, blank=True)
    isSold = models.BooleanField(default=False, blank=True)
    canShip = models.BooleanField()
    canMeet = models.BooleanField()
    brand = models.CharField(max_length=128, default="")
    image = models.FileField(null=True, blank=True, upload_to='products/')
    locations = ArrayField(models.CharField(max_length=200), default=list)
    tags = ArrayField(models.CharField(max_length=50), default=list)
    allowOutOfStock = models.BooleanField(null=False, blank=False, default=False)
    

class ProductImage(models.Model):
    def uploadTo(self, filename):
        return f"products/{self.product.id}/{filename}"
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(null=True, blank=False, upload_to=uploadTo)

class Shop(models.Model):
    description = models.CharField(max_length=250, default='')
    isVisible = models.BooleanField(default=False)
    products = models.ManyToManyField("Product")

class Wishlist(models.Model):
    description = models.CharField(max_length=250, default='')
    products = models.ManyToManyField("Product")

class GroupAds(models.Model):
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    products = models.ManyToManyField("Product")

class Account(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=50, primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True, db_column="shop_id")
    sellerRating = models.FloatField(default=0)
    sellerRatingCount = models.IntegerField(default=0)
    sellerReviews = ArrayField(models.CharField(max_length=500), default=list)
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, null=True, db_column="wishlist_id")
    image = models.ImageField(null=True, blank=False, upload_to='accounts/')
    verified = models.BooleanField(null=False, blank=True, default=False)
    savedTags = ArrayField(models.CharField(max_length=50), default=list)
    blockedUsers = ArrayField(models.CharField(max_length=50), default=list)


    def __str__(self):
        return str(self.username)
    
class ShopHistory(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="sellerHistory")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=False)
    action = models.CharField(max_length=32, default='')
    dateTime = models.DateTimeField(auto_now=True)
    
    quantity = models.IntegerField(null=True, blank=True)
    buyer = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, blank=True, default=None)
    profit = models.FloatField(null=True, blank=True, default=None)
    locations = ArrayField(models.CharField(max_length=200), default=list)

    # These fields are redundancy against deleted products/accounts/etc.
    productId = models.IntegerField(default=1, blank=False)
    productName = models.CharField(max_length=50)
    buyerName = models.CharField(max_length=30, default='')


class PurchaseHistory(models.Model):
    buyerEmail = models.ForeignKey("Account", on_delete=models.CASCADE, related_name='pHistories')
    purchaseTime = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    sellerEmail = models.ForeignKey("Account", null=True, on_delete=models.SET_NULL)
    description = models.CharField(max_length=250)
    totalPriceDollars = models.PositiveIntegerField()
    totalPriceCents = models.PositiveSmallIntegerField()
    image = models.FileField(null=True, blank=True, upload_to='products/', )

class ViewHistory(models.Model):
    email = models.ForeignKey("Account", on_delete=models.CASCADE)
    productID = models.ForeignKey("Product", null=True, on_delete=models.CASCADE)
    lastViewed = models.DateTimeField(auto_now=True)

class ChatMessages(models.Model):
    sender = models.ForeignKey(Account, on_delete=models.CASCADE, null=False, related_name='senderEmail')
    receiver = models.ForeignKey(Account, on_delete=models.CASCADE, null=False, related_name='receiverEmail')
    productID = models.ForeignKey(Product, null=True, on_delete=models.CASCADE)
    message = models.CharField(max_length=256)
    timestamp = models.DateTimeField(auto_now_add=True)
    senderImage = models.FileField(null=True, blank=False, default=None)
    receiverImage = models.FileField(null=True, blank=False, default=None)
    
    def __str__(self):
        return str(self.username)

class ChatGroup(models.Model):
    buyer = models.ForeignKey(Account, on_delete=models.CASCADE, null=False, related_name='buyerEmail')
    seller = models.ForeignKey(Account, on_delete=models.CASCADE, null=False, related_name='sellerEmail')
    product = models.ForeignKey(Product, null=True, on_delete=models.CASCADE)
    isNegotiating = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField(null=True)
    shippingPriceDollars = models.PositiveIntegerField(null=True)
    shippingPriceCents = models.PositiveIntegerField(null=True)
    finalPriceDollars = models.PositiveIntegerField(null=True)
    finalPriceCents = models.PositiveIntegerField(null=True)
    isShipping = models.BooleanField(default=False)
    trackingNumber = models.CharField(max_length=250)
    trackingLink = models.CharField(max_length=500)

