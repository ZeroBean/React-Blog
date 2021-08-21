import { Card } from 'antd'
import './about.css'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

export default function About() {
    return (
        <div className="aboutMe">
            <Navbar/>
            <div className="aboutMe-content">
                <Card title="关于这个博客">
                    <div className="aboutMe-title">Why</div>
                    <p>俗话说”实践出真知“，在我学习前端的过程中，一直想做点什么来检验自己的学习成果，同时记录自己的一些学习经验和心得，于是我决定做一个前后端分类的博客系统，前台后台数据库一手包揽，尽管过程磕磕碰碰，目前也还有很多不足的地方，但是，这是一次收获良多的尝试，后续我也会不断学习，进一步完善目前系统的不足。</p>
                    <div className="aboutMe-title">How</div>
                    <p>前台：React/React Hook/Antd UI</p>
                    <p>后台：Redux/React-Redux/Antd UI</p>
                    <p>后端：Node/Express</p>
                    <p>数据库：MongoDB/Mongoose</p>
                    <div className="aboutMe-title">Next</div>
                    <p>1.完善响应式布局</p>
                    <p>2.增加留言系统</p>
                    <p>3.增加项目模块</p>
                </Card>
            </div>
            <Footer/>
        </div>
    )
}
