import pandas as pd
import gc


def get_parkings_info(data_dir):
    df = pd.read_csv(f'{data_dir}aarhus_parking_address.csv', ).fillna(0).astype({"housenumber": int})
    res = df.to_dict('records')
    # Clear Memory
    del df
    gc.collect()
    return res


def get_parkings_records(data_dir, start, end, parking, groupby):
    df = pd.read_csv(f'{data_dir}aarhus_parking.csv').rename(columns={'updatetime': 'datetime'}).drop(
        columns=['_id', 'streamtime'])
    df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)

    df = df.set_index('datetime_pd')
    query = df.loc[start:end].sort_index()
    if parking:
        query = query.loc[query['garagecode'] == parking]
    if groupby:
        agg = {
            'vehiclecount': 'sum',
            'totalspaces': 'max'
        }
        query = query.groupby(pd.Grouper(freq=groupby)).agg(agg)
        query['datetime'] = query.index.astype(str)
    res = query.dropna().to_dict('records')
    # Clear Memory
    del df, query
    gc.collect()
    return res
