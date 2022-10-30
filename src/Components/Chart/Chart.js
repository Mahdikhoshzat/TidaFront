import React, { useEffect, useState } from 'react';
import ReactHighcharts from "react-highcharts";
import axios from "axios"
import "./chart.css"

const Chart = () => {
  const [data,setData] = useState([])
  const [titles,setTitles] = useState([])
  const [counts,setCounts] = useState([])
  const [showOption,setShowOption] = useState("Count")


  useEffect(() => {
    axios.get('api.json').then((response) => {

      let dataArray = []
      dataArray = response.data.map((item) => {
        return(
          [...dataArray,item]
        )
      })
      let info = []
      for (let index = 0; index < dataArray.length; index++) {
        info.push(dataArray[index][0])
      }
      setData(info);


      let titles1 = []
      for (let index = 0; index < info.length; index++) {
        titles1.push(info[index]["title"])
      }
      setTitles(titles1)


      let counts1 = []
      for (let index = 0; index < info.length; index++) {
        counts1.push(info[index]["count"])
      }
      setCounts(counts1)      
    })
  },[])

  const ColumnChart = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'My chart'
      },
      xAxis: {
        labels: {
          enabled: true,
          formatter: function() { return data[this.value]["title"];},
      },
      },
      series: [
        {
          data: counts
        }
      ]
    };
  const showOptionHandler = (e) => {
    setShowOption(e.target.value)
  }

  
  return (
    <>
      <ReactHighcharts
      config={ColumnChart}
    />
    <div className='footer'>
    <select onChange={showOptionHandler}>
      {titles.map((item) => {
        return(
          <option key={item} >{item}</option>
        )
      })}
    </select>
    <p>{showOption}</p>
    </div>
    
    </>
  )
}



export default Chart


