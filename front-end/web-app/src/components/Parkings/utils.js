export const  transform_data= (res) =>{
    let ret = []
    Object.keys(res).map( key =>{
        let to_ret = {
            'datetime': new Date(key),
        }
        let count = 0
        Object.keys(res[key]).map( x=>{
            to_ret[x] = res[key][x]
            count += res[key][x]
        })
        to_ret['sum'] = count
        ret.push(to_ret)
    })
    return ret
}