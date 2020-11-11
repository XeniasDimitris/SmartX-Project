from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..helpers import get_weather_data
import pandas as pd
# Create your views here.
data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus'


class WeatherHumidity(APIView):

    def get(self, request, format=None):
        print(request.query_params)
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        res = get_weather_data(f'{data_dir}/Weather/hum.txt', int, start, end)
        return Response(res, status=status.HTTP_200_OK)


class WeatherTemperature(APIView):

    def get(self, request, format=None):
        print(request.query_params)
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        res = get_weather_data(f'{data_dir}/Weather/tempm.txt', int, start, end)
        return Response(res, status=status.HTTP_200_OK)



class WeatherPressure(APIView):

    def get(self, request, format=None):
        print(request.query_params)
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        res = get_weather_data(f'{data_dir}/Weather/pressurem.txt', int, start, end)
        return Response(res, status=status.HTTP_200_OK)


class WeatherWindSpeed(APIView):

    def get(self, request, format=None):
        print(request.query_params)
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        res = get_weather_data(f'{data_dir}/Weather/wspdm.txt', int, start, end)
        return Response(res, status=status.HTTP_200_OK)


class WeatherWindDirection(APIView):

    def get(self, request, format=None):
        print(request.query_params)
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        res = get_weather_data(f'{data_dir}/Weather/wdird.txt', int, start, end)
        return Response(res, status=status.HTTP_200_OK)


class WeatherDew(APIView):

    def get(self, request, format=None):
        print(request.query_params)
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        res = get_weather_data(f'{data_dir}/Weather/dewptm.txt', int, start, end)
        return Response(res, status=status.HTTP_200_OK)
