import pandas as pd
import gc


def get_sensors_info(data_dir):
    columns = [1, 4, 5, 6, 7]
    df = pd.read_csv(f'{data_dir}/DOKK1_Sensors_meta.csv', usecols=columns)
    res = df.to_dict('records')
    del df
    gc.collect()
    return res


def get_sensor_records(data_dir, start, end, id):
    columns = [1, 4, 5, 6, 7]
    df = pd.read_csv(f'{data_dir}/DOKK1_Sensors.csv').rename(columns={'date': 'datetime'})
    df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)

    query = df.loc[start:end].sort_index().loc[df['sensor'] == id]
    res = query.to_dict('records')
    del df, query
    gc.collect()
    return res
