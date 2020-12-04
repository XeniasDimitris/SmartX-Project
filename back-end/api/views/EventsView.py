from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gc
from django.http.response import HttpResponse

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/Events'


class EventsView(APIView):

    def get(self, request, format=None):
        start = request.query_params['start'] if 'start' in request.query_params else None
        end = request.query_params['end'] if 'end' in request.query_params else None
        columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16]
        df = pd.read_csv(f"{data_dir}/aarhus_libraryEvents.csv", usecols=columns).fillna('-')

        df['start_datetime_pd'] = pd.to_datetime(df['starttime'], infer_datetime_format=True)
        df['end_datetime_pd'] = pd.to_datetime(df['endtime'], infer_datetime_format=True)

        if start is None: start = '2000-01'
        if end is None: end = '2030-12'
        res = df.loc[((df['start_datetime_pd'] >= start) & (df['end_datetime_pd'] <= end))]
        res = res.to_dict('records')
        for x in res:
            x.pop('start_datetime_pd')
            x.pop('end_datetime_pd')

        return Response(res, status=status.HTTP_200_OK)
