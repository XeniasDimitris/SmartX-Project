from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from ..DataController.DemographicsController import get_demographics

data_dir = settings.DATA_DIR+'Demographics'


class DemographicsView(APIView):

    def get(self, request, format=None):
        # Get demographics

        res = get_demographics(data_dir)
        return Response(res, status=status.HTTP_200_OK)