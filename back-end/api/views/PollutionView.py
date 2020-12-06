from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gc
from django.http.response import HttpResponse

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/Pollution/pollution'


class PollutionSensorsView(APIView):
    def get(self, request, format=None):
        # Get Pollution Sensors Info

        df = pd.read_csv('/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/Traffic/trafficMetaDataNoNAN.csv')
        res = df[['REPORT_ID', 'POINT_1_LNG']].to_dict('records')
        arr = []
        for item in res:
            with open(f'{data_dir}/pollutionData{item["REPORT_ID"]}.csv') as f:
                f.readline()
                lng = f.readline().split(',')[5]
                lat = f.readline().split(',')[6]
                arr.append({'longitude': float(lng), 'latitude': float(lat), 'report_id': item["REPORT_ID"]})
        return Response(arr, status=status.HTTP_200_OK)


class PollutionRecordsView(APIView):

    def get(self, request, format=None):
        # Get Pollution Sensor's records (with particular id) in a date window

        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        report_id = request.query_params['id'] if 'id' in request.query_params else None
        print(report_id)
        if not report_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        df = pd.read_csv(f'{data_dir}/pollutionData{report_id}.csv')
        df['datetime_pd'] = pd.to_datetime(df['timestamp'], infer_datetime_format=True)
        df.rename(columns={'timestamp': 'datetime'}, inplace=True)
        df.set_index('datetime_pd', inplace=True)
        query = df.loc[start:end].sort_index()
        res = query.to_dict('records')

        del df, query
        gc.collect()
        return Response(res, status=status.HTTP_200_OK)