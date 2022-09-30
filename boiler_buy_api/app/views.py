from rest_framework import viewsets

from .models import Listing, Register
from .serializers import ListingSerializer, RegisterSerializer

from django.http import HttpResponse

import json

#create your views here
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = Register.objects.all()
    serializer_class = RegisterSerializer