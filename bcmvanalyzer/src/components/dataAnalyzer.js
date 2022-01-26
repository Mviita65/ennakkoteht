// Returns the data needed to show results in AnalyzedData
const dataAnalyzer = (start,end,data) => {
    let sendData = []
    let analyzedData = ["","","","","",""]

    // Changes the timestamp to local date string
    const getDateFromTimestamp = (stamp) => {
       let datestring = new Date(stamp).toLocaleDateString("fi-FI")
       return datestring
    }

    // Finds the maximum course and it's date
    const findTopCourse = (values) => {                     // gets the date and highest price in euros
        let useValues = JSON.parse(JSON.stringify(values))  // deep copy
        useValues.shift()                                   // removes the first value from array
        let top = 0
        let topdate = ""
        useValues.forEach((item => {
            if (item[1] > top){
                top = item[1]
                topdate = getDateFromTimestamp(item[0])
            }
        }))
        let topCourseAndDate = String(top).concat(" €, ",topdate)
        // return topdate
        return topCourseAndDate
    }

    // Finds the minimum course and it's date
    const findLowestCourse = (values) => {                  // gets the date and lowest price in euros
        let useValues = JSON.parse(JSON.stringify(values))  // deep copy
        useValues.shift()                                   // removes the first value from array
        let min = 1000000000
        let mindate = ""
        useValues.forEach((item => {
            if (item[1] < min){
                min = item[1]
                mindate = getDateFromTimestamp(item[0])
            }
        }))
        let minCourseAndDate = String(min).concat(" €, ",mindate)
        // return mindate
        return minCourseAndDate
    }

    // Selects the day's first value for each date
    const selectValues = () => {   
        let selectedValues = [data[0]]                                  // start value is the first item
        let day = getDateFromTimestamp(data[0][0]).slice(0, 10)         // first item's date without time
        data.forEach((item => {
            let itemDay = getDateFromTimestamp(item[0]).slice(0, 10)    // item's date without time
            if (itemDay !== day){                                       // if date changes then push new item to selectedValues
               selectedValues.push(item)
            }
            day = getDateFromTimestamp(item[0]).slice(0, 10)            // update the day
        }))
        // console.log("Selected:",selectedValues)
        return selectedValues
    }
    
    // Finds the longest downward trend and collects the other needed values
    // CoinGeckos API changes the granularity and it's causing the troubles (the day's value is not stabile)
    const countDownwardDays = (values) => { 
        let counter = 0
        let maxCount = 0
        let memoryDate = values[0][0]
        let beginDay = ""
        let endDay = ""
        let checkValue = values[0][1]
        let downwardData = [0,"Top","Begin","End","",""]
        let fromD = (start + 86400) * 1000 
        let toD = end * 1000
    
        values.forEach((item => {
            if (item[1] < checkValue){          // day's course is lower than the checkValue
                counter++                       // so add the counter (downward trend)
                // console.log(checkValue, counter)
                if (counter === 1){
                    memoryDate = item[0]        // perhaps there is a new longer trend to begin from this date
                }
                if (counter > maxCount){        // new longest downward trend in days 
                    maxCount = counter          // so change the maxCount to this longer trend
                    endDay = getDateFromTimestamp(item[0])  // gets the endDay for downward trend
                    beginDay = getDateFromTimestamp(memoryDate) // gets the beginDay for downward trend
                    if (getDateFromTimestamp(fromD) === beginDay && 
                        getDateFromTimestamp(toD) === endDay) {
                        downwardData[4] = "Do not sell, trend only downwards"   // if the course is only downward
                        downwardData[5] = "Do not buy, trend only downwards"    // between given dates
                    } 
                    else {                                          // otherwise
                        downwardData[4] = findTopCourse(values)     // best date for selling
                        downwardData[5] = findLowestCourse(values)  // best date for buying
                    }
                }
            } else {                            // downward trend has ended   
                counter = 0
            }
            checkValue = item[1]                // update the checkValue
        }))
        // console.log("Downward days:", maxCount)
        downwardData[0] = maxCount
        downwardData[1] = findTopCourse(values)
        downwardData[2] = beginDay
        downwardData[3] = endDay
        
        // console.log("Start:",getDateFromTimestamp(fromD),beginDay,
        //    "End:",getDateFromTimestamp(toD),endDay)
        return downwardData
    }

    sendData = selectValues()
    analyzedData = countDownwardDays(sendData)
    return analyzedData
}

export default dataAnalyzer