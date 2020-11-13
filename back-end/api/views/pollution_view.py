from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gc
from django.http.response import HttpResponse

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/Pollution/pollution'

class PollutionRecordsView(APIView):

    def get(self, request, format=None):
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