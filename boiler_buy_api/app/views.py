from rest_framework import viewsets

from .models import Listing
from .serializers import ListingSerializer

from django.http import HttpResponse

import json

#create your views here
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

def trentsTest(request):
    # TODO: get the actual stuff from the database here
    response = [{
        'id': 0,
        'priceDollars': 0,
        'priceCents': 0,
        'shippingDollars': 0,
        'shippingCents': 0,
        'name': "Test Object",
        'description': "This is my test",
        'reported': False,
        'isPending': False,
        'isSold': False,
        'canShip': True,
        'canMeet': True,
    }]
    return HttpResponse(json.dumps(response), content_type="application/json")