import pandas as pd
import gc

def get_traffic_sensors(data_dir):
    columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20, 21, 21]
    df = pd.read_csv(f'{data_dir}trafficMetaDataNoNAN.csv', usecols=columns)
    res = []
    data = df.to_dict('records')
    havevisited = []
    for x in data:
        if x['POINT_1_NAME'] not in havevisited:
            res.append({
                'id': x['POINT_1_NAME'],
                'lng': x['POINT_1_LNG'],
                'lat': x['POINT_1_LAT'],
                'street': x['POINT_1_STREET'],
                'city': x['POINT_1_CITY'],
                'number': x['POINT_1_STREET_NUMBER'],
            }
            )
            havevisited.append(x['POINT_1_NAME'])
        if x['POINT_2_NAME'] not in havevisited:
            res.append({
                'id': x['POINT_2_NAME'],
                'lng': x['POINT_2_LNG'],
                'lat': x['POINT_2_LAT'],
                'street': x['POINT_2_STREET'],
                'city': x['POINT_2_CITY'],
                'number': x['POINT_2_STREET_NUMBER']
            })
            havevisited.append(x['POINT_2_NAME'])

    del df
    gc.collect()
    return res


def get_traffic_cor_sensors(data_dir):
    columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20, 21, 21]
    df = pd.read_csv(f'{data_dir}trafficMetaDataNoNAN.csv', usecols=columns)
    res = df.to_dict('records')
    del df
    gc.collect()
    return res


def get_traffic_records(data_dir, start, end, report_id, groupby):
    columns = [1, 2, 4, 5, 6]
    df = pd.read_csv(
        f'{data_dir}citypulse_traffic_raw_data_aarhus_aug_sep_2014/traffic_june_sep/trafficData{report_id}.csv',
        usecols=columns)
    df['datetime_pd'] = pd.to_datetime(df['TIMESTAMP'], infer_datetime_format=True)
    df.rename(columns={'TIMESTAMP': 'datetime'}, inplace=True)
    df.set_index('datetime_pd', inplace=True)
    query = df.loc[start:end].sort_index()
    if groupby:
        agg = {
            'vehicleCount': 'sum',
            'avgSpeed': 'mean',
            'medianMeasuredTime': 'mean',
            'avgMeasuredTime': 'mean'
        }
        query = query.groupby(pd.Grouper(freq=groupby)).agg(agg)
        query['datetime'] = query.index.astype(str)
    res = query.dropna().to_dict('records')
    del df, query
    gc.collect()
    return res
