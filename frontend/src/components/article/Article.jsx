import './article.css'
import { Card,Row,Col,Tag,Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { useState,useEffect, useRef, useCallback } from 'react'
import { formatTime } from '../../utils'
import _ from 'lodash'
export default function Article({articles,count,setCount,setPageNum,pageNum}) {
    const bottomRef = useRef()
    const history = useHistory()
    const handleClick = (id)=>{
        history.push(`/detail/${id}`)
    }

    const scrollhandler = useCallback(()=>{
        const rect = bottomRef.current?.getBoundingClientRect()
        const clientHeight = document.body.clientHeight
        // console.log(rect.top - clientHeight)
        if(rect?.top<clientHeight && articles.length<count){

            setPageNum((prev)=>{return prev + 1})
        }else{
            
            return
        }
    },[articles,count,setPageNum,setCount])
    
    let debouncedFn = _.debounce(scrollhandler,300)

    useEffect(()=>{
        document.addEventListener("scroll",debouncedFn)
        return ()=>{
            document.removeEventListener("scroll",debouncedFn)
        }
    },[debouncedFn])

    return (
        <>
            <div className="article">
                {
                    articles.map((item,index)=>(
                        <Card
                            hoverable
                            className="article-card"
                            onClick={()=>handleClick(item._id)}
                            key={index}
                        >
                            <Row gutter={[16,16]}>
                                <Col xs={12} sm={12} md={8} lg={8}>
                                    <div className="article-img-wrapper">
                                        <img src={item.img_url} alt="" className="article-img"/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={16} lg={16}>
                                    <Row gutter={[0,12]} justify="space-between">
                                        
                                        <Col span={24}>
                                            <h1>
                                                {item.title}
                                            </h1>

                                        </Col>
                                        <Col span={24}>
                                            <p>
                                                {item.desc}
                                            </p>
                                        </Col>
                                        <Col span={24}>
                                            {
                                                item?.tags && item.tags.map((tag)=>(
                                                    <Tag key={tag.name}>{tag.name}</Tag>
                                                ))
                                            }
                                        </Col>
                                        <Col span={24}>
                                            <Row justify="space-between">
                                                <Col>{item.meta?.views}次阅读</Col>
                                                <Col>{formatTime(item.create_time)}</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    ))
                }
            </div>
            <div ref={bottomRef} className="article-bottom">
                已经到底拉~~~
            </div>
        </>
    )
}
