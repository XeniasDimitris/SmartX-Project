
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
    let months = {0:'Jan', 1:'Feb', 2:'Mar', 3:'Apr', 4:'May', 5:'Jun', 6:'Jul', 7:'Aug', 8:'Sept', 9:'Oct', 10:'Nov', 11:'Dec'}
    let res= []
    Object.keys(months).forEach( key => {
        for (let i=31; i>=1; i--){
           res.push({
                'month': months[key],
                'date': i,
                'value': 0
            })
        }
    })

    // Sum and calculate the average value for each day
    let base_month = -1
    let base_date = -1
    let value = 0 
    let count = 0
    for (let i=0; i< data.length; i++){
        let datetime = data[i]['datetime']
        let date = datetime.getDate()
        if (i==0){
            base_date =  datetime.getDate()
            base_month =  datetime.getMonth()
            if (data[i]['value']) {
                value += data[i]['value']
                count++
            }
            continue;
        }
        if ( date != base_date){
            res.push({
                'month': months[base_month],
                'date': base_date,
                'value': value/count
            })
            base_month =  datetime.getMonth()
            base_date = date
            value = 0
            count = 0
        }
        if (i==data.length-1){
            if (data[i]['value']) {
                value += data[i]['value']
                count++
            }
            res.push({
                'month': months[base_month],
                'date': base_date,
                'value': value/count
            })
            break;
        }
        if (data[i]['value']) {
            value += data[i]['value']
            count++
        }
    }
    return res
}

export const transform_data_box = (data) => {

    let months = {1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov', 12:'Dec'}
    
    // Create an array for each month and add every value in a month-array in ascenting order
    let arr = []
    Object.keys(months).forEach( () =>{
        arr.push(new Array())
    })
    data.forEach( item =>{
        let base_month =  item['datetime'].getMonth()
        if (item['value']) {
            arr[base_month].push(item['value'])
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