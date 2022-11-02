from django.contrib import admin
from .models import Listing, Product, Account, Shop, ShopHistory, Wishlist, ProductImage

# Register your models here.
admin.site.register(Listing)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Account)
admin.site.register(Shop)
admin.site.register(Wishlist)
admin.site.register(ShopHistory)
