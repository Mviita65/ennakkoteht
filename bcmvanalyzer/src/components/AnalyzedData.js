import React, { useState,useEffect } from 'react'
import { toTimestamp } from './helpers'
import dataAnalyzer from './dataAnalyzer';
import axios from 'axios';

const AnalyzedData = ({newFrom,newTo}) => {
  const [data,setData] = useState(["Waiting for the data..."])
  const [downwardDays, setDownwardDays] = useState("")
  const [topCourse, setTopCourse] = useState("")
  const [downStart, setDownStart] = useState("")
  const [downEnd, setDownEnd] = useState("")
  const [sellDay,setSellDay] = useState("")
  const [buyDay,setBuyDay] = useState("")

  let today = ""
  let start = ""
  let end = ""

  if (newFrom !== "" && newTo !=="") {
    today = Date.parse(new Date())/1000
    start = toTimestamp(newFrom,'start')
    end = toTimestamp(newTo,'end')
    console.log(newFrom,' 00:00:00 GMT+0000 =', start)
    console.log(newTo,' 01:00:00 GMT+0000 =', end)
    console.log(today)
    dataAnalyzer(start,end,today,data,setDownwardDays,
      setTopCourse,setDownStart,
      setDownEnd,setSellDay,setBuyDay
    )
  } 
   
  useEffect(()=>{
    async function fetchData(){
      if (start !== "" && end !== ""){
        let result = await axios(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+start+'&to='+end
        )
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
          Longest bearish trend in days: {downwardDays} <br/>
          From: {downStart} <br/>
          To: {downEnd} <br/>
          Highest trading volume: {topCourse} <br/>
          Best day for buying: {buyDay} <br/>
          Best day for selling: {sellDay}
        </form>
        :
        <form>ANALYZED DATA</form>
    )
}
export default AnalyzedData;