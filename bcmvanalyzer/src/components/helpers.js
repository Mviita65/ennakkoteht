
// helper to get suitable string from given date
const getDateParams = (date,p2) => {
    
    let year = date.slice(0, 4)
    let month = date.slice(5, 7)
    let day = date.slice(8, 10)
    let hour = '00'
    if (p2 === 'start') {
        hour = '02'
    } 
    if (p2 === 'end') {
        hour = '03'
    }
    let minute = '00'
    let second = '00'
    let strDate = year.concat(' ',month,' ',day,' ',hour,':',minute,':',second)
    console.log(strDate)
    return strDate
}

// helper to convert given date to timestamp
const toTimestamp = (date,p2) => {
    var datum = Date.parse(getDateParams(date,p2));
    return datum/1000;
}

export {   
    toTimestamp
}