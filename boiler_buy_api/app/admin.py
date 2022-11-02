from django.contrib import admin
from .models import Listing, Product, Account, Shop, Wishlist

# Register your models here.
admin.site.register(Listing)
admin.site.register(Product)
admin.site.register(Account)
admin.site.register(Shop)
admin.site.register(Wishlist)
