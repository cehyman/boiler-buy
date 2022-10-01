from rest_framework import viewsets

from .models import Listing, Account
from .serializers import ListingSerializer, AccountSerializer
# from rest_framework.response import Response
# from rest_framework import Status
from django.shortcuts import render
from rest_framework.decorators import api_view

from django.http import HttpResponse

import json

#create your views here
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.object.all()