import React,{useEffect, useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailQuery } from '../Services/cryptoApi';
import { useGetCryptoDataQuery } from '../Services/cryptoApi';
import millify from 'millify';
import {Col,Row,Typography,Select,Input} from 'antd';
import Chart from './Chart';
const {Title,Text}=Typography;
const {Option} = Select;
const Detail = () => {
  const {coinId}=useParams();
  const [tim,setTime]=useState('7d');
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const{data,isFetching}=useGetCryptoDetailQuery(coinId);
 
  const res=useGetCryptoDataQuery({coinId,tim});
  const Val=res?.data;

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('crypto_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const isFav = favorites.includes(coinId);

  const toggleFavorite = () => {
    let updated;
    if (isFav) {
      updated = favorites.filter(id => id !== coinId);
    } else {
      updated = [...favorites, coinId];
    }
    setFavorites(updated);
    localStorage.setItem('crypto_favorites', JSON.stringify(updated));
  };

  const Details=data?.data?.coin;

  const [coinAmount, setCoinAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    if (Details?.price) {
      const rates = {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.78,
        INR: 83.0
      };
      const price = Number(Details.price);
      const rate = rates[targetCurrency] || 1.0;
      setConvertedValue(coinAmount * price * rate);
    }
  }, [coinAmount, targetCurrency, Details]);
  const stats = [
    { title: 'Price to USD', value: `$ ${Details?.price && millify(Details?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: Details?.rank, icon: <NumberOutlined /> },    { title: 'Market Cap', value: `$ ${Details?.marketCap && millify(Details?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${Details?.allTimeHigh?.price && millify(Details?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: Details?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: Details?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: Details?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${Details?.supply?.total && millify(Details?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${Details?.supply?.circulating && millify(Details?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  if(isFetching || !Details){
    return (
      <div style={{ padding: '24px' }}>
        <div className="skeleton-card" style={{ height: '100px', marginBottom: '20px' }} />
        <div className="skeleton-card" style={{ height: '350px', marginBottom: '20px' }} />
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div className="skeleton-card" style={{ height: '250px' }} />
          </Col>
          <Col xs={24} md={12}>
            <div className="skeleton-card" style={{ height: '250px' }} />
          </Col>
        </Row>
      </div>
    );
  }
  

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className="coin-name" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
         {Details?.name} ({Details?.symbol}) Price
         <span onClick={toggleFavorite} style={{ cursor: 'pointer', color: '#ffb700', fontSize: '24px', display: 'flex' }}>
           {isFav ? <StarFilled /> : <StarOutlined />}
         </span>
        </Title>
        <p>{Details?.name} live price in US dollars.
        View value statistics, market cap and supply</p>
      </Col>
      <Select defaultValue="7d" className='select-timerperiod'
      onChange={(val)=>setTime(val)}
      >
        {time.map((op)=>(<Option key={op}>{op}</Option>))}
      </Select>
      {Val?.data?.history ? (
        <Chart coin={Val?.data?.history} change={Val?.data?.change} currentPrice={millify(Details.price)} coinName={Details.name}/>
      ) : (
        <div className="skeleton-card" style={{ height: '350px', margin: '20px 0' }} />
      )}
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className='coin-details-heading'>
                {Details.name} Value Statistic
              </Title>
              <p>
                An overview showing the stats of {Details.name}
              </p>
            {stats.map(({icon,title,value},index)=>(
              <Col className='coin-stats ' key={index}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}</Col>
            <Col className='other-stats-info'>
              <Title level={3} className='coin-details-heading'>
                {Details.name} Statistic
              </Title>
            {genericStats.map(({icon,title,value},index)=>(
              <Col className='coin-stats' key={index}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}</Col>
        </Col>
      </Col>
      <Col className="converter-container" style={{ margin: '40px 0', padding: '24px', background: '#1a1f2e', borderRadius: '12px', border: '1px solid #434343' }}>
        <Title level={3} className="coin-details-heading" style={{ textAlign: 'center', marginBottom: '20px', marginTop: 0 }}>
          {Details?.name} Currency Converter
        </Title>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col xs={24} sm={10}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Amount of {Details?.symbol}</Text>
              <Input 
                type="number" 
                value={coinAmount} 
                onChange={(e) => setCoinAmount(e.target.value)} 
                placeholder={`Enter ${Details?.symbol} amount`}
                prefix={<span style={{ color: '#00d4ff', fontWeight: 'bold' }}>{Details?.symbol}</span>}
                style={{ background: '#0f1419', color: 'white', border: '1px solid #434343' }}
              />
            </div>
          </Col>
          <Col xs={24} sm={4} style={{ textAlign: 'center', fontSize: '28px', color: '#00d4ff', paddingHeight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            ⇌
          </Col>
          <Col xs={24} sm={10}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Value in Fiat</Text>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input 
                  value={convertedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} 
                  disabled 
                  style={{ background: '#0f1419', color: '#00d4ff', border: '1px solid #434343', fontWeight: 'bold' }}
                />
                <Select value={targetCurrency} onChange={(val) => setTargetCurrency(val)} style={{ width: '90px' }}>
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="GBP">GBP</Option>
                  <Option value="INR">INR</Option>
                </Select>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>What is {Details.name}?</Title>
          <div>
            {Details.description ? HTMLReactParser(Details.description) : "No description available."}
          </div>
        </Row>
        <Col className="coin-links">
          <Title level={3} className='coin-details-heading'>{Details.name} Links</Title>
          {Details.links.map((link)=>(
            <Row className='coin-link' key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default Detail