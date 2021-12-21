import React, { useState,useEffect } from 'react'
import { toTimestamp } from './helpers'
import axios from 'axios';

// Coingecko API:
// Data granularity is automatic (cannot be adjusted)
// 1 day from query time = 5 minute interval data
// 1 - 90 days from query time = hourly data
// above 90 days from query time = daily data (00:00 UTC)
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=1279407600&to=1609376400


const AnalyzedData = ({newFrom,newTo}) => {
  const [data,setData] = useState(["Waiting for the data..."])
  let start = ""
  let end = ""

  if (newFrom !== "" && newTo !=="") {
    start = toTimestamp(newFrom,'start')
    end = toTimestamp(newTo,'end')
    console.log(newFrom,' 00:00:00 GMT+0000 =', start)
    console.log(newTo,' 01:00:00 GMT+0000 =', end)
  }
   
  useEffect(()=>{
    async function fetchData(){
      if (start !== "" && end!==""){
        let result = await axios('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+start+'&to='+end)
        console.log('Result: ',result)
        setData(result.data.prices)
      } else {
        console.log("Dates not yet given!")
      }
    }
      
  fetchData();

  },[start,end])

  console.log("Here is the data: ",data)

    return (
        (newFrom !== "") && (newTo !== "")
        ?
        <form>
          ANALYZED DATA<br/>
          Between {newFrom} and {newTo}<br/>
          Longest bearish trend in days:<br/>
          From:<br/>
          To:<br/>
          Highest trading volume:<br/>
          Best day for buying:<br/>
          Best day for selling:
        </form>
        :
        <form>ANALYZED DATA</form>
    )
}
export default AnalyzedData;