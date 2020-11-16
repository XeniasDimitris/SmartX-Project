
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..utils import get_weather_data

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus'


class WeatherHumidity(APIView):

    def get(self, request, format=None):
        res = get_weather_data(f'{data_dir}/Weather/hum.txt', int, request)
        return Response(res, status=status.HTTP_200_OK)


class WeatherTemperature(APIView):

    def get(self, request, format=None):
        res = get_weather_data(f'{data_dir}/Weather/tempm.txt', float, request)
        return Response(res, status=status.HTTP_200_OK)


class WeatherPressure(APIView):

    def get(self, request, format=None):
        res = get_weather_data(f'{data_dir}/Weather/pressurem.txt', int, request)
        return Response(res, status=status.HTTP_200_OK)


class WeatherWindSpeed(APIView):

    def get(self, request, format=None):
        res = get_weather_data(f'{data_dir}/Weather/wspdm.txt', float, request)
        return Response(res, status=status.HTTP_200_OK)


class WeatherWindDirection(APIView):

    def get(self, request, format=None):
        res = get_weather_data(f'{data_dir}/Weather/wdird.txt', int, request)
        return Response(res, status=status.HTTP_200_OK)


class WeatherDew(APIView):

    def get(self, request, format=None):
        res = get_weather_data(f'{data_dir}/Weather/dewptm.txt', float, request)
        return Response(res, status=status.HTTP_200_OK)
