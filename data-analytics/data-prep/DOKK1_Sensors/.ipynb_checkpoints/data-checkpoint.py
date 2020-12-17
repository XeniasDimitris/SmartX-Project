import pandas as pd
columns = [1, 4, 5, 6, 7]
df = pd.read_csv('DOKK1_Sensors.csv').rename(columns={'date': 'datetime'})
df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)


df = df.loc[:]
print(df)
#print(df.head().to_dict('records'))