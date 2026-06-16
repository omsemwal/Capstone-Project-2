import React from 'react'
import {Line} from 'react-chartjs-2';import {Col,Row,Typography} from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as tt,
  Tooltip,
  Legend,
  Filler
}from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  tt,
  Tooltip,
  Legend,
  Filler
);
const {Title}=Typography;
const Chart = ({coin, change, currentPrice, coinName}) => {
  console.log("coin",coin);
  const sortedCoin = coin ? [...coin].sort((a, b) => a.timestamp - b.timestamp) : [];

  const options={
    responsive:true,
    plugins:{
      legend:{
        position:'top',
      },title:{
        display:true,
        text:`${coinName} Price History`,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    }
  };
  const data={
    labels:sortedCoin.map(({timestamp})=>{
      const t = Number(timestamp);
      const date = new Date(t < 10000000000 ? t * 1000 : t);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }),
    datasets:[
      {
        label:`Price in USD`,
        data:sortedCoin.map(({price})=>price),
        borderColor:'#00d4ff',
        backgroundColor:'rgba(0, 212, 255, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  }
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change" style={{ color: change >= 0 ? '#3f8600' : '#cf1322' }}>Change: {change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      {coin?<Line options={options} data={data}/>:null}
    </>
  )
}

export default Chart