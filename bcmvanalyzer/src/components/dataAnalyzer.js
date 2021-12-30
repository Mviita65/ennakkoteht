const dataAnalyzer = (start,end,data) => {
    let sendData = []
    let returnValues = []
    let analyzedData = ["","","","","",""]

    // Coingecko API:
    // Data granularity is automatic (cannot be adjusted)
    // 1 day from query time = 5 minute interval data
    // 1 - 90 days from query time = hourly data
    // above 90 days from query time = daily data (00:00 UTC)
    // https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=1279407600&to=1609376400
    // 1 Hour = 3600 Seconds
    // 1 Day = 86400 Seconds
    // 1 Week =	604800 Seconds
    // 1 Month (30.44 days) =	2629743 Seconds
    // 1 Year (365.24 days) =	31556926 Seconds

    const getDateFromTimestamp = (stamp) => {
       let datestring = new Date(stamp).toLocaleDateString("fi-FI")
       return datestring
    }

    const findTopCourse = (values) => { // gets the date and highest price in euros
        let top = 0
        let topdate = ""
        values.forEach((item => {
            if (item[1] > top){
                top = item[1]
                topdate = getDateFromTimestamp(item[0])
            }
        }))
        let courseAndDate = String(top).concat(" €, ",topdate)
        analyzedData[1] = courseAndDate
        return topdate
    }

    const findLowestCourse = (values) => { // gets the date for lowest price in euros
        let min = 1000000000
        let mindate = ""
        values.forEach((item => {
            if (item[1] < min){
                min = item[1]
                mindate = getDateFromTimestamp(item[0])
            }
        }))
        return mindate
    }

    const selectValues = () => {   // takes only day's first data to selectedValues and pass the others
        let selectedValues = [data[0]]
        let day = getDateFromTimestamp(data[0][0]).slice(0, 10)
        data.forEach((item => {
            let itemDay = getDateFromTimestamp(item[0]).slice(0, 10)
            if (itemDay !== day){
               selectedValues.push(item)
            }
            day = getDateFromTimestamp(item[0]).slice(0, 10)
        }))
        console.log("Selected:",selectedValues)
        return selectedValues
    }
    
    const countDownwardDays = (values) => { // there is bug in this one: the warning does not work correctly
        let counter = 0
        let maxCount = 0
        let memoryDate = values[0][0]
        let beginDay = ""
        let endDay = ""
        let checkValue = values[0][1]
        let downwardData = ["Begin","End",0]
        let fromD = (start) * 1000
        let toD = end * 1000
    
        values.forEach((item => {
            if (item[1] < checkValue){  // day's course lower than check
                counter++
                // console.log(checkValue, counter)
                if (counter === 1){
                    memoryDate = item[0] - 86400
                }
                if (counter > maxCount){ // new longest downward trend in days
                    maxCount = counter
                    endDay = getDateFromTimestamp(item[0])
                    beginDay = getDateFromTimestamp(memoryDate)
                    if (getDateFromTimestamp(fromD) === beginDay && 
                        getDateFromTimestamp(toD) === endDay) {
                        analyzedData[4] = "Do not sell, trend only downwards"
                        analyzedData[5] = "Do not buy, trend only downwards"
                    } 
                }
            } else {
                counter = 0
            }
            checkValue = item[1]
        }))
        console.log("Downward days:", maxCount)
        downwardData[0] = beginDay
        downwardData[1] = endDay
        downwardData[2] = maxCount
        console.log("Start:",getDateFromTimestamp(fromD),beginDay,
            "End:",getDateFromTimestamp(toD),endDay)
        return downwardData
    }

    // downwardDays = feedback[0] = analyzedData[0] etc.
    // topCourse = feedback[1]
    // downStart = feedback[2]
    // downEnd = feedback[3]
    // sellDay = feedback[4]
    // buyDay = feedback[5]

    sendData = selectValues()

    analyzedData[4] = findTopCourse(sendData)
    analyzedData[5] = findLowestCourse(sendData)
    returnValues = countDownwardDays(sendData)
    analyzedData[2] = returnValues[0]
    analyzedData[3] = returnValues[1]
    analyzedData[0] = returnValues[2]
    return analyzedData
}

export default dataAnalyzer