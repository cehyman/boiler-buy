from rest_framework import serializers

from .models import Listing, Account


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description', 'stock']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'password', 'email']