from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from ..DataController.Dokk1Controller import get_sensors_info, get_sensor_records

data_dir = settings.DATA_DIR+'DOKK1_Sensors'


class Dokk1SensorsView(APIView):

    def get(self, request, format=None):
        # Get Dokk1's sensors info

        res = get_sensors_info(data_dir)
        return Response(res, status=status.HTTP_200_OK)


class Dokk1RecordsView(APIView):

    def get(self, request, format=None):
        # Get records for a specific id sensor in a date window

        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        id = request.query_params['id'] if 'id' in request.query_params else None
        if not id:
            return Response({'error': 'no id is given'}, status=status.HTTP_400_BAD_REQUEST)
        res = get_sensor_records(data_dir, start, end, id)
        return Response(res, status=status.HTTP_200_OK)
