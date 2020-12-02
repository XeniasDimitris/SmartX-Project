from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gc
from django.http.response import HttpResponse

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/Parkings/'


class ParkingInfoView(APIView):

    def get(self, request, format=None):
        df = pd.read_csv(f'{data_dir}aarhus_parking_address.csv', ).fillna(0).astype({"housenumber": int})
        res = df.to_dict('records')
        del df
        gc.collect()
        return Response(res, status=status.HTTP_200_OK)


class ParkingRecordsView(APIView):

    def get(self, request, format=None):
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        df = pd.read_csv(f'{data_dir}aarhus_parking.csv').rename(columns={'updatetime': 'datetime'}).drop(columns=['_id', 'streamtime'])
        df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)

        # do the default left join
        df = df.set_index('datetime_pd')
        # do the query
        query = df.loc[start:end].sort_index()
        res = query.to_dict('records')
        # clear memory
        del df,  query
        gc.collect()
        return Response(res, status=status.HTTP_200_OK)

