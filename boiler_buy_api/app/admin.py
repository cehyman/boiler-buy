from django.contrib import admin
from django.apps import apps
from .models import Listing, Product, Account

# Register your models here.
admin.site.register(Listing)
admin.site.register(Product)
admin.site.register(Account)

#automate adding all models TEST
models = apps.get_models()

for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass