import React from 'react';
import { useGetNewsQuery } from '../Services/cryptoNew';
import { Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const demoImgUrl = 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=400&auto=format&fit=crop';
const demoAvatarUrl = 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=80&auto=format&fit=crop';

const News = ({ simp }) => {
  const cnt = (simp === 'a') ? 6 : 12;
  const res = useGetNewsQuery({ cat: 'Cryptocurrency', count: cnt });

  if (res.isFetching || !res.data) {
    return (
      <div style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <div className="skeleton-card" style={{ height: '320px' }} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <>
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', marginBottom: '24px' }}
        className="home-title"
      >
        Trending News
      </Typography.Title>

      <Row gutter={[24, 24]}>
        {res?.data?.value.map((ele, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <a
              href={ele.url}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Card
                hoverable
                bodyStyle={{ padding: 0 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'rgba(26, 31, 46, 0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Cover Image */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={ele?.image?.thumbnail?.contentUrl || demoImgUrl}
                    alt="news"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onError={(e) => { e.target.src = demoImgUrl; }}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    background: 'linear-gradient(to top, rgba(9,13,22,0.9), transparent)',
                  }} />
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
                  {/* Title */}
                  <Title
                    level={5}
                    style={{
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {ele.name}
                  </Title>

                  {/* Provider Row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar
                        src={ele.provider[0]?.image?.thumbnail?.contentUrl || demoAvatarUrl}
                        size={28}
                        style={{ border: '1px solid rgba(0,212,255,0.4)', flexShrink: 0 }}
                      />
                      <Text style={{ color: '#00d4ff', fontWeight: 600, fontSize: '13px' }}>
                        {ele.title || ele.provider[0]?.name}
                      </Text>
                    </div>
                    <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ClockCircleOutlined style={{ fontSize: '11px' }} />
                      {moment(ele.datePublished).fromNow()}
                    </Text>
                  </div>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;