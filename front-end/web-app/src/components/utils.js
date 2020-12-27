
export const Median = (array) =>{
    let pos = (array.length -1 )* .5
    let base = Math.floor(pos)
    if (pos===base){
        return array[pos]
    }
    return (array[base]+array[base+1])/2
}

export const Q1 = (array) =>{
    let pos = (array.length -1 )* .5
    let base = Math.floor(pos)
    if (pos===base){
        if (pos!==0){
            return Median(array.slice(0,base))
        }
    }
    return Median(array.slice(0,base+1))
}

export const Q3 = (array) =>{
    let pos = (array.length -1 )* .5
    let base = Math.floor(pos)
    if (pos===0){
        return Median(array.slice(base, array.length))
      }
    return Median(array.slice(base+1, array.length))
}