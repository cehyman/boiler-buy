"""boiler-buy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

from app import views

schema_view = get_schema_view(
   openapi.Info(
      title="Boiler Buy API",
      default_version='v1',
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

router = routers.DefaultRouter()
router.register(r'listings', views.ListingViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'accounts', views.AccountViewSet)
router.register(r'shops', views.ShopViewSet)
router.register(r'shopHistory', views.ShopHistoryViewSet)
router.register(r'purchaseHistory', views.PurchaseHistoryViewSet)
router.register(r'viewHistory', views.ViewHistoryViewSet)
router.register(r'wishlist', views.WishlistViewSet)
router.register(r'retrieveUsername', views.RetrieveUsernameViewSet)
router.register(r'chatMessages', views.ChatMessagesViewSet)

urlpatterns = [
    re_path(r'^$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)