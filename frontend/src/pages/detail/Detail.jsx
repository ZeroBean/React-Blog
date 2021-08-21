import { useRouteMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Row,Col, Space, Affix} from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/base16/railscasts.css'
import  MarkdowNavbar from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import '../../global.css'
import './detail.css'
import style from './markdown.module.css'
import Footer from '../../components/footer/Footer'
import { getArticleDetail } from '../../apiCalls'
import { formatTime } from '../../utils'

export default function Detail() {

    const location = useRouteMatch()
    const id = location.params.id

    const [articleDetail,setArticleDetail] = useState({})
    const [markdown,setMarkdown] = useState("")

    useEffect(()=>{

        getArticleDetail(id).then((res,err)=>{
            if(err){
                console.log(err)
            }else{
                setArticleDetail(res.data.data)
                setMarkdown(res.data.data.content)
            }
        })
    },[id])
     
    const renderMD = new marked.Renderer()
        marked.setOptions({
            renderer: renderMD,
            gfm:true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
        })
        marked.setOptions({
            highlight: function (code) {
            return hljs.highlightAuto(code).value;
            }
        });
    const html = marked(markdown)
    console.log(articleDetail)
    return (
        <div className="detail">
            <Navbar/>
            <div className="detail-main">
                <Row justify="space-between">
                    <Col xs={24} sm={24} md={17} xl={17}>
                        <div className="main-content">
                            <img src={articleDetail.img_url} alt="" style={{width:"50%",margin:"1rem 0"}}/>
                            <h1 className="main-content-title">{articleDetail.desc}</h1>
                            <div className="main-content-subTitle">
                                <Space >
                                    <div>
                                        发布于:{formatTime(articleDetail.create_time)}
                                    </div>
                                    <div>阅读量:{articleDetail?.meta?.views}</div>
                                </Space>
                            </div>
                            <div className={style.markdownHereWrapper}>
                                <div className={style.markdownBody} dangerouslySetInnerHTML={{__html:html}}>
                                </div>
                            </div>
                            
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={6} xl={6}>
                        <Affix offsetTop={60}>
                            <div className="navigation">
                                <MarkdowNavbar source={markdown} />
                            </div>
                        </Affix>
                        
                    </Col>
                </Row>
            </div>
            <Footer/>
        </div>
    )
}
