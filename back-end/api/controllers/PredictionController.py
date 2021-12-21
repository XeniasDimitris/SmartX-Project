import pandas as pd
import json
from statsmodels.tsa.api import  SimpleExpSmoothing
from sklearn import linear_model
from pandas import concat
from pandas import DataFrame

data_dir = '/home/dimitris/Desktop/DiplomaThesis/Datasets/Aarhus/'
features = ['tempm', 'hum', 'dewptm', 'pressurem', 'wdird', 'wspdm', 'ozone', 'particullate_matter',
            'sulfure_dioxide', 'nitrogen_dioxide', 'carbon_monoxide']


def create_df():
    def readfile(file):
        data = {'datetime': [], 'value': []}
        with open('{}Weather/{}'.format(data_dir,file), 'r') as f:
            for line in f:
                dictionary = json.loads(line)
                for key in dictionary:
                    if key == '':
                        pass
                    elif dictionary[key] == '':
                        data['datetime'].append(key)
                        data['value'].append(None)
                    else:
                        data['datetime'].append(key)
                        data['value'].append(float(dictionary[key]))

        df_temp = pd.DataFrame(data=data)
        df_temp['datetime_pd'] = pd.to_datetime(df_temp['datetime'], infer_datetime_format=True)
        df_temp.set_index(['datetime_pd'], inplace=True)
        df_temp = df_temp.rename(columns={'value': file.split('.')[0]})
        df_temp = df_temp.groupby(pd.Grouper(freq='H')).mean()
        df_temp = df_temp.sort_index()
        return df_temp

    files = ['hum.txt', 'dewptm.txt', 'pressurem.txt', 'wdird.txt', 'wspdm.txt']

    df_w = readfile('tempm.txt')
    for x in files:
        y = readfile(x)
        df_w = df_w.merge(y, left_index=True, right_index=True)

    df = pd.read_csv('{}Pollution/pollution/pollutionData210199.csv'.format(data_dir))
    df['datetime_pd'] = pd.to_datetime(df['timestamp'], infer_datetime_format=True)
    df.rename(columns={'timestamp': 'datetime'}, inplace=True)
    df.set_index('datetime_pd', inplace=True)
    df_p = df.groupby(pd.Grouper(freq='H')).mean().drop(columns=['longitude', 'latitude'])
    df = df_w.merge(df_p, left_index=True, right_index=True)
    return df


# reform series for our goal
def reform_series(data, n_in=1, n_out=1, dropnan=True):

    n_vars = 1 if type(data) is list else data.shape[1]
    df = DataFrame(data)
    cols, names = list(), list()
    # input sequence (t-n, ... t-1)
    for i in range(n_in, 0, -1):
        cols.append(df.shift(i))
        names += ['{}(t-1)'.format(f) for f in features]
    # forecast sequence (t, t+1, ... t+n)
    for i in range(0, n_out):
        cols.append(df.shift(-i))
        names += ['{}(t)'.format(f) for f in features]
    # put it all together
    agg = concat(cols, axis=1)
    agg.columns = names
    # drop rows with NaN values
    if dropnan:
        agg.dropna(inplace=True)
    return agg


def fit_SES(params,df):
    data = df.carbon_monoxide[:-1]
    if 'a' in params:
        a = params['a']
        fit = SimpleExpSmoothing(data, initialization_method="estimated").fit(smoothing_level=float(a))
    else:
        fit = SimpleExpSmoothing(data, initialization_method="estimated").fit()
    fcast = fit.forecast(1)

    return fcast[0], fit.model.params['smoothing_level']

def fit_MLR(params,df):
    values = df[features].values
    reframed = reform_series(values, 1, 1)
    reframed.drop(reframed.columns[11:21], axis=1, inplace=True)
    X = reframed[reframed.columns[:-1]].iloc[:-1]
    y = reframed[reframed.columns[-1]].iloc[:-1]
    regr = linear_model.LinearRegression()
    regr.fit(X.values, y.values)
    prediction = regr.predict([reframed[reframed.columns[:-1]].iloc[-1]])

    return prediction

