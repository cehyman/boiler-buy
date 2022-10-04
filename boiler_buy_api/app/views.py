from rest_framework import viewsets

from .models import Listing, Product
from .serializers import ListingSerializer, ProductSerializer

from django.http import HttpResponse, JsonResponse
from django.core import serializers

import json

#create your views here
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

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
        
        return JsonResponse(list(data), safe=False)