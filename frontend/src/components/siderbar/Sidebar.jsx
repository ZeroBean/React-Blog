import './sidebar.css'
import { Avatar,Divider,Card,Tag,Space } from 'antd'
import {GithubOutlined,MailOutlined,WechatOutlined,QqOutlined} from '@ant-design/icons'
import { getTags } from '../../apiCalls'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({tags,setTag_id,setCategory_id,setPageNum}) {
    // console.log(tags)

    return (
        <div className='sidebar'>
            <div className="about">
                <Avatar
                    size={{xs:24,sm:32,md:64,lg:80,xl:100}}
                    className="about-avatar"
                />
                <div className="about-desc">
                    <p>
                        前端小菜鸡一枚，在这里你可以见证一个菜鸡到高手的全过程
                    </p>
                </div>
                <Divider orientation="center">
                    社交账户
                </Divider>
                <div className="about-icons">
                    <GithubOutlined className="icon-item"/>
                    <MailOutlined className="icon-item"/>
                    <WechatOutlined className="icon-item"/>
                    <QqOutlined className="icon-item"/>
                </div>
            </div>
            <div className="tag">
                <Card title="标签" bordered={false} style={{borderRadius:'10px'}}>
                    <Space size={[8,16]} wrap>
                        {
                            tags && tags.map((item)=>(
                                <Tag 
                                    key={item._id}
                                    style={{cursor:"pointer"}} 
                                    onClick={()=>{
                                        setCategory_id("")
                                        setPageNum(1)
                                        setTag_id(item._id)
                                    }}
                                >
                                    {item.name}
                                </Tag>
                            ))
                        }
                    </Space>
                </Card>
            </div>
        </div>
    )
}
