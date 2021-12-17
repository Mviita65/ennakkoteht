import React, { useState,useEffect } from 'react'

const InputData = ({newFrom,setNewFrom,newTo,setNewTo}) => {

    // const [newFrom, setNewFrom] = useState("")
    // const [newTo, setNewTo] = useState("")
    const minDate = "2013-04-28" // first date for bitcoin eur in getcoin
    const maxDate = new Date().toISOString().slice(0,10) // today yyyy-mm-dd
    const [info, setInfo] = useState("Waiting for the dates")

    const datesPassed = () => {
        if (info !== "Dates passed!") {        
            console.log("must wait for the correct dates")
        }
    }

    const inputErrorFrom = () => {
        setInfo("fromDate must be earlier than toDate")
        setNewFrom("")
    }

    const inputErrorTo = () => {
        setInfo("toDate must be later than fromDate")
        setNewTo("")
    }

    const inputNewToOk = (e) => {
        setInfo("Dates passed!")
        setNewTo(e.target.value)
    }

    const inputNewFromOk = (e) => {
        setInfo("Dates passed!")
        setNewFrom(e.target.value)
    }

    useEffect(datesPassed, [info,newFrom,newTo])

    return (
        <>
          INPUT DATA<br/>
          Historical dates to inspect<br/>
          From: <input type="date" max={maxDate} min={minDate}
           onChange={e => {(newTo === "")
                ? setNewFrom(e.target.value) // newTo date is not yet given
                : (e.target.value > newTo)   
                    ? inputErrorFrom()       // if newFrom date is later than given newTo
                    : inputNewFromOk(e) } }  // dates are in correct order
           value={newFrom} required /><br/>
          To: <input type="date" max={maxDate} min={minDate} 
            onChange={e => {(newFrom === "")
                ? setNewTo(e.target.value)  // newFrom date is not yet given
                : (e.target.value < newFrom) 
                    ? inputErrorTo()        // if newTo date is earlier than given newFrom
                    : inputNewToOk(e)} }    // dates are in correct order
            value={newTo} required /><br/>
          <p>Info: <br/>{info}</p>
        </>
        
    )
}
export default InputData;