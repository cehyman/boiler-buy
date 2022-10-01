from rest_framework import serializers

from .models import Listing, Account


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('username', 'password', 'email')
    
    def create(self, data):
        account = Account.objects.createAccount(data)
        return account