import React from 'react';
import './App.css'
import { Routes,Route,Link} from "react-router-dom";
import { Space } from 'antd';
import NavBar from './Component/NavBar';
import Home from './Component/Home';
import Crypto from './Component/Crypto';
import Detail from './Component/Detail';
import News from './Component/News';
import Compare from './Component/Compare';

export const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
            <NavBar/>
        </div>
        <div className='main'>
                <div>
                <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/crypto" element={<Crypto simp="sdf"/>}/>
                        <Route path="/compare" element={<Compare/>}/>
                        <Route path="/news" element={<News simp="as"/>}/>
                        <Route path="/crypto/:coinId" element={<Detail/>}/>
                </Routes>
                </div>
            <div className='footer' style={{color:"white"}}>
            <div>
                Cryptoverse All rights reserved
            </div>
            <Space style={{ marginTop: '10px' }}>
                <h5><Link to="/">Home</Link></h5>
                <h5><Link to="/compare">Compare</Link></h5>
                <h5><Link to="/news">News</Link></h5>
            </Space>
        </div>
        </div>
    </div>
  )
}
