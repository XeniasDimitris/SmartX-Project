
let baseURL = 'http://127.0.0.1:8000/api/'

export default class API{
    static weatherAPI(queries){
      let dataset = queries.dataset
      let url = baseURL+`weather/${dataset}/?`
      if (queries.start)  {url+=`start=${queries.start}`}
      if (queries.end) {url+=`&end=${queries.end}`}
      return fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then( resp => resp.json())
    }
     
    static demographicsAPI(){
      let url = baseURL+`demographics/`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

    static trafficSensorsAPI(){
      let url = baseURL+`traffic/sensors/`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

    static trafficCorSensorsAPI(){
      let url = baseURL+`traffic/cor_sensors/`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

    static async trafficRecordsAPI(queries){
      let url = baseURL+`traffic/records/?report_id=${queries.rep_id}`
      if (queries.start)  {url+=`&start=${queries.start}`}
      if (queries.end) {url+=`&end=${queries.end}`}
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const res = await resp.json()
      return res
    }


    static ParkingsInfoAPI(){
      let url = baseURL+`parkings/info/`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

    static ParkingsRecsAPI(queries){
      let url = baseURL+`parkings/records?`
      if (queries.start)  {url+=`start=${queries.start}`}
      if (queries.end) {url+=`&end=${queries.end}`}
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

    static SensorsDokk1API(){
      let url = baseURL+`dokk1/sensors/`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }


    static Dokk1RecsAPI(queries){
      let url = baseURL+`dokk1/records?`
      if (queries.start)  {url+=`start=${queries.start}`}
      if (queries.end) {url+=`&end=${queries.end}`}
      if (queries.report_id) {url+=`&report_id=${queries.report_id}`}
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

    static PollutionSensorsAPI(){
      let url = baseURL + 'pollution/sensors'
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }


    static PollutionRecsAPI(queries){
      let url = baseURL+`pollution/records?`
      if (queries.start)  {url+=`start=${queries.start}`}
      if (queries.end) {url+=`&end=${queries.end}`}
      if (queries.report_id) {url+=`&id=${queries.report_id}`}
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

  }