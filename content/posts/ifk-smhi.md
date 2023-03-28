title: ifk-smhi
date: 2023-04-28
author: Mladen Gibanica
category: Projects
tags: climate, data, smhi
status: published
data:

<a href="https://github.com/Ingenjorsarbete-For-Klimatet/ifk-smhi"
target="_blank">ifk-smhi</a>,
a Python package for interfacing a subset of
<a href="https://opendata.smhi.se/apidocs/" target="_blank">SMHI APIs</a>,
has been released. The docs can be found
<a href="https://ingenjorsarbeteforklimatet.se/ifk-smhi/" target="_blank">
here</a>.

You can use it to get data from the supported SMHI APIs.
Note that, most answers from the API are in Swedish and that the code
on this page is using version 0.1.1 of ifk-smhi.

## Metobs

For example, we can fetch the historic temperature data for Göteborg as

```python
from smhi.metobs import Parameters, Stations, Periods, Data

parameter = Parameters()
parameter.show
```

which will output

```python
('1', 'Lufttemperatur', 'momentanvärde, 1 gång/tim')
('2', 'Lufttemperatur', 'medelvärde 1 dygn, 1 gång/dygn, kl 00')
('3', 'Vindriktning', 'medelvärde 10 min, 1 gång/tim')
...
('11', 'Global Irradians (svenska stationer)', 'medelvärde 1 timme, 1 gång/tim')
...
```

To get all stations for parameter `1` we run

```python
stations = Stations(parameter, 1)
stations.show
```

which will show a list with 968 entries

```python
(1, 'Akalla')
(2, 'Högdalen')
(3, 'Sigtuna')
(4, 'Jönköping')
(7, 'Gävle')
...
(71420, 'Göteborg A')
...
(72630, 'Göteborg')
...
```

Next, we want to get all available periods of the `"Göteborg A"` station

```python
periods = Periods(stations, station_name="Göteborg A")
periods.show
```

which lists the available periods

```python
corrected-archive
latest-day
latest-hour
latest-months
```

Finally, to get the data we can call (which implicitly asks for
the `"corrected-archive"` period)

```python
data = Data(periods)
data.data
```

which outputs a Pandas DataFrame

```python
                     Lufttemperatur
1961-01-01 06:00:00             0.8
1961-01-01 12:00:00             1.0
1961-01-01 18:00:00             1.4
1961-01-02 06:00:00             1.8
1961-01-02 12:00:00             2.2
...                             ...
2022-12-01 02:00:00             2.5
2022-12-01 03:00:00             2.4
2022-12-01 04:00:00             2.3
2022-12-01 05:00:00             2.1
2022-12-01 06:00:00             1.9

[303469 rows x 1 columns]
```

Note that, usually the last three months are missing from the
`"corrected-archive"` period. We can plot this data in a scatter plot.
Here, only the daily average is shown to limit the data, see Plot code details.

<details>
    <summary>Plot code</summary>

```python
import plotly.graph_objects as go

data_agg_day = data.data.resample("D").mean()
fig = go.Figure()
fig.add_trace(
    go.Scattergl(
        x=data_agg_day.index,
        y=data_agg_day["Lufttemperatur"],
        mode="markers",
        name="Göteborg A station"
    )
)
fig.update_layout(
    title="Air temperature in Göteborg A",
    xaxis_title="Year",
    yaxis_title="Air temperature [°C]",
    legend={"orientation": "h"},
    margin={"l": 0, "r": 0, "b": 80, "t": 100},
    paper_bgcolor="rgba(250, 250, 250, 1)",
)
fig.show()
```

</details>

<iframe id="igraph"
alt="Historic data of air temperature in Göteborg A, from SMHI"
scrolling="no" style="border:none;" seamless="seamless"
src="{{post_url}}/data/air_temperature_gothenburg_a.html" height="525" width="100%">
</iframe>

## Strang

What if we wanted to get a sense of the global irradiance over
Sweden's geographic area? We could try fetching the global irradiance
(parameter `11`) from Metobs as

```python
stations = Stations(parameter, 11)
stations.show
```

which will output

```python
(53445, 'Lund Sol')
(64565, 'Växjö Sol')
(68545, 'Hoburg Sol')
(71415, 'Göteborg Sol')
(77215, 'Ölands norra udde Sol')
(78645, 'Visby Sol')
(81525, 'Nordkoster Sol')
(86655, 'Norrköping Sol')
(93235, 'Karlstad Sol')
(98735, 'Stockholm Sol')
(99275, 'Svenska Högarna Sol')
(105285, 'Borlänge Sol')
(132165, 'Storlien-Visjövalen Sol')
(134615, 'Östersund Sol')
(140615, 'Umeå Sol')
(147655, 'Gunnarn Sol')
(162015, 'Luleå Sol')
(178985, 'Tarfala Sol')
(180025, 'Kiruna Sol')
```

This only gives us the 19 stations that are measuring
global irradiance. To increase the spatial resolution,
we could instead use the STRÅNG API which is a simulation
model of the global irradiance. We can use it as

```python
from smhi.strang import Strang

strang = Strang()
parameters = strang.parameters
```

which will print out all possible parameters

```python
parameter: 116, info: CIE UV irradiance [mW/m²]
parameter: 117, info: Global irradiance [W/m²]
parameter: 118, info: Direct normal irradiance [W/m²]
parameter: 120, info: PAR [W/m²]
parameter: 121, info: Direct horizontal irradiance [W/m²]
parameter: 122, info: Diffuse irradiance [W/m²]
```

We are interested in parameter 117 here. First, let's find out how
far back in time we can get the data from

```python
strang.available_parameters[117].time_from
```

which tells us

```python
datetime.datetime(1999, 1, 1, 0, 0, tzinfo=tzutc())
```

Now, we can get a multi-point response from the API for that
day aggregated `daily`

```python
data = strang.get_multipoint(117, "1999-01-01", "daily")
data
```

which gives us a Pandas DataFrame

```python
             lat        lon  Global irradiance [W/m²] 1999-01-01T00:00:00+00:00 daily
0      74.945244   1.212198                                                0.0
1      74.910484   1.942287                                                0.0
2      74.873570   2.669121                                                0.0
3      74.834520   3.392533                                                0.0
4      74.793340   4.112356                                                0.0
...          ...        ...                                                ...
11827  46.503345  23.264704                                             1561.9
11828  46.408020  23.516861                                             1655.8
11829  46.312065  23.768070                                             1717.9
11830  46.215477  24.018330                                             1701.7
11831  46.118263  24.267643                                             1673.6

[11832 rows x 3 columns]
```

We can again visualise this data in a scatter plot.

<details>
    <summary>Scatter plot code</summary>

```python
import plotly.graph_objects as go

fig = go.Figure()
fig.add_trace(
    go.Scattergl(
        x=data["lon"],
        y=data["lat"],
        mode="markers",
        name="Global irradiance 1999-01-01 daily",
        marker={"color": data["Global irradiance [W/m²] 1999-01-01T00:00:00+00:00 daily"]},
    )
)
fig.update_layout(
    title="Global irradiance 1999-01-01 daily",
    xaxis_title="Longitude",
    yaxis_title="Latitude",
    legend={"orientation": "h"},
    margin={"l": 0, "r": 0, "b": 80, "t": 100},
    paper_bgcolor="rgba(250, 250, 250, 1)",
)
fig.show()
```

</details>

<iframe id="igraph"
alt="Historic data of air temperature in Göteborg A, from SMHI"
scrolling="no" style="border:none;" seamless="seamless"
src="{{post_url}}/data/global_irradiance.html" height="525" width="100%">
</iframe>
