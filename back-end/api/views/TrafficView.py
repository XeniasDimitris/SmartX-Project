from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from ..DataController.TrafficController import get_traffic_sensors, get_traffic_cor_sensors, get_traffic_records

data_dir = settings.DATA_DIR+'Traffic/'


class TrafficSensorsView(APIView):

    def get(self, request, format=None):
        # Get Traffic Sensors Info

        res = get_traffic_sensors(data_dir)
        return Response(res, status=status.HTTP_200_OK)

class TrafficCorrelatedSensorsView(APIView):

    def get(self, request, format=None):
        # Get All Traffic Sensor information for existed records

        res = get_traffic_cor_sensors(data_dir)
        return Response(res, status=status.HTTP_200_OK)


class TrafficRecordsView(APIView):

    def get(self, request, format=None):
        # Get records for a specific report_id in a date window
        
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        report_id = request.query_params['id'] if 'id' in request.query_params else None
        if not report_id:
            return Response({'error': 'no id is given'}, status=status.HTTP_400_BAD_REQUEST)

        res = get_traffic_records(data_dir, start, end, report_id)
        return Response(res, status=status.HTTP_200_OK)
