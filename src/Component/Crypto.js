import React,{useState,useEffect} from 'react'
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card,Row,Col,Input,Typography,Button} from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useGetCryptosQuery } from '../Services/cryptoApi';

const Crypto = ({simp}) => {
  const count=simp==="val"?10:100;
  const [crypt,setCrypt]=useState([]);
  const [search,setSearch]=useState("");
  const {data:cryptoList,isFetching}=useGetCryptosQuery(count);
  
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('crypto_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem('crypto_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (uuid, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorites.includes(uuid)) {
      setFavorites(favorites.filter(id => id !== uuid));
    } else {
      setFavorites([...favorites, uuid]);
    }
  };

  useEffect(()=>{
    let filtered = cryptoList?.data?.coins || [];
    if (search) {
      filtered = filtered.filter((coin) => 
        coin.name.toLowerCase().includes(search.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (showFavoritesOnly) {
      filtered = filtered.filter((coin) => favorites.includes(coin.uuid));
    }
    setCrypt(filtered);
  },[cryptoList, search, showFavoritesOnly, favorites]);

  if(isFetching||!crypt){
    return (
      <div style={{ padding: '24px' }}>
        <Row gutter={[32,32]}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <div className="skeleton-card" style={{ height: '180px' }} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
  return (
    <>
        <Typography.Title level={2} style={{textAlign:"center"}} className='home-title'>
          {simp === "val" ? "Top 10 Cryptocurrencies in the world" : "All Cryptocurrencies"}
        </Typography.Title>

      <div className='search-crypto' style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <Input placeholder='search cryptocurrency' 
        onChange={(e)=>{setSearch(e.target.value)}}
        value={search}
        style={{ width: '250px' }}
        />
        {simp !== "val" && (
          <Button 
            type={showFavoritesOnly ? "primary" : "default"} 
            icon={showFavoritesOnly ? <StarFilled style={{ color: '#ffb700' }} /> : <StarOutlined />}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            {showFavoritesOnly ? "Favorites Only" : "Favorites Filter"}
          </Button>
        )}
      </div>
     <Row gutter={[32,32]} className='crypto-card-container'>
        {crypt.map((curr,index)=>(
          <Col key={index} xs={24} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${curr.uuid}`}>
              <Card 
                title={`${curr.rank}. ${curr.name}`} 
                extra={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span onClick={(e) => toggleFavorite(curr.uuid, e)} style={{ fontSize: '18px', cursor: 'pointer', color: '#ffb700', display: 'flex' }}>
                      {favorites.includes(curr.uuid) ? <StarFilled /> : <StarOutlined />}
                    </span>
                    <img src={curr.iconUrl} className='crypto-image' alt={curr.name} />
                  </div>
                } 
                hoverable
              >
                <p>Price: ${millify(curr.price)}</p>
                <p>Market Cap: ${millify(curr.marketCap)}</p>
                <p>Daily Change: <span style={{ color: Number(curr.change) >= 0 ? '#3f8600' : '#cf1322', fontWeight: 'bold' }}>{curr.change}%</span></p>
              </Card>
            </Link>
          </Col>        
      ))}
     </Row>
    </>
  )
}

export default Crypto