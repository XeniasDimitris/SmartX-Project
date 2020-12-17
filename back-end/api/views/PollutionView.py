from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from ..DataController.PollutionController import get_sensors_info,get_sensor_records

data_dir = settings.DATA_DIR+'Pollution/pollution'


class PollutionSensorsView(APIView):
    def get(self, request, format=None):
        # Get Pollution Sensors Info

        res = get_sensors_info(data_dir)
        return Response(res, status=status.HTTP_200_OK)


class PollutionRecordsView(APIView):

    def get(self, request, format=None):
        # Get Pollution Sensor's records (with particular id) in a date window

        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        report_id = request.query_params['id'] if 'id' in request.query_params else None

        if not report_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        res = get_sensor_records(data_dir, start, end, report_id)
        return Response(res, status=status.HTTP_200_OK)