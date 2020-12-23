import pandas as pd


def get_events(data_dir, start, end):
    columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16]
    df = pd.read_csv(f"{data_dir}/aarhus_libraryEvents.csv", usecols=columns).fillna('-')

    df['start_datetime_pd'] = pd.to_datetime(df['starttime'], infer_datetime_format=True)
    df['end_datetime_pd'] = pd.to_datetime(df['endtime'], infer_datetime_format=True)

    if start is None: start = '2000-01'
    if end is None: end = '2030-12'
    res = df.loc[((df['start_datetime_pd'] >= start) & (df['start_datetime_pd'] <= end))]
    res = res.to_dict('records')
    for x in res:
        x.pop('start_datetime_pd')
        x.pop('end_datetime_pd')
    return res
