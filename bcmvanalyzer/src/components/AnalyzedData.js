import React, { useState,useEffect } from 'react'
import { toTimestamp } from './helpers'
import dataAnalyzer from './dataAnalyzer';
import axios from 'axios';

// Coingecko API:
    // Data granularity is automatic (cannot be adjusted)
    // 1 day from query time = 5 minute interval data
    // 1 - 90 days from query time = hourly data
    // above 90 days from query time = daily data (00:00 UTC)
    // 1 Hour = 3600 Seconds
    // 1 Day = 86400 Seconds
    // 1 Week =	604800 Seconds
    // 1 Month (30.44 days) =	2629743 Seconds
    // 1 Year (365.24 days) =	31556926 Seconds

// Shows the analyzed data between given dates
const AnalyzedData = ({newFrom,newTo}) => {
  const [data,setData] = useState(["Waiting for the data..."])
  
  let downwardDays = ""
  let topCourse = ""
  let downStart = ""
  let downEnd = ""
  let sellDay = ""
  let buyDay = ""

  // let today = ""
  let start = ""
  let end = ""

  if (newFrom !== "" && newTo !=="") {  // dates are given in right order

    // today = Date.parse(new Date())/1000
    start = toTimestamp(newFrom,'start')-86400 // takes also the value from the date one day earlier than begin date
    end = toTimestamp(newTo,'end')+3600        // from the given hints added one hour

    if (data[0] !== "Waiting for the data..."){ // data is ready for analyzing

      let feedback = dataAnalyzer(start,end,data)

      downwardDays = feedback[0]
      topCourse = feedback[1]
      downStart = feedback[2]
      downEnd = feedback[3]
      sellDay = feedback[4]
      buyDay = feedback[5]
    }
  } 
   
  useEffect(()=>{   
    async function fetchData(){ // if there are change in dates, new data will be fetched
      if (start !== "" && end !== ""){
        try {
          let result = await axios(
            'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+start+'&to='+end
          )
          // console.log('Result: ',result)
          setData(result.data.prices)
        } catch (exception) {
          console.log(exception)
        }
      } else {
        console.log("Dates are not yet given!")
      }
    }
      
  fetchData();

  },[start,end])

    return (
        (newFrom !== "") && (newTo !== "")
        ? // if the dates are given
        <form>
          ANALYZED DATA<br/>
          {/*Between {newFrom} and {newTo}<br/>*/}
          Longest bearish trend in days: {downwardDays} <br/>
          From: {downStart} <br/>
          To: {downEnd} <br/>
          Highest trading volume: {topCourse} <br/>
          Best day for buying: {buyDay} <br/>
          Best day for selling: {sellDay}
        </form>
        : // no dates
        <form>ANALYZED DATA</form>
    )
}
export default AnalyzedData;