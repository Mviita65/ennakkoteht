const dataAnalyzer = (start,end,today,data,setDownwardDays,
    setTopCourse,setDownStart,
    setDownEnd,setSellDay,setBuyDay
  ) => {

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

if (start > (today-86400)) {
    console.log("Historical date is NOT older than one day")
  } else {
    if (start > (today-(90*86400))){
      console.log("Historical date is NOT older than 90 days")
    } else {
        console.log("Historical date older than 90 days")
    }
  }

}

export default dataAnalyzer