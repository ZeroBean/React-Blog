import React,{useEffect, useState} from 'react'

import Navbar from '../../components/navbar/Navbar';
import './home.css'
import Main from '../../components/main/Main';
import Footer from '../../components/footer/Footer'
import { BackTop } from 'antd';
import {VerticalAlignTopOutlined} from '@ant-design/icons'
import '../../global.css'
export default function Home() {
    const style = {
        height: 40,
        with:40,
        lineHeight: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,.45)',
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
    }

    return (
        <div className="home">
            <Navbar/>
            <Main/>
            <Footer/>
            <BackTop>
                <div style={style}>
                    <VerticalAlignTopOutlined />
                </div>
            </BackTop>
        </div>
    )
}
