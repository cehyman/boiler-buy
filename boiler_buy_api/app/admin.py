from django.contrib import admin
from .models import Listing, Account

# Register your models here.
admin.site.register(Listing)
admin.site.register(Account)