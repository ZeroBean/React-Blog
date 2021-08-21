import React,{useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {actions as tagActions} from '../../store/reducers/tagReducer'
import {actions as catActions} from '../../store/reducers/catReducer'
import {actions as getArticleActions} from '../../store/reducers/articleListReducer'
import { Table, Tag, Space,Row,Col,Select,Button,Popconfirm,message } from 'antd'
const { Column } = Table;


const {get_all_tags} = tagActions
const {get_all_cats} = catActions
const {get_article_list,edit_article,delete_article} = getArticleActions


export default function ArticleList() {
    const history = useHistory()
    // const defaultState = ["草稿","发布"]
    const dispatch = useDispatch()
    const msg = useSelector(state=>state.rootReducer.msg.content)
    const articleList = useSelector(state=>state.articleListReducer.articleList)
    const pageNum = useSelector(state=>state.articleListReducer.pageNum)
    const total = useSelector(state=>state.articleListReducer.total)
    
    const pagenationProps = {
        total:total,
        pageSize: 5,
        current:pageNum,
        onChange:(pageNum)=>{
            dispatch(get_article_list(pageNum))
        }
    }

    const [selectState,setSelectState] = useState("")

    const handleTypeChange = (value)=>{
        console.log(value)
        setSelectState(value)
    }


    const handleSubmit = ()=>{
        const params = {
            state: selectState ? selectState : '',
        }
        console.log(params)
        dispatch(get_article_list(pageNum,params))
    }

    const handleClear = ()=>{
        setSelectState("")
        dispatch(get_article_list())
    }

    const handleEdit = (record)=>{
        console.log(record)
        dispatch(edit_article(record._id))
        history.push(`/index/editArticle`)
    }

    const handleCancel = (e)=>{
        console.log(e)
        message.error("取消")
    }

    const handleConfirm = (record,e)=>{
        console.log(record)
        dispatch(delete_article(record._id))
        message.error(msg)
    }

    useEffect(()=>{
        dispatch(get_all_tags())
        dispatch(get_all_cats())
        dispatch(get_article_list())
    },[dispatch])

    return (
        <div>
            <Row gutter={6}>
                <Col>
                    <Select
                        style={{width:200,marginBottom:20,marginLeft:10}}
                        placeholder="选择发布状态"
                        value={selectState}
                        onChange={handleTypeChange}
                    >
                        <Select.Option value="0">草稿</Select.Option>
                        <Select.Option value="1">发布</Select.Option>
                    </Select>
                </Col>
                <Col>
                    <Button type="primary" onClick={handleSubmit}>搜索</Button>
                </Col>
                <Col>
                    <Button onClick={handleClear}>重置</Button>
                </Col>
            </Row>
            <Table 
                dataSource={articleList} 
                rowKey={record=>record._id} 
                bordered
                pagination={pagenationProps}
            >
                <Column title="文章标题" dataIndex="title" key="title" />
                <Column title="作者" dataIndex="author" key="author" />
                <Column title="文章简介" dataIndex="desc" key="desc" />
                <Column
                    title="标签"
                    dataIndex="tags"
                    key="tags"
                    render={tags => (
                        <>
                        {tags.map(tag => (
                            <Tag color="blue" key={tag._id}>
                            {tag.name}
                            </Tag>
                        ))}
                        </>
                    )}
                />
                <Column 
                    title="分类" 
                    dataIndex="category" 
                    key="category"
                    render={category => (
                        <>
                        {category.map(item => (
                            <Tag color="blue" key={item._id}>
                            {item.name}
                            </Tag>
                        ))}
                        </>
                    )}
                 />
                <Column title="发布状态" dataIndex="state" key="state" 
                    render = {state=>(
                        <>
                            {
                                state 
                                    ? <Tag color="green" key={state}>已发布</Tag> 
                                    : <Tag color="yellow" key={state}>未发布</Tag>
                            }
                        </>
                    )}
                />
                <Column title="发布时间" dataIndex="create_time" key="create_time" />
                <Column
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={()=>{handleEdit(record)}}>编辑</Button>
                            <Popconfirm
                                title="确定要删除该文章？"
                                onConfirm={()=>handleConfirm(record)}
                                onCancel={handleCancel}
                                okText="删除"
                                cancelText="取消"
                            >
                                <Button danger>删除</Button>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}
