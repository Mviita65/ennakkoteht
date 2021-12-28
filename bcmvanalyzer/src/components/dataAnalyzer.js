const dataAnalyzer = (start,end,today,data) => {
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
       let datestring = new Date(stamp).toLocaleString("fi-FI")
       return datestring
    }

    const findLowestCourse = () => {
        let min = findTopCourse()
        let mindate = ""
        data.forEach((item => {
            if (item[1] < min){
                min = item[1]
                mindate = getDateFromTimestamp(item[0])
                console.log("NewMin:", mindate, item[0], item[1])
            }
        }))
        return mindate
    }

    const findTopCourse = () => {
        let top = 0
        let topdate = ""
        data.forEach((item => {
            if (item[1] > top){
                top = item[1]
                topdate = getDateFromTimestamp(item[0])
                console.log("NewMax:",topdate, item[0], item[1])
            }
        }))
        analyzedData[4] = topdate
        return top
    }

    const selectValues = () => {
        let selectedValues = []
        let day = ""
        data.forEach((item => {
            if (getDateFromTimestamp(item[0]).slice(0, 4) !== day){
                selectedValues.push(item)
                day = getDateFromTimestamp(item[0]).slice(0, 4)
            }
        }))
        console.log("Selected:",selectedValues)
    }
    
    const countDownwardDays = (dataArray) => {
        // downwardDays = feedback[0]
        // topCourse = feedback[1]
        // downStart = feedback[2]
        // downEnd = feedback[3]
        // sellDay = feedback[4]
        // buyDay = feedback[5]
        let days = 0
        let start = ""
        let stop = ""
        let verify = dataArray[0[1]]
        dataArray.forEach((item => {

            if (item[1] < verify) {
                verify = item[1]
                days++
                
            }
        }))
    }

    if ((start + 86400)  > (today-86400)) {
        analyzedData[0] = "NOT older than one day"
        selectValues()
        
    } else {
        if ((start + 86400) > (today-90*86400)){
            analyzedData[0] = "NOT older than 90 days"
            selectValues()

        } else {
            analyzedData[0] = "Older than 90 days"
        }
    }
    analyzedData[1] = findTopCourse()
    analyzedData[5] = findLowestCourse()
    return analyzedData
}

export default dataAnalyzer