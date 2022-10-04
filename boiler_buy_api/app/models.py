from django.db import models

# Create your models here.
class Listing(models.Model):
    name = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    stock = models.IntegerField(default=1)
    
    def __str__(self):
        return self.name

class Account(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    def __str__(self):
        return str(self.username)