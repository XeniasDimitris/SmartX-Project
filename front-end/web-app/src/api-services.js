
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
      let url = baseURL+`traffic/records/?id=${queries.rep_id}`
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
      let url = baseURL+`parkings/info`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then( resp => resp.json())
    }

  }