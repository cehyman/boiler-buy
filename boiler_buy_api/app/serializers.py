from rest_framework import serializers

from .models import Listing, Product


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['priceDollars', 'priceCents', 'shippingDollars', 'shippingCents', 'name', 'description', 'reported',
            'isPending', 'isSold', 'canShip', 'canMeet']