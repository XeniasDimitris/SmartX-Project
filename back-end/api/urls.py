from django.contrib import admin
from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('weather/humidity/', views.WeatherHumidity.as_view()),
    path('weather/temperature/', views.WeatherTemperature.as_view()),
    path('weather/pressure/', views.WeatherPressure.as_view()),
    path('weather/wind_speed/', views.WeatherWindSpeed.as_view()),
    path('weather/wind_direction/', views.WeatherWindDirection.as_view()),
    path('weather/dew/', views.WeatherDew.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)