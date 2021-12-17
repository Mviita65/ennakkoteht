import { toTimestamp } from './helpers'
import axios from 'axios';

const AnalyzedData = ({newFrom,newTo}) => {

  if (newFrom !== "" && newTo !=="") {
    let start = toTimestamp(newFrom,'start')
    let end = toTimestamp(newTo,'end')
    console.log(start)
    console.log(end)
  }
  
  // https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=1279407600&to=1609376400

    return (
        (newFrom !== "") && (newTo !== "")
        ?
        <form>
          ANALYZED DATA<br/>
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