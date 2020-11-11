import json
import pandas as pd
import gc


def get_weather_data(file, typeof, start, end):
    data = {'datetime': [], 'value': []}
    with open(file, 'r') as f:
        for line in f:
            dictionary = json.loads(line)
            for key in dictionary:
                if key == '':
                    pass
                elif dictionary[key] == '':
                    data['datetime'].append(key)
                    data['value'].append(-1)
                else:
                    data['datetime'].append(key)
                    data['value'].append(typeof(dictionary[key]))
    df = pd.DataFrame(data=data)
    df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)
    df = df.set_index(['datetime_pd'])
    query = df.loc[start:end, ['datetime', 'value']].sort_index()
    res = query.to_dict('records')
    del df
    gc.collect()
    return res
