import json
import pandas as pd
import gc


def get_weather_data(file, typeof, request):

    # As we have one json for each day, we concatenate them into an appropriate format for DF constructor
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

    # Creation of Dataframe
    df = pd.DataFrame(data=data)
    df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)
    df = df.set_index(['datetime_pd'])

    start = request.query_params['start'] if 'start' in request.query_params else None
    end = request.query_params['end'] if 'end' in request.query_params else None

    # Query with datetime index
    query = df.loc[start:end].sort_index()
    res = query.to_dict('records')

    # Free up memory
    del df
    gc.collect()
    return res
