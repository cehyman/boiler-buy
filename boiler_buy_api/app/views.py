from itertools import product
from math import prod
from rest_framework import viewsets

from .models import *
from .serializers import *

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.template.loader import render_to_string
from config.settings import DEBUG

import json

#create your views here
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class RetrieveUsernameViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    lookup_field = "email"
    lookup_value_regex = "[^/]+"

    def create(self, request):
        print(request.data.get('username'))
        print(request.data.get('email'))
        account = [request.data.get('username'), request.data.get('email')]
        print(account)
        RetrieveUsernameViewSet._sendUsernameEmail(account)
        return JsonResponse({'observe': 'response'})

    @staticmethod
    def _sendUsernameEmail(account):
        send_mail(
            'Here is your username!',
            f"""
            {account[0]}
            Make sure to write down your username
            so you do not forget!
            
            """,
            "no-reply@boilerbuy.com",
            [account[1]],
            fail_silently=False
        )

class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    lookup_field = "email"
    lookup_value_regex = "[^/]+"

    def create(self, request):
        print('THIS IS THE REQUEST: ', request)
        print('REQUEST BODY: ', request.data)
        print('REQUEST ENDS HERE')
        if (request.data.get('username') == 'placeholder' or request.data.get('username') == 'Username'):
            return JsonResponse({'error': 'Username \'placeholder\' or \'Username\' cannot be used'}, status=400)

        newShop = Shop.objects.create(description=request.data.get('username'))
        newWishlist = Wishlist.objects.create(description=request.data.get('username'))
        account = Account.objects.create(username=request.data.get('username'), password=request.data.get('password'), email=request.data.get('email'),
        shop=newShop, wishlist=newWishlist)
        
        AccountViewSet._sendVerificationEmail(account)

        print('newShop: ', newShop.id)
        print('newWishlist: ', newWishlist.id)
        print('username: ', account)
        return JsonResponse({'observe': 'response'})

    @staticmethod
    def _sendVerificationEmail(account):
        params = {'link': 
                    f'localhost:4200/verify/{account.email}' if DEBUG else
                    f'boiler-buy.azurewebsites.net/verify/{account.email}',
                  'username': account.username,
                  'email': account.email
                 }
        plainMessage = render_to_string('verify_link.txt', params)
        htmlMessage = render_to_string('verify_link.html', params)
        
        send_mail(
            'Please Verify Your Account',
            plainMessage,
            'no-reply@boilerbuy.com',
            [account.email],
            fail_silently=False,
            html_message=htmlMessage
        )
    
    @action(detail=True, methods=['patch'])
    def sendVerificationEmail(self, request, email):
        account = Account.objects.get(email=email)
        AccountViewSet._sendVerificationEmail(account)
        return JsonResponse({"success": True })
    
    @action(detail=True, methods=['patch'])
    def verify(self, request, email):
        print(f"email = {email}")
        account = Account.objects.get(email=email)
        account.verified = True
        account.save()
        
        return JsonResponse({"success": True })
    
    @action(detail=True, methods=['get'])
    def verified(self, request, email):
        account = Account.objects.get(email=email)
        return JsonResponse({'verified': account.verified})
        
    
    @action(detail=True, methods=['get'])
    def getFromUsername(self, request, pk):
        print(f"pk = {pk}")
        
        account = Account.objects.get(username=pk)
        
        return JsonResponse(account, safe=False)
        
    # Test to retrieve image /accounts/<email>/retrieveImages
    @action(detail=True, methods=['get'])
    def retrieveImages(self, request, email):
        account = Account.objects.get(email=email)
        account_image = account.image

        print(account_image)
        print(account_image.url)
        
        # nameList = list([])
        # nameList.append(image.image.url)
        
        # print(f"{nameList}")
        return JsonResponse(account_image.url, safe=False)

    # Test to add images to /accounts/<email>/addImages
    @action(detail=True, methods=['patch'])
    def addImages(self, request, email):
        print(request.data)
        account = Account.objects.get(email=email)
        
        # Add all the images and connect them to this product
        #formImages = request.data.getlist('images')
        # account.image = image

        print(request.data.get('image'))
  
        serializer = AccountSerializer(account, data=request.data, partial=True, context={'request': request}) # set partial=True to update a data partially
        # if serializer.is_valid():
        #     serializer.save()
            
        # print(serializer.data)
        # return JsonResponse({'observe': 'response'})

        if serializer.is_valid():
            try:
                serializer.save()
                print(serializer.data)
            except ValueError:
                return JsonResponse({"detail": "Serializer is not valid"}, status=400)
            return JsonResponse({"detail": "Updated."})
        else:
            return JsonResponse(serializer.errors)
    
    # Test to send email /accounts/<email>/sendResetPassword
    @action(detail=True, methods=['get'])
    def sendResetPassword(self, request, email):
        params = {'link': 
                f'http://localhost:4200/special-reset-password/{email}' if DEBUG else
                f'http://boiler-buy.azurewebsites.net/special-reset-password/{email}'
            }
        plainMessage = render_to_string('reset_password.txt', params)
        htmlMessage = render_to_string('reset_password.html', params)
    
        send_mail(
            'Please Verify Your Account',
            plainMessage,
            'no-reply@boilerbuy.com',
            [email],
            fail_silently=False,
            html_message=htmlMessage
        )
        return JsonResponse({"success": True })

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
            brand = request.data.get('brand'),
            locations = request.data.getlist('locations'),
            tags = request.data.getlist('tags'),
            allowOutOfStock = bool(request.data.get('allowOutOfStock'))
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
        
        # Update the shop history
        ShopHistoryViewSet.newCreate(shop, product)
        
        # generic non-error response
        return JsonResponse({'observe': 'response'})

    def partial_update(self, request, *args, **kwargs):
        result =  super(ProductViewSet, self).partial_update(request, *args, **kwargs)
        
        username = request.data.get('username')
        print(f"username = ${username}")
        
        product = Product.objects.get(id=kwargs['pk'])
        user = Account.objects.get(username=request.data.get('username'))
        shop = Shop.objects.get(id=user.shop_id)
        
        # Add the creation of this product to the user's history
        # ShopHistory.newEdit(shop, product)
        
        return result
    
    def delete(self, request, *args, **kwargs):
        result = super(ProductViewSet, self).delete(request, *args, **kwargs)
        
        username = request.data.get('username')
        print(f"username = ${username}")
        
        product = Product.objects.get(id=kwargs['pk'])
        user = Account.objects.get(username=request.data.get('username'))
        shop = Shop.objects.get(id=user.shop_id)
        
        ShopHistoryViewSet.newDelete(shop, product)
        
        return result

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
        
        # Filter by tags. If 2+ tags are selected, then the two sets of objects
        # with those tags are joined together
        if (request.GET.get('tags') != None and request.GET.get('tags') != ""):  
            requestTags = request.GET.get('tags').split(',')
            
            # Run through the list of tags and keep a list of querysets that
            # correspond with each tag
            selectedSets = []
            for requestTag in requestTags:
                selectedSets.append(data.filter(tags__contains=[requestTag]))
            
            # Combine all of the sets together to form a single query set.
            combinedSet = selectedSets[0] if len(selectedSets) > 0 else Product.objects.none()
            for i in range(1, len(selectedSets)):
                combinedSet = combinedSet.union(selectedSets[i])
            
            # Our new query set should be trimmed of all the items that don't contain
            # any of the tags queried
            data = combinedSet
            
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
        
        print(f"Before for loop: data={data}")
        for prod in data:
            # print(prod.get("id"))
            shop = Shop.objects.filter(products=prod.get("id")).values()
            if (shop.count() > 0):
                shopID = shop.get().get("id")
                # print('product id:', prod.get('id'))
                # print('shopID:', shopID)
                try: 
                    account = Account.objects.filter(shop=shopID).values().get()
                except:
                    continue
                
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
        
        print(f"Returning response")
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
    
    @action(detail=True, methods=['get'])
    def history(self, request, pk):
        shop = Shop.objects.get(pk=pk)
        
        history = ShopHistory.objects.filter(shop=shop)
        
        response = []
        for item in history:
            response.append(self.historyItemToDict(item))
        
        return JsonResponse(response, safe=False)
    
    def historyItemToDict(self, item):
        return {
            "shopId": item.shop.id,
            "productId": item.productId,
            "productName": item.productName,
            "action": item.action,
            "dateTime": item.dateTime,
            "profit": item.profit if item.product else None,
            "locations": item.locations,
            "buyerName": item.buyerName,
        }
    
class ShopHistoryViewSet(viewsets.ModelViewSet):
    queryset = ShopHistory.objects.all()
    serializer_class = ShopHistorySerializer
    
    @staticmethod
    def newCreate(shop, product): # Add the creation of this product to the user's history
        print(f"productname = {product.name}")
        
        ShopHistory.objects.create(
            shop=shop,
            product=product,
            action="create",
            quantity=product.stockCount,
            productId = product.id,
            productName = product.name,
        )
        
    @staticmethod
    def newDelete(shop, product):
        ShopHistory.objects.create(
            shop=shop,
            product=product,
            action="delete",
            productId = product.id,
            productName = product.name,
        )
    
    @staticmethod
    def newSold(shop, product, buyer, profit, locations):
        ShopHistory.objects.create(
            shop=shop,
            product=product,
            action="sold",
            locations = locations,
            productId = product.id,
            productName = product.name,
            buyerName = buyer.username,
            profit= float(profit[0]) + float(profit[1]) / 100
        )
        
    @staticmethod
    def newEdit(shop, product):
        ShopHistory.objects.create(
            shop=shop,
            product=product,
            action="edit",
            quantity=product.stockCount,
            productId = product.id,
            productName = product.name,
        )
        
        

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

        #TODO: either change the db to include a quantity, or adjust the front end to account for this
        for i in range(request.data.get('quantity')):
            newPurchaseHistory = PurchaseHistory.objects.create(
                buyerEmail = buyer,
                name = product.name,
                sellerEmail = seller,
                description = product.description,
                totalPriceDollars = totalPriceDollars,
                totalPriceCents = totalPriceCents,
                image = product.image,
            )
        
        # Add the sell to the sellers history
        ShopHistoryViewSet.newSold(shop, product, buyer, (totalPriceDollars, totalPriceCents), request.data.get('locations'))

        return JsonResponse({'message': 'Product was purchased'}, status=201)

class ViewHistoryViewSet(viewsets.ModelViewSet):
    queryset = ViewHistory.objects.all()
    serializer_class = ViewHistorySerializer

    def create(self, request):
        # see if the user already has a view for this productID

        product = Product.objects.get(pk=request.data.get('productID'))

        # get buyer
        buyer = Account.objects.get(username=request.data.get('username'))

        p, created = ViewHistory.objects.get_or_create(
            email = buyer,
            productID = product,
        )

        print("p: ", p)
        print("Created new view: ", created)
        p.save()

        return JsonResponse({'message': 'Product was viewed'}, status=201)

    def list(self, request, *args, **kwargs):
        toSend = super().list(request, *args, **kwargs)
        print(toSend.data)
        dic = json.loads(json.dumps(toSend.data))

        toSend.data = []

        for prod in dic:
            print(prod.get('productID'))

            # get product from the products db
            matchingProduct = Product.objects.get(id=prod.get('productID'))

            #update toSend.data
            toSend.data.append({
                "email": prod.get('email'),
                "lastViewed": prod.get('lastViewed'),
                "product": {
                    "id": prod.get('productID'),
                    "name": matchingProduct.name,
                }
            })
            

        # toSend.data = [{"email": "tTest@purdue.edu", "lastViewed": "die", "product": {"id":"testtestYEET"}}]
        
        return toSend

class GroupAdsViewSet(viewsets.ModelViewSet):
    queryset = GroupAds.objects.all()
    serializer_class = GroupAdsSerializer

    def list(self, request):
        data = GroupAds.objects.values()
        return JsonResponse(list(data), safe=False)


class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    #add to wishlist products
    def create(self, request): 
        # user isn't logged in, hopefully nobody wants this username
        if (request.data.get('username') == 'placeholder' or request.data.get('username') == 'Username'):
            return JsonResponse({'error': 'User is not logged in'}, status=401)
        
        print('data:', request.data)


        # product_id = request.data.get('productID')
        if (request.data.get('request') == 'add'):
            product = Product.objects.get(id=request.data.get('productID'))

            user = Account.objects.get(username=request.data.get('username'))
            wishlist = Wishlist.objects.get(id=user.wishlist_id)
            print('wishlist id: ', wishlist)

            wishlist.products.add(product.id)

            return JsonResponse({'observe': 'response'})
        else:
            print("here")
            product = Product.objects.get(id=request.data.get('productID'))

            user = Account.objects.get(username=request.data.get('username'))
            wishlist = Wishlist.objects.get(id=user.wishlist_id)
            print('wishlist id: ', wishlist)

            wishlist.products.remove(product)

        return JsonResponse({'observe': 'response'})


class ChatMessagesViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessages
    queryset = ChatMessages.objects.all()

    def create(self, request):
        senderObj = Account.objects.get(email=request.data.get('sender'))
        receiverObj = Account.objects.get(email=request.data.get('receiver'))
        productObj = Product.objects.get(id=request.data.get('productID'))

        message = ChatMessages.objects.create(
            sender=senderObj,
            receiver=receiverObj,
            productID=productObj,
            message=request.data.get('message'),
            senderImage = senderObj.image,
            receiverImage = receiverObj.image,
        )
        return JsonResponse({'success': True})

    def list(self, request):
        fun = request.GET.get('function')
        if (fun == 'getMessageList'):
            return self.getMessageList(request)
        elif (fun == 'getMessages'):
            response = self.getMessages(request)
            return response

    def getMessages(self, request):
        print(request.GET)
        currentUser = Account.objects.get(email=request.GET.get('currEmail'))
        receiver = Account.objects.get(email=request.GET.get('otherEmail'))
        product = Product.objects.get(id=request.GET.get('productID'))
        data = ChatMessages.objects.filter(sender=currentUser, receiver=receiver, productID=product).order_by('timestamp').values() | \
            ChatMessages.objects.filter(sender=receiver, receiver=currentUser, productID=product).order_by('timestamp').values()
        return JsonResponse(list(data), safe=False)

    def getMessageList(self, request):
        currentUser = Account.objects.get(email=request.GET.get('currEmail'))
        data = ChatMessages.objects.filter(sender=currentUser).distinct('sender', 'receiver', 'productID').values() | \
            ChatMessages.objects.filter(receiver=currentUser).distinct('sender', 'receiver', 'productID').values()
        
        return JsonResponse(list(data), safe=False)

class SellerProductViewSet(viewsets.ViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def list(self, request):
        prodID = request.GET.get('productID')
        sellerShop = Shop.objects.filter(products=prodID).values().first()
        seller = Account.objects.get(shop=sellerShop.get("id"))
        return JsonResponse({'sellerEmail': seller.email})

class ChatGroupViewSet(viewsets.ViewSet):
    serializer_class = ChatGroupSerializer
    queryset = ChatGroup.objects.all()

    def list(self, request):
        print('request:', request.GET)
        if (request.GET.get('function') == "update_tracking"):
            print('update tracking info')
            row = ChatGroup.objects.get(id=request.GET.get('id'))
            row.trackingLink = request.GET.get('trackingLink')
            row.trackingNumber = request.GET.get('trackingNumber')
            row.save()
            print('row', row)
            return JsonResponse({"try":"todie"})
        elif (request.GET.get('function') == "update_shipping_address"):
            print("Upadate shipping address")
            row = ChatGroup.objects.get(id=request.GET.get('id'))
            row.shippingAddress = request.GET.get('shippingAddress')
            row.save()
            print('row', row)
            return JsonResponse({"try":"todie"})
        elif (request.GET.get('function') == "getCG"):
            buyer = Account.objects.get(email=request.GET.get('buyer'))
            seller = Account.objects.get(email=request.GET.get('seller'))
            product = Product.objects.get(id=request.GET.get('productID'))
            data = ChatGroup.objects.values().get(buyer=buyer, seller=seller, product=product)
            return JsonResponse(data, safe=False)
        else:
            print("else")
            buyer = Account.objects.get(email=request.GET.get('buyer'))
            seller = Account.objects.get(email=request.GET.get('seller'))
            product = Product.objects.get(id=request.GET.get('productID'))
            data = ChatGroup.objects.values().get(buyer=buyer, seller=seller, product=product)
            print('data:', data)
            return JsonResponse(data.get('id'), safe=False)

    def create(self, request):
        buyer = Account.objects.get(email=request.data.get('buyer'))
        seller = Account.objects.get(email=request.data.get('seller'))
        productObj = Product.objects.get(id=request.data.get('productID'))

        message = ChatGroup.objects.create(
            buyer=buyer,
            seller=seller,
            product=productObj,
        )
        return JsonResponse({'success': True})

    