import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../Services/cryptoApi';
import Crypto from '../Component/Crypto';
import News from './News';
const Home=()=>{
  const {data,isFetching}=useGetCryptosQuery(10);
  if(isFetching){
    return (
      <div style={{ padding: '20px' }}>
        <Row gutter={[12,12]} style={{ marginLeft: "10px" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Col span={12} key={i}>
              <div className="skeleton-card" style={{ height: '90px' }} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
  const globalStats=data?.data?.stats;
  console.log("ff",data);
  return <>
    <Typography.Title level={2} className='heading' style={{marginLeft:"10px",textAlign:"center"}}>Global Crypto Stats</Typography.Title>
    <Row gutter={[12,12]} style={{marginLeft:"10px"}}>
      <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
      <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
      <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
      <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
      <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets) } /></Col>
    </Row>
     <Crypto simp="val"/>
     <Typography.Title level={3} className='show-more'>
      <Link to="/crypto"> show more</Link>
    </Typography.Title>
    <News simp="a"/>
    <div className="home-heading-container">
    </div>
  </>
}
export default Home;