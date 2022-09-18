from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse

from listing.models import Listing

# Create your views here.

def index(request):
    print('Request for index page received')

    # listings = Listing.objects.annotate(name='listing_name').annotate(price='price')
    return render(request, 'listing/welcome.html')


def details(request, id):
    print('Request for listing details page received')

    listing = get_object_or_404(Listing, pk=id)

    return render(request, 'listing/details.html', {'listing': listing})


def create_listing(request):
    print('Request for add listing page received')

    return render(request, 'listing/create_listing.html')


@csrf_exempt
def add_listing(request):
    try:
        name = request.POST['listing_name']
        price = request.POST['price']
        description = request.POST['description']
    except (KeyError):
        # Redisplay the question voting form.
        return render(request, 'listing/add_listing.html', {
            'error_message': "You must include a listing name, price, and description",
        })
    else:
        listing = Listing()
        listing.name = name
        listing.price = price
        listing.description = description
        listing.save(listing)
                
        return HttpResponseRedirect(reverse('details', args=(listing.id,)))


    