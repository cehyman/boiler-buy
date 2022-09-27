from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>/', views.details, name='details'),
    path('create', views.create_listing, name='create_listing'),
    path('add', views.add_listing, name='add_listing'),
]