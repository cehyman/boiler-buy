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
            name = request.GET.get('name')
            data = Product.objects.filter(name__icontains=name).values()
        else:
            # get all products
            data = Product.objects.all().values()
        if (request.GET.__contains__('minPrice') or request.GET.__contains__('maxPrice')):
            minPrice = request.GET.get('minPrice')
            maxPrice = request.GET.get('maxPrice')
            if (minPrice == None and maxPrice == None):
                data = Product.objects.filter(name__icontains=name).values()
            elif (minPrice == None and maxPrice != None):
                data = Product.objects.filter(priceDollars__lte=maxPrice).values()
            elif (minPrice != None and maxPrice == None):
                data = Product.objects.filter(priceDollars__gte=minPrice, priceDollars__lte=maxPrice).values()
        return JsonResponse(list(data), safe=False)