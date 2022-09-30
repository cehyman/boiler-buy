from rest_framework import viewsets

from .models import Listing, Product
from .serializers import ListingSerializer, ProductSerializer

from django.http import HttpResponse

import json

#create your views here
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer