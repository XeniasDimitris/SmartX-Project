from rest_framework import serializers


class WeatherSerializer(serializers.Serializer):
    columns = serializers.IntegerField()
    datetime = serializers.DateTimeField()

