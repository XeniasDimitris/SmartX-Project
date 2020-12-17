import pandas as pd
import gc
from django.conf import settings


def get_sensors_info(data_dir):
    df = pd.read_csv(settings.DATA_DIR + 'Traffic/trafficMetaDataNoNAN.csv')
    res = df[['REPORT_ID', 'POINT_1_LNG']].to_dict('records')
    arr = []
    for item in res:
        with open(f'{data_dir}/pollutionData{item["REPORT_ID"]}.csv') as f:
            f.readline()
            lng = f.readline().split(',')[5]
            lat = f.readline().split(',')[6]
            arr.append({'longitude': float(lng), 'latitude': float(lat), 'report_id': item["REPORT_ID"]})

    return arr


def get_sensor_records(data_dir, start, end, report_id):
    df = pd.read_csv(f'{data_dir}/pollutionData{report_id}.csv')
    df['datetime_pd'] = pd.to_datetime(df['timestamp'], infer_datetime_format=True)
    df.rename(columns={'timestamp': 'datetime'}, inplace=True)
    df.set_index('datetime_pd', inplace=True)
    query = df.loc[start:end].sort_index()
    res = query.to_dict('records')

    del df, query
    gc.collect()
    return res
