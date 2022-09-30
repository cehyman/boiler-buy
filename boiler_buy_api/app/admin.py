from django.contrib import admin
from .models import Listing, Product

# Register your models here.
admin.site.register(Listing)
admin.site.register(Product)