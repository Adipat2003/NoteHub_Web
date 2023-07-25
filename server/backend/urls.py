from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('api/get-users/', views.getUsers, name='get-users'),
    path('api/create-user/', views.createUser, name='create-user'),
]