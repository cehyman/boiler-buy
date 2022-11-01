from dataclasses import field, fields
from rest_framework import serializers

from .models import Listing, Product, Account, Shop, PurchaseHistory


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description', 'stock']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productType', 'priceDollars', 'priceCents', 'shippingDollars', 'shippingCents', 'name', 'description', 'reported',
            'isPending', 'isSold', 'canShip', 'canMeet', 'stockCount', 'image', 'brand']

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'password', 'email', 'shop', 'sellerRating', 'sellerRatingCount', 'sellerReviews']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model: Shop
        fields = ['description', 'isVisible', 'products']

class PurchaseHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model: PurchaseHistory
        fields = ['email', 'purchaseTime', 'name', 'sellerEmail', 'description', 'totalPriceDollars', 'totalPriceCents', 'image']
