from django.contrib import admin
from .models import Listing, Product, Account

# Register your models here.
admin.site.register(Listing)
admin.site.register(Product)
admin.site.register(Account)