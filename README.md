# SmartX-Project

## Summary
  SmartX-City Project aims to provide an Information System (IS) for Smart Cities as a central platform for data analytics, prediction models and taking action plans. Within this project, our IS has been designed for Arhus City. Aarhus is the second-largest city in Denmark and seat of Aarhus municipality and it's located on the east coast of the Jutland peninsula, in the geographical centre of Denmark.
 
 ## Datasets
  Our Data are related to demographics, air pollution, weather, traffic, parking and DOKK1's sensors measurements from sensors across Aarhus City. These data are provided in [Open Data DK](https://www.opendata.dk/) and [CityPulse Smart City Datasets](http://iot.ee.surrey.ac.uk:8080/datasets.html#traffic) and the date intersection between them is August-September 2014. Even though data are old enough, this project is scalable and can extend it's features with more data from many and different sources in terms of a Smart City. 
  
 ## Architecture
 
  For this project a server has been designed to be accesible from many devices and services as a RESTful API. That gives the capabillity for many front-end applications to interact with the server and obtain the necessary data. Server has been designed with [Django framework](https://www.djangoproject.com/) which one of the most used frameworks for back-end developmen and [Django REST Framework](https://www.django-rest-framework.org/) for the RESTful API function. </br>
  As a front-end application, we have designed a web app with [ReactJS](https://reactjs.org/) library which is the most used and preferable libraries for Single-Page Apps according to [HotFrameworks](https://hotframeworks.com/). For the UI we have used [Material-UI](https://hotframeworks.com/), for maps the [Mapbox GL](https://visgl.github.io/react-map-gl/) and for charts the famous JS library [AmCharts](https://www.amcharts.com/).
  
  ## Start the Project
  
  The first step is to run the server for serving the API Requests. As we are using Django, first of all you need to create a virtual environment and download the dependecies.
  
  ### Create Python's Virtual Environment and start server
  You need to have python >=3.6 installed in your environment (tested with python 3.8.5). Then create the virtual environment typing under **./back-end** directory `$ python3 -m venv venv` and activate it with `source venv/bin/activate`. For the dependecies just run `$ pip install -r dev-requirements.txt`. The start the server typing `python manage.py runserver` and you are ready!
  
 ### Download React's dependecies and start React's development server
 Under **./front-end/web-app** type `$ npm install` in order to download all node modules needed for the app. Before that confirm that you have **node** and **npm** downloaded in your environment (tested with node v10.19.0 and npm v6.14.4). Then just type `$ npm start` and the application will open in your browser.
  
