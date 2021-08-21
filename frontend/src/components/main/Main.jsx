import './main.css'
import { Row,Col,Space,Button, Affix} from 'antd'
import { useCallback, useEffect,useState } from 'react'
import Article from '../article/Article'
import Sidebar from '../siderbar/Sidebar'
import { getTags, getCats,getArticles} from '../../apiCalls'
// import _ from 'lodash'

export default function Main() {
    const [count,setCount] = useState(0)
    const [tags,setTags] = useState([])
    const [pageNum,setPageNum] = useState(1)
    const [tag_id,setTag_id] = useState("")
    const [category_id,setCategory_id] = useState("")
    const [category,setCategory] = useState([])

    const [articles,setArticles] = useState([])

    const getAllArticles = useCallback(()=>{
        getArticles(pageNum,category_id,tag_id).then((res,err)=>{
            if(err){
                console.log(err)
            }else{
                if(pageNum !== 1){
                    console.log(res.data)
                    setArticles((prevstate)=>{
                        return prevstate.concat(res.data.data.list)
                    })
                    setCount(res.data.data.count)
                }else{
                    setArticles(res.data.data.list)
                    setCount(res.data.data.count)
                }
            }
        })
    },[category_id,tag_id,pageNum])
    
    useEffect(()=>{
        getTags().then((res,err)=>{
            if(err){
                console.log(err)
            }else{
                // console.log(res.data)
                setTags(res.data.data)
            }
        })
        getCats().then((res,err)=>{
            if(err){
                console.log(err)
            }else{
                setCategory(res.data.data)
            }
        })
        getAllArticles()
    },[getAllArticles])
    console.log("count")
    return (
        <div className="main">
            <div className="main-centerImg">
                <img src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/>
            </div>
            
            <div className="main-center">
                    <div className="subNav">
                        <Space>
                            <Button shape="round" 
                                onClick={()=>{
                                    setCategory_id("")
                                    setTag_id("")
                                    setPageNum(1)
                                }}
                            >
                                全部
                            </Button>
                            {
                                category.map(cat=>(
                                    <Button 
                                        shape="round" 
                                        key={cat._id} 
                                        onClick={()=>{
                                            setTag_id("")
                                            setPageNum(1)
                                            setCategory_id(cat._id)
                                        }}
                                    >
                                        {cat.name}
                                    </Button>
                                ))
                            }
                        </Space>
                    </div>
                <Row justify="space-around" style={{marginTop:"1rem"}}>
                    <Col xs={20} sm={20} md={17} lg={17} >
                        <Article 
                            articles={articles}
                            setPageNum={setPageNum}
                            count={count}
                            setCount={setCount}
                            pageNum={pageNum}
                        />
                    </Col>
                    <Col xs={0} sm={0} md={6} lg={6} style={{marginTop:"1rem"}}>
                        <Affix offsetTop={50}>
                            <Sidebar 
                                tags={tags} 
                                setTag_id={setTag_id} 
                                setCategory_id={setCategory_id} 
                                setPageNum={setPageNum}
                            />
                        </Affix>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
