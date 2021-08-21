import React, { useEffect,useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import {Row,Col, Divider, Timeline} from 'antd'
import { getTimeLine } from '../../apiCalls'
import './timeLine.css'
import { BookOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useHistory } from 'react-router'
import Sidebar from '../../components/siderbar/Sidebar'
import Footer from '../../components/footer/Footer'

export default function TimeLine() {
    const [timeData,setTimeData] = useState([])
    const history = useHistory()
    const [count,setCount] = useState(0)
    const handleTime = (lists)=>{
        let years = []
        lists.forEach(list=>{
            let findYear = years.find(y=>{
                return list.year === y.year
            })
            if(!findYear){
                let node = {
                    year:list.year,
                    child:[]
                }
                years.push(node)
                findYear = node
            }
            let findMonth = findYear.child.find(m=>{
                return list.month === m.month
            })
            if(!findMonth){
                let cnode = {
                    month: list.month,
                    child:[]
                }
                findYear.child.push(cnode)
                findMonth = cnode
            }
            findMonth.child.push(list)
        })
        return years
    }

    const handleTo = (id)=>{
        history.push(`/detail/${id}`)
    }
    useEffect(()=>{
        getTimeLine().then((res,err)=>{
            if(err){
                console.log(err)
            }else{
                // console.log(res.data)
                const time =  handleTime(res.data.data.list)
                console.log(time)
                setCount(res.data.data.count)
                setTimeData(time)
            }
        })
    },[])
    return (
        <div className="timeline">
            <Navbar/>
            <div className="timeline-wrapper">
                <Row justify="space-between">
                    <Col xs={24} sm={24} md={17} xl={17}>
                        <div className="timeline-left">
                            <div className="timeline-header">
                                <BookOutlined style={{fontSize:"30px",margin:"10px 0"}}/>
                                <h1 style={{color:"#007fff"}}>归档</h1>
                                <p>共{count}篇</p>
                                <Divider/>
                            </div>
                            <div className="timeline-content">
                                {
                                    timeData.map((item,index)=>(
                                        <div className="timeline-content-yearItem" key={index}>
                                            <h1>{item.year}</h1>
                                            <div className="timeline-content-monthItem">
                                                {
                                                    item?.child.map((e,index)=>(
                                                        <div className="timeline-content-monthWrapper" key={index}>
                                                            <div className="timeline-content-month">{e.month}月</div>
                                                            {
                                                                e.child.map((t,index)=>(
                                                                    <div 
                                                                        className="timeline-content-dayItem" 
                                                                        onClick={()=>handleTo(t.id)}
                                                                        key={index}
                                                                    >
                                                                        <div className="dayItem-left">{dayjs(t.create_time).format("MM-DD")}</div>
                                                                        <div className="dayItem-right">{t.title}</div>
                                                                    </div>
                                                                    
                                                                ))
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={6} xl={6}>
                        <div className="timeline-right">
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer/>
        </div>
    )
}
