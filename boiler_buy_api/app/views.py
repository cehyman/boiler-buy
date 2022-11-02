from itertools import product
from math import prod
from rest_framework import viewsets

from .models import *
from .serializers import *

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.decorators import action

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
        newWishlist = Wishlist.objects.create(description=request.data.get('username'))
        account = Account.objects.create(username=request.data.get('username'), password=request.data.get('password'), email=request.data.get('email'),
        shop=newShop, wishlist=newWishlist)

        print('newShop: ', newShop.id)
        print('newWishlist: ', newWishlist.id)
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
            brand = request.data.get('brand')
        )
        print('creating product with product id', product.id)

        # get user object of the user adding this product
        user = Account.objects.get(username=request.data.get('username'))

        # get user's shop
        shop = Shop.objects.get(id=user.shop_id)

        # connect the product to the shop by adding it to the shops list of products
        shop.products.add(product.id)
        
        # Add all the images and connect them to this product
        formImages = request.data.getlist('images')
        for image in formImages:
            ProductImage.objects.create(image=image, product=product)
        
        # generic non-error response
        return JsonResponse({'observe': 'response'})

    # Allows the images for this product to be retrieved. This is called with a path of the form:
    # /products/<id>/retrieveImages
    # This is a seperate function so that the entirety of the retrieve function doesn't need
    # written
    @action(detail=True, methods=['get'])
    def retrieveImages(self, request, pk):
        product = Product.objects.get(pk=pk)
        images = product.images.all()
        
        nameList = list([])
        
        for image in images:
            nameList.append(image.image.url)
        
        print(f"{nameList}")
        return JsonResponse(nameList, safe=False)
    
    # Allows images to be added to this product field. This is called with a path of the form:
    # /products/<id>/addImages
    # And the data of the request will be a list of files to add to this product. 
    @action(detail=True, methods=['patch'])
    def addImages(self, request, pk):
        product = Product.objects.get(pk=pk)
        
        # Add all the images and connect them to this product
        formImages = request.data.getlist('images')
        for image in formImages:
            ProductImage.objects.create(image=image, product=product)
            
        return JsonResponse({'observe': 'response'})
           
    # Allows images to be added to this product field. This is called with a path of the form:
    # /products/<id>/removeImages
    # And the data of the request will be a list of file names to remove from the database.
    @action(detail=True, methods=['patch'])
    def removeImages(self, request, pk):
        product = Product.objects.get(pk=pk)
        formImages = request.data.getlist('images')
        
        # For each of the images submitted to delete, check if the file exists
        # in the database. If id does, delete the instance.
        for imageToRemove in formImages:
            for instance in product.images.all():
                if instance.image.name == imageToRemove:
                    instance.delete()
                    break
                            
        return JsonResponse({'observe': 'response'})

            
    # override default list (because we want to filter before we send the response)
    def list(self, request):

        data = Product.objects.filter(stockCount__gt=0).values()
        minSellerFilter = False
        maxSellerFilter = False
        minSeller = 0
        maxSeller = 0
        if (request.GET.__contains__('name')):
            # search by name
            print("here")
            name = request.GET.get('name')
            data = data.filter(name__icontains=name)
        
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
        if (request.GET.get('minSellerRating') != None):
            minSellerRating = request.GET.get('minSellerRating')
            minSeller = minSellerRating
            minSellerFilter = True
            
        if (request.GET.get('maxSellerRating') != None):
            maxSellerRating = request.GET.get('maxSellerRating')
            maxSeller = maxSellerRating
            maxSellerFilter = True
        print(minSeller)
        print(minSellerFilter)
        print(maxSeller)
        print(maxSellerFilter)
        temp = []
        # print(data)
        for prod in data:
            # print(prod.get("id"))
            shop = Shop.objects.filter(products=prod.get("id")).values()
            if (shop.count() > 0):
                shopID = shop.get().get("id")
                # print('product id:', prod.get('id'))
                # print('shopID:', shopID)
                account = Account.objects.filter(shop=shopID).values().get()
                prod['sellerRating'] = account.get("sellerRating")
                prod['sellerRatingCount'] = account.get("sellerRatingCount")
                if (minSellerFilter == True and maxSellerFilter == True):
                    if (prod['sellerRating'] >= float(minSeller) and prod['sellerRating'] <= float(maxSeller)):
                        temp.append(prod)
                elif (minSellerFilter == True and maxSellerFilter == False):
                    if (prod['sellerRating'] >= float(minSeller)):
                        temp.append(prod)
                elif (minSellerFilter == False and maxSellerFilter == True):
                    if (prod['sellerRating'] <= float(maxSeller)):
                        temp.append(prod)
            else:
                # products that don't have a shop yet
                prod['sellerRating'] = 0
                prod['sellerRatingCount'] = 0
        if (minSellerFilter == True or maxSellerFilter == True):
            data = temp
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
        # print(data)
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
        

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class PurchaseHistoryViewSet(viewsets.ModelViewSet):
    queryset = PurchaseHistory.objects.all()
    serializer_class = PurchaseHistorySerializer

    def create(self, request):
        product = Product.objects.get(pk=request.data.get('productID'))

        # check if there is still product left
        if (product.stockCount < request.data.get('quantity')):
            return JsonResponse({'error': 'Purchase quantity is greater than product quantity.', 'remainingStock': product.stockCount}, status=400)
        
        # decrease the amount in stock
        product.stockCount -= request.data.get('quantity')
        product.save()

        # get buyer
        buyer = Account.objects.get(username=request.data.get('username'))

        # get seller
        shop = Shop.objects.get(products=product.id)
        shopID = shop.id
        seller = Account.objects.get(shop=shopID)

        # get total prices
        totalPriceDollars = 0
        totalPriceCents = product.priceCents + product.shippingCents
        if (totalPriceCents >= 100):
            totalPriceDollars = 1
            totalPriceCents -= 100

        totalPriceDollars += product.priceDollars + product.shippingDollars

        newPurchaseHistory = PurchaseHistory.objects.create(
            buyerEmail = buyer,
            name = product.name,
            sellerEmail = seller,
            description = product.description,
            totalPriceDollars = totalPriceDollars,
            totalPriceCents = totalPriceCents,
            image = product.image,
        )
        return JsonResponse({'message': 'Product was purchased'}, status=201)

class ViewHistoryViewSet(viewsets.ModelViewSet):
    queryset = ViewHistory.objects.all()
    serializer_class = ViewHistorySerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
