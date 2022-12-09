from dataclasses import field, fields
from importlib.metadata import files
from rest_framework import serializers

from .models import *

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description', 'stock']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productType', 'priceDollars', 'priceCents', 'shippingDollars', 'shippingCents', 'name', 'description', 'reported',
            'isPending', 'isSold', 'canShip', 'canMeet', 'stockCount', 'image', 'brand', 'locations', 'tags', 'allowOutOfStock']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image', 'product']

class GroupAdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupAds
        fields = ['email', 'name', 'products']

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'password', 'email', 'shop', 'sellerRating', 'sellerRatingCount', 'sellerReviews', 'wishlist', 'image',
                  'verified', 'savedTags']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['description', 'isVisible', 'products', 'image', 'featuredProducts']

class ShopHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopHistory
        fields = ['shop', 'product', 'action', 'dateTime', 'quantity', 'buyer',
                  'profit', 'locations', 'productId', 'productName', 'buyerName'
                  ]

class PurchaseHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseHistory
        fields = ['buyerEmail', 'purchaseTime', 'name', 'sellerEmail', 'description', 'totalPriceDollars', 'totalPriceCents', 'image']

class ViewHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewHistory
        fields = ['email', 'productID', 'lastViewed']

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['description', 'products']

class ChatMessagesSerializer(serializers.Serializer):
    class Meta:
        model = ChatMessages
        fields = ['sender', 'receiver', 'productID', 'message', 'timestamp']
