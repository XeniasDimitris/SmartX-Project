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
        columns = [1, 4, 5, 6, 7]
        df1 = pd.read_csv(f'{data_dir}DOKK1_Sensors_meta.csv', usecols=columns)
        df2 = pd.read_csv(f'{data_dir}DOKK1_Sensors.csv').rename(columns={'date': 'datetime'})
        df2['datetime_pd'] = pd.to_datetime(df2['datetime'], infer_datetime_format=True)

        df = df2.set_index('sensor').join(df1.set_index('id'), how='inner').set_index('datetime_pd').drop(columns='_id')
        query = df.loc[start:end]
        res = query.to_dict('records')
        print(len(res))
        del df1, df2, df, query
        gc.collect()
        return Response(res, status=status.HTTP_200_OK)
