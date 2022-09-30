from rest_framework import serializers

from .models import Listing, Register


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = ['username', 'password', 'email']