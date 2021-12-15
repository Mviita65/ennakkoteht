import React, { useState } from 'react'

const InputData = () => {

    const [newFrom, setNewFrom] = useState("");
    const [newTo, setNewTo] = useState("");
    const minDate = "2010-07-18" // bitcoin euro history according to currencies.zone
    const maxDate = new Date().toISOString().slice(0,10) // today yyyy-mm-dd
    const [info, setInfo] = useState("Waiting for the dates")

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

    return (
        <>
          INPUT DATA<br/>
          Historical dates to inspect<br/>
          From: <input type="date" max={maxDate} min={minDate}
           onChange={e => {(newTo === "")
                ? setNewFrom(e.target.value)
                : (e.target.value > newTo) 
                    ? inputErrorFrom()
                    : inputNewFromOk(e) } } 
           value={newFrom} required /><br/>
          To: <input type="date" max={maxDate} min={minDate} 
            onChange={e => {(e.target.value < newFrom) 
                ? inputErrorTo()
                : inputNewToOk(e)} }
            value={newTo} required /><br/>
          <p>Info: <br/>{info}</p>
        </>
        
    )
}
export default InputData;