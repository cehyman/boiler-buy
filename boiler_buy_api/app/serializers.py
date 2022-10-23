from dataclasses import fields
from rest_framework import serializers

from .models import Listing, Product, Account, Shop


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description', 'stock']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productType', 'priceDollars', 'priceCents', 'shippingDollars', 'shippingCents', 'name', 'description', 'reported',
            'isPending', 'isSold', 'canShip', 'canMeet', 'stockCount', 'image']

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'password', 'email', 'shop', 'sellerRating', 'sellerRatingCount']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model: Shop
        fields = ['description', 'isVisible', 'products']