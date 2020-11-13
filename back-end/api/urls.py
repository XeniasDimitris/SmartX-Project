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
    path('parkings/info/', views.ParkingInfoView.as_view()),
    path('parkings/records/', views.ParkingRecordsView.as_view()),
    path('dokk1/sensors/', views.Dokk1SensorsView.as_view()),
    path('dokk1/records/', views.Dokk1RecordsView.as_view()),
    path('traffic/sensors/', views.TrafficSensorsView.as_view()),
    path('traffic/records/', views.TrafficRecordsView.as_view()),
    path('pollution/records/', views.PollutionRecordsView.as_view()),
    path('demographics/', views.DemographicsView.as_view()),
    path('events/', views.EventsView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)