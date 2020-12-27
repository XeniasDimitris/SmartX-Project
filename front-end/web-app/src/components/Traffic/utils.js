
const Median = (array) =>{
    let pos = (array.length -1 )* .5
    let base = Math.floor(pos)
    if (pos===base){
        return array[pos]
    }
    return (array[base]+array[base+1])/2
}

const Q1 = (array) =>{
    let pos = (array.length -1 )* .5
    let base = Math.floor(pos)
    if (pos===base){
        return Median(array.slice(0,base))
    }
    return Median(array.slice(0,base+1))
}
const Q3 = (array) =>{
    let pos = (array.length -1 )* .5
    let base = Math.floor(pos)
    return Median(array.slice(base+1, array.length))
}

export const transform_data_heat = (data)=>{
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
        if (minutes == 0){ minutes = '00'}
        let time= `${hours}:${minutes}`
        if (res[day][time]){
            res[day][time]+= data[i]['vehicleCount']
            continue
        }
        res[day][time] = data[i]['vehicleCount']
    }
    let response = []
    Object.keys(res).forEach( key =>{
       Object.keys(res[key]).forEach( x =>{
            response.push({
                'day': days[key],
                'time': x,
                'value': res[key][x]
            })
       })
    }) 
    return response
}

export const transform_data_box = (data) => {

    let months = {1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov', 12:'Dec'}

    // Create an array for each month and add every value in a month-array in ascenting order
    let arr = []
    Object.keys(months).forEach( () =>{
        arr.push(new Array())
    })
    let base_month = -1
    let base_date = -1
    let value = 0 
    for (let i=0; i< data.length; i++){
        let datetime = data[i]['datetime']
        let date = datetime.getDate()
        if (i==0){
            base_date =  datetime.getDate()
            base_month =  datetime.getMonth()+1
            if (data[i]['vehicleCount']) {
                value += data[i]['vehicleCount']
            }
            continue;
        }
        if ( date != base_date){
            arr[base_month].push(value)
            base_month =  datetime.getMonth()+1
            base_date = date
            value = 0
        }
        if (i==data.length-1){
            arr[base_month].push(value)
            break;
        }
        
        value += data[i]['vehicleCount']
        
    }
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