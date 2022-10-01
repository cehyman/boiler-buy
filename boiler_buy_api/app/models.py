from django.db import models

# Create your models here.
class Listing(models.Model):
    name = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    
    def __str__(self):
        return self.name