from rest_framework import viewsets

from .models import Listing, Product, Account
from .serializers import ListingSerializer, ProductSerializer, AccountSerializer

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.shortcuts import render
from rest_framework.decorators import api_view

import json



#create your views here
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    lookup_field = "email"
    lookup_value_regex = "[^/]+"

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request):
        data = Product.objects.values()
        if (request.GET.__contains__('name')):
            # search by name
            print("here")
            name = request.GET.get('name')
            data = Product.objects.filter(name__icontains=name).values()
        else:
            # get all products
            print("here2")
            data = Product.objects.all().values()
        if (request.GET.get('productType') != ""):
            print(request.GET.get('productType'))
            print("here3")
            type = request.GET.get('productType')
            print(type)
            typeSplit = type.split(",")
            data = data.filter(productType__in=typeSplit).values()
        if (request.GET.get('minPrice') != None):
            print("here4")
            minPrice = request.GET.get('minPrice')
            data = data.filter(priceDollars__gte=minPrice).values()
        if (request.GET.get('maxPrice') != None):
            print("here5")
            maxPrice = request.GET.get('maxPrice')
            data = data.filter(priceDollars__lte=maxPrice).values()
        return JsonResponse(list(data), safe=False)