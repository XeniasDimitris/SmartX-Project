import {Q1,Median,Q3} from '../utils'

export const transform_data_heat = (data,field)=>{
    let days = {0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'}
    let res = {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}}

    // Sum and calculate the value for day time
    
    for (let i=0; i< data.length; i++){
        let datetime = data[i]['datetime']
        let day = datetime.getDay()
        let hours = datetime.getHours()
        if (hours < 10){ hours = +'0' + hours.toString()}
        let minutes = datetime.getMinutes()
        if (minutes < 10){ minutes = +'0' + minutes.toString()}
        if (minutes === 0){ minutes = '00'}
        let time= `${hours}:${minutes}`
        if (res[day][time]){
            res[day][time]['value']+= data[i][field]
            res[day][time]['count']+= 1
            continue
        }
        res[day][time] = { 'value': data[i][field],
                           'count': 1}
    }
    let response = []
    Object.keys(res).forEach( key =>{
       Object.keys(res[key]).forEach( x =>{
            response.push({
                'day': days[key],
                'time': x,
                'value': res[key][x]['value'] / res[key][x]['count'] 
            })
       })
    }) 
    return response
}

export const transform_data_box = (data,field) => {

    let months = {1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov', 12:'Dec'}

    // Create an array for each month and add every value in a month-array in ascenting order
    let arr = []
    Object.keys(months).forEach( () =>{
        arr.push([])
    })
    data.forEach( item =>{
        let base_month =  item['datetime'].getMonth()
        if (item[field]) {
            arr[base_month].push(item[field])
        }
    })
    arr.forEach( newarr =>{
        newarr.sort((a, b) => a - b);
    })

    // Calculate Q1,Q2,Q3 for the box plot
    let res = []
    Object.keys(months).forEach( (key) =>{
        res.push({'date': key})
    }) 
    arr.forEach( (newarr,i) =>{
        if (newarr.length!==0){
            res[i].min = newarr[0]
            res[i].max = newarr[newarr.length-1]
            res[i].median = Median(newarr)
            res[i].q1 = Q1(newarr)
            res[i].q3 = Q3(newarr)
        }
    })
    return res

}