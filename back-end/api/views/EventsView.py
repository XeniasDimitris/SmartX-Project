from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from ..DataController.EventsController import get_events

data_dir = settings.DATA_DIR+'Events'

class EventsView(APIView):

    def get(self, request, format=None):
        # Get all events records

        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        res = get_events(data_dir, start, end)
        return Response(res, status=status.HTTP_200_OK)
