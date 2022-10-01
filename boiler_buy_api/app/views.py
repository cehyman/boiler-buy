from rest_framework import viewsets

from .models import Listing
from .serializers import ListingSerializer

#create your views here
#class ListingViewSet(viewsets.ReadOnlyModelViewSet):
#    queryset = Listing.objects.all()
#    serializer_class = ListingSerializer

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer