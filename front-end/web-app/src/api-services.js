
let baseURL = 'http://127.0.0.1:8000/api/'

export default class API{
    static weatherAPI(queries){
      let url = baseURL+`weather/temperature?`
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
     
  }