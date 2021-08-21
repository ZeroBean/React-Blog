import React from 'react'
import {Row,Col,Menu,Affix} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import './navbar.css'
export default function Navbar() {
    const history = useHistory()
    const logoClick = ()=>{
        history.push("/")
    }
    return (
        <Affix>
            <div className="navbar">
                <Row>
                    <Col span={8} >
                        <div className="logo" onClick={logoClick}>
                            ZZN BLOG
                        </div>
                    </Col>
                    <Col span={16} >
                        <Menu mode="horizontal" style={{border:'none'}}>
                            <Menu.Item key="home" className="navItem">
                                <Link to="/" >首页</Link>
                            </Menu.Item>
                            <Menu.Item key="timeAix" className="navItem">
                                <Link to="/timeline" >归档</Link>
                            </Menu.Item>
                            <Menu.Item key="about" className="navItem">
                                <Link to="/about" >关于</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        </Affix>
    )
}
