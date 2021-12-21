from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..controllers.PredictionController import *
from sklearn.metrics import *
import pandas as pd
df = create_df()

pd.set_option("display.max_rows", 12, "display.max_columns", None)

class PredictionSESView(APIView):

    def get(self, request, format=None):
        prediction, a = fit_SES(request.query_params, df)
        res = {}
        res['expected'] = df.carbon_monoxide[-1]
        res['prediction'] = prediction
        res['a'] = a
        res['ses_mae'] = mean_absolute_error([df.carbon_monoxide[-1]], [prediction])
        res['ses_mse'] = mean_squared_error([df.carbon_monoxide[-1]], [prediction])
        res['ses_mape'] = mean_absolute_percentage_error([df.carbon_monoxide[-1]], [prediction])
        return Response(res, status=status.HTTP_200_OK)


class PredictionMLRView(APIView):

    def get(self, request, format=None):
        prediction = fit_MLR(request.query_params, df)
        res = {}
        res['expected'] = df.carbon_monoxide[-1]
        res['prediction'] = prediction
        res['mlr_mae'] = mean_absolute_error([df.carbon_monoxide[-1]], [prediction])
        res['mlr_mse'] = mean_squared_error([df.carbon_monoxide[-1]], [prediction])
        res['mlr_mape'] = mean_absolute_percentage_error([df.carbon_monoxide[-1]], [prediction])
        return Response(res, status=status.HTTP_200_OK)


