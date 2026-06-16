import React, { useState } from 'react';
import { useGetCryptosQuery, useGetCryptoDetailQuery, useGetCryptoDataQuery } from '../Services/cryptoApi';
import { Row, Col, Select, Card, Typography, Spin, Table } from 'antd';
import { Line } from 'react-chartjs-2';
import millify from 'millify';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const { Option } = Select;

const Compare = () => {
  const [coin1Id, setCoin1Id] = useState('');
  const [coin2Id, setCoin2Id] = useState('');
  const [timePeriod, setTimePeriod] = useState('7d');

  const { data: cryptosList, isFetching: isCryptosFetching } = useGetCryptosQuery(100);

  const { data: coin1Detail, isFetching: isCoin1Fetching } = useGetCryptoDetailQuery(coin1Id, { skip: !coin1Id });
  const { data: coin2Detail, isFetching: isCoin2Fetching } = useGetCryptoDetailQuery(coin2Id, { skip: !coin2Id });

  const { data: coin1History, isFetching: isHistory1Fetching } = useGetCryptoDataQuery({ coinId: coin1Id, tim: timePeriod }, { skip: !coin1Id });
  const { data: coin2History, isFetching: isHistory2Fetching } = useGetCryptoDataQuery({ coinId: coin2Id, tim: timePeriod }, { skip: !coin2Id });

  const coins = cryptosList?.data?.coins || [];

  const coin1 = coin1Detail?.data?.coin;
  const coin2 = coin2Detail?.data?.coin;

  // Let's create an overlaid chart
  let chartData = null;
  if (coin1History?.data?.history && coin2History?.data?.history) {
    // Sort chronologically
    const history1 = [...coin1History.data.history].sort((a, b) => a.timestamp - b.timestamp);
    const history2 = [...coin2History.data.history].sort((a, b) => a.timestamp - b.timestamp);

    // X-axis: we can map the timestamps from whichever is longer or standard
    const labels = history1.map(({ timestamp }) => {
      const t = Number(timestamp);
      const date = new Date(t < 10000000000 ? t * 1000 : t);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    });

    chartData = {
      labels,
      datasets: [
        {
          label: `${coin1?.name || 'Coin 1'} Price (USD)`,
          data: history1.map(({ price }) => price),
          borderColor: '#00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          fill: true,
          tension: 0.1,
        },
        {
          label: `${coin2?.name || 'Coin 2'} Price (USD)`,
          data: history2.map(({ price }) => price),
          borderColor: '#ffb700',
          backgroundColor: 'rgba(255, 183, 0, 0.1)',
          fill: true,
          tension: 0.1,
        }
      ]
    };
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: `Price Comparison (${timePeriod})`,
        color: 'white'
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      }
    }
  };

  const columns = [
    { title: 'Metric', dataIndex: 'metric', key: 'metric' },
    { title: coin1?.name || 'Coin 1', dataIndex: 'coin1', key: 'coin1' },
    { title: coin2?.name || 'Coin 2', dataIndex: 'coin2', key: 'coin2' }
  ];

  const tableData = [
    { key: '1', metric: 'Price (USD)', coin1: coin1 ? `$${millify(coin1.price)}` : '-', coin2: coin2 ? `$${millify(coin2.price)}` : '-' },
    { key: '2', metric: 'Market Cap', coin1: coin1 ? `$${millify(coin1.marketCap)}` : '-', coin2: coin2 ? `$${millify(coin2.marketCap)}` : '-' },
    { key: '3', metric: '24h Volume', coin1: coin1 ? `$${millify(coin1['24hVolume'] || coin1.volume || 0)}` : '-', coin2: coin2 ? `$${millify(coin2['24hVolume'] || coin2.volume || 0)}` : '-' },
    { key: '4', metric: 'Daily Change', coin1: coin1 ? `${coin1.change}%` : '-', coin2: coin2 ? `${coin2.change}%` : '-' },
    { key: '5', metric: 'Approved Supply', coin1: coin1 ? (coin1.supply?.confirmed ? 'Yes' : 'No') : '-', coin2: coin2 ? (coin2.supply?.confirmed ? 'Yes' : 'No') : '-' },
    { key: '6', metric: 'Circulating Supply', coin1: coin1 ? millify(coin1.supply?.circulating || 0) : '-', coin2: coin2 ? millify(coin2.supply?.circulating || 0) : '-' },
    { key: '7', metric: 'Number of Markets', coin1: coin1 ? coin1.numberOfMarkets : '-', coin2: coin2 ? coin2.numberOfMarkets : '-' },
    { key: '8', metric: 'Number of Exchanges', coin1: coin1 ? coin1.numberOfExchanges : '-', coin2: coin2 ? coin2.numberOfExchanges : '-' }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
        Compare Cryptocurrencies
      </Typography.Title>
      
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '30px' }}>
        <Col xs={24} sm={7}>
          <Typography.Text style={{ color: 'white', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Coin 1</Typography.Text>
          <Select
            showSearch
            placeholder="Select first coin"
            optionFilterProp="children"
            style={{ width: '100%' }}
            onChange={(val) => setCoin1Id(val)}
            value={coin1Id || undefined}
            loading={isCryptosFetching}
          >
            {coins.map((coin) => (
              <Option key={coin.uuid} value={coin.uuid}>
                {coin.name} ({coin.symbol})
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={7}>
          <Typography.Text style={{ color: 'white', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Coin 2</Typography.Text>
          <Select
            showSearch
            placeholder="Select second coin"
            optionFilterProp="children"
            style={{ width: '100%' }}
            onChange={(val) => setCoin2Id(val)}
            value={coin2Id || undefined}
            loading={isCryptosFetching}
          >
            {coins.map((coin) => (
              <Option key={coin.uuid} value={coin.uuid}>
                {coin.name} ({coin.symbol})
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={4}>
          <Typography.Text style={{ color: 'white', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Time Period</Typography.Text>
          <Select
            style={{ width: '100%' }}
            value={timePeriod}
            onChange={(val) => setTimePeriod(val)}
          >
            {['3h', '24h', '7d', '30d', '1y', '3y', '5y'].map((p) => (
              <Option key={p} value={p}>{p}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      {isCoin1Fetching || isCoin2Fetching || isHistory1Fetching || isHistory2Fetching ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {coin1 && coin2 && (
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={14}>
                <Card style={{ background: '#1a1f2e', border: '1px solid #434343', borderRadius: '12px' }}>
                  {chartData ? <Line data={chartData} options={chartOptions} /> : <div style={{ color: 'white', textAlign: 'center' }}>No chart history available.</div>}
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card style={{ background: '#1a1f2e', border: '1px solid #434343', borderRadius: '12px', overflow: 'hidden' }}>
                  <Table 
                    columns={columns} 
                    dataSource={tableData} 
                    pagination={false} 
                    size="middle"
                    className="compare-table"
                  />
                </Card>
              </Col>
            </Row>
          )}
          {(!coin1 || !coin2) && (
            <div style={{ textAlign: 'center', marginTop: '50px', padding: '40px', background: '#1a1f2e', borderRadius: '12px', border: '1px solid #434343' }}>
              <Typography.Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Please select both cryptocurrencies to compare their statistics and overlaid price charts side-by-side.
              </Typography.Text>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Compare;
