from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gc
from django.http.response import HttpResponse

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/DOKK1_Sensors/'


class Dokk1SensorsView(APIView):

    def get(self, request, format=None):
        columns = [1, 4, 5, 6, 7]
        df = pd.read_csv(f'{data_dir}DOKK1_Sensors_meta.csv', usecols=columns)
        res = df.to_dict('records')
        del df
        gc.collect()
        return Response(res, status=status.HTTP_200_OK)


class Dokk1RecordsView(APIView):

    def get(self, request, format=None):
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        id = request.query_params['id'] if 'id' in request.query_params else None
        if not id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        columns = [1, 4, 5, 6, 7]
        df = pd.read_csv(f'{data_dir}DOKK1_Sensors.csv').rename(columns={'date': 'datetime'})
        df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)

        query = df.loc[start:end].sort_index().loc[df['sensor'] == id]
        res = query.to_dict('records')
        print(len(res))
        del df, query
        gc.collect()
        return Response(res, status=status.HTTP_200_OK)
