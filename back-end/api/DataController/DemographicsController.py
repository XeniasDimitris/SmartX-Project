import pandas as pd
import gc


def get_demographics(data_dir):
    df = pd.read_csv(f'{data_dir}/Demographics--januar-2013.csv')
    res = df.to_dict('records')
    del df
    gc.collect()
    return res
