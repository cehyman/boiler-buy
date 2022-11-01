from itertools import product
from rest_framework import viewsets

from .models import *
from .serializers import *

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

    def create(self, request):
        if (request.data.get('username') == 'placeholder' or request.data.get('username') == 'Username'):
            return JsonResponse({'error': 'Username \'placeholder\' or \'Username\' cannot be used'}, status=400)

        newShop = Shop.objects.create(description=request.data.get('username'))
        account = Account.objects.create(username=request.data.get('username'), password=request.data.get('password'), email=request.data.get('email'),
        shop=newShop)

        print('newShop: ', newShop.id)
        print('username: ', account)
        return JsonResponse({'observe': 'response'})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # override the automatic creation of the object in the database
    def create(self, request):
        # user isn't logged in, hopefully nobody wants this username
        if (request.data.get('username') == 'placeholder' or request.data.get('username') == 'Username'):
            return JsonResponse({'error': 'User is not logged in'}, status=401)
        

        print('data:', request.data)
        # add the product to the database (and get the product's id)
        product = Product.objects.create(
            productType = request.data.get('productType'),
            priceDollars = request.data.get('priceDollars'),
            priceCents = request.data.get('priceCents'),
            shippingDollars = request.data.get('shippingDollars'),
            shippingCents = request.data.get('shippingCents'),
            stockCount = request.data.get('stockCount'),
            name = request.data.get('name'),
            description = request.data.get('description'),
            canShip = bool(request.data.get('canShip')),
            canMeet = bool(request.data.get('canMeet')),
            image = request.data.get('image'),
            brand = request.data.get('brand')
        )
        print('product id: ', product.id)

        # get user object of the user adding this product
        user = Account.objects.get(username=request.data.get('username'))

        # get user's shop
        shop = Shop.objects.get(id=user.shop_id)

        # connect the product to the shop by adding it to the shops list of products
        shop.products.add(product.id)
        
        # generic non-error response
        return JsonResponse({'observe': 'response'})


    # override default list (because we want to filter before we send the response)
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
        if (request.GET.get('productType') != None and request.GET.get('productType') != ""):
            print(request.GET.get('productType'))
            print("here3")
            if (request.GET.get('productType') != ""):
                print("here3.5")
                type = request.GET.get('productType')
                print(type)
                typeSplit = type.split(",")
                data = data.filter(productType__in=typeSplit).values()
            # print(request.GET.get('productType'))
        if (request.GET.get('brand') != None and request.GET.get('brand') != ""):
            print(request.GET.get('brand'))
            print("here3.6")
            if (request.GET.get('brand') != ""):
                print("here3.7")
                type = request.GET.get('brand')
                print(type)
                typeSplit = type.split(",")
                data = data.filter(brand__in=typeSplit).values()
        if (request.GET.get('minPrice') != None):
            print("here4")
            minPrice = request.GET.get('minPrice')
            data = data.filter(priceDollars__gte=minPrice).values()
        if (request.GET.get('maxPrice') != None):
            print("here5")
            maxPrice = request.GET.get('maxPrice')
            data = data.filter(priceDollars__lte=maxPrice).values()
        for prod in data:
            print(prod.get("id"))
            shop = Shop.objects.filter(products=prod.get("id")).values()
            if (shop.count() > 0):
                shopID = shop.get().get("id")
                # print('product id:', prod.get('id'))
                # print('shopID:', shopID)
                account = Account.objects.filter(shop=shopID).values().get()
                prod['sellerRating'] = account.get("sellerRating")
                prod['sellerRatingCount'] = account.get("sellerRatingCount")
            else:
                # products that don't have a shop yet
                prod['sellerRating'] = 0
                prod['sellerRatingCount'] = 0
            # print("pogpog")
            # if (prod.get("id") == 100):
            #     shop = Shop.objects.filter(products=prod.get("id")).values()
            #     if (shop.count() > 0):
            #         shopID = shop.get().get("id")
            #         print('product id:', prod.get('id'))
            #         print('shopID:', shopID)
            #         account = Account.objects.filter(shop=shopID).values().get()
            #         prod['sellerRating'] = account.get("sellerRating")
            #         prod['sellerRatingCount'] = account.get("sellerRatingCount")
            #     else:
            #         # products that don't have a shop yet
            #         prod['sellerRating'] = 0
            #         prod['sellerRatingCount'] = 0
        # print(data)
        # if (request.GET.get('minSellerRating') != None):
        #     minSellerRating = request.GET.get('minSellerRating')
        #     print(minSellerRating)
        #     data = data.filter(sellerRating__gte=minSellerRating).values()
        # if (request.GET.get('maxSellerRating') != None):
        #     maxSellerRating = request.GET.get('maxSellerRating')
        #     print(maxSellerRating)
        #     data = data.filter(sellerRating__lte=maxSellerRating).values()
        return JsonResponse(list(data), safe=False)
    def retrieve(self, request, pk=None):
        print(request)
        req = str(request)
        reqSplit = req.split("/")
        print(reqSplit)
        data = Product.objects.values()
        for prod in data:
            print(type(prod.get("id")))
            print(type(reqSplit[len(reqSplit)-2]))
            if (prod.get("id") == int(reqSplit[len(reqSplit)-2])):
                shop = Shop.objects.filter(products=prod.get("id")).values()
                if (shop.count() > 0):
                    shopID = shop.get().get("id")
                    # print('product id:', prod.get('id'))
                    # print('shopID:', shopID)
                    account = Account.objects.filter(shop=shopID).values().get()
                    # print(prod)
                    # print(type(account))
                    # print(account)
                    prod.update(account)
                    return JsonResponse(prod, safe=False)
        


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class PurchaseHistoryViewSet(viewsets.ModelViewSet):
    queryset = PurchaseHistory.objects.all()
    serializer_class = PurchaseHistorySerializer