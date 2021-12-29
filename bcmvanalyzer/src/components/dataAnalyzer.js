const dataAnalyzer = (start,end,today,data) => {
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

    // 0000000001 = 1.1.1970 00:00:01
    // 1577836800 = 1.1.2020 00:00:00
    // 1577836800 + 86400 = 1577923200 = 2.1.2020 00:00:00

    const getDateFromTimestamp = (stamp) => {
       let datestring = new Date(stamp).toLocaleDateString("fi-FI")
       return datestring
    }

    const findTopCourse = (values) => { 
        let top = 0
        let topdate = ""
        values.forEach((item => {
            if (item[1] > top){
                top = item[1]
                topdate = getDateFromTimestamp(item[0])
                // console.log("NewMax:",topdate, item[0], item[1])
            }
        }))
        analyzedData[4] = topdate
        let courseAndDate = String(top).concat(" €, ",topdate)
        return courseAndDate
    }

    const findLowestCourse = (values) => {
        let min = 1000000000
        let mindate = ""
        values.forEach((item => {
            if (item[1] < min){
                min = item[1]
                mindate = getDateFromTimestamp(item[0])
                console.log("NewMin:", mindate, item[0], item[1])
            }
        }))
        return mindate
    }

    const selectValues = () => {    // to get only the day's first value
        let selectedValues = []
        let day = ""
        data.forEach((item => {
            if (getDateFromTimestamp(item[0]).slice(0, 4) !== day){
                selectedValues.push(item)
                day = getDateFromTimestamp(item[0]).slice(0, 4)
            }
        }))
        console.log("Selected:",selectedValues)
        return selectedValues
    }
    
    const countDownwardDays = (values) => {
        let counter = 0
        let maxCount = 0
        let memoryDate = ""
        let beginDay = ""
        let endDay = ""
        let checkValue = values[0][1]
        let downwardData = ["Begin","End",0]
        console.log("StartValue:",checkValue)
        values.forEach((item => {
            if (item[1] < checkValue){  // day's course lower than check
                counter++
                console.log(checkValue, counter)
                if (counter === 1){
                    memoryDate = item[0]
                }
                if (counter > maxCount){ // new longest downward trend in days
                    maxCount = counter
                    endDay = getDateFromTimestamp(item[0])
                    beginDay = getDateFromTimestamp(memoryDate)
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
        return downwardData
    }

    sendData = selectValues()
    analyzedData[1] = findTopCourse(sendData)
    analyzedData[5] = findLowestCourse(sendData)
    returnValues = countDownwardDays(sendData)
    analyzedData[2] = returnValues[0]
    analyzedData[3] = returnValues[1]
    analyzedData[0] = returnValues[2]
    return analyzedData
}

export default dataAnalyzer