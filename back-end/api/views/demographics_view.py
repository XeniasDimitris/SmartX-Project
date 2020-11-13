from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gc
from django.http.response import HttpResponse

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/Demographics'


class DemographicsView(APIView):

    def get(self, request, format=None):
        df = pd.read_csv(f'{data_dir}/Demographics--januar-2013.csv').fillna(-1)
        res = df.to_dict('records')
        print(res)
        del df
        gc.collect()
        return Response(res, status=status.HTTP_200_OK)