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

    const findTopCourse = () => {
        let top = 0
        data.forEach((item => {
            // if (item[0]%86400===0){ 
                if (item[1] > top){
                    top = item[1]
                }
            // }
        }))
        return top
    }

    if (start > (today-86400)) {
        analyzedData[0] = "NOT older than one day"
        analyzedData[1] = findTopCourse()
    } else {
        if (start > (today-90*86400)){
            analyzedData[0] = "NOT older than 90 days"
            analyzedData[1] = findTopCourse()
        } else {
            analyzedData[0] = "Older than 90 days"
            analyzedData[1] = findTopCourse()
        }
    }
    return analyzedData
}

export default dataAnalyzer