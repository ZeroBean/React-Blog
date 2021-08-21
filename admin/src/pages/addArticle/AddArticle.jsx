import React, { useEffect,useMemo } from 'react'
import { Input,Select,Row,Col,Button } from 'antd'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import marked from 'marked'
import SimpleMdeReact from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {actions as tagActions} from '../../store/reducers/tagReducer'
import {actions as catActions} from '../../store/reducers/catReducer'
import {actions as newArticleAction} from '../../store/reducers/newArticleReducer'
//解构获取所有标签和分类的action
const {get_all_tags} = tagActions
const {get_all_cats} = catActions
const {
        update_title,
        update_author,
        update_desc,
        update_imgUrl,
        update_pstate,
        update_category,
        update_content,
        update_tags,
        save_article
} = newArticleAction

//解构选择框选项
const {Option} = Select


export default function AddArticle() {
    const dispatch = useDispatch()
    const tags = useSelector(state=>state.tagReducer)
    const cats = useSelector(state=>state.catReducer)

    //存放选项数据
    let children = []
    tags.length>0 && tags.map((tag)=>{
        children.push(<Option key={tag._id}>{tag.name}</Option>)
        return children
    })

    //设置默认值
    //默认标题
    const title = useSelector(state=>state.newArticleReducer.title)
    //默认作者
    const author = useSelector(state=>state.newArticleReducer.author)
    //默认描述
    const desc = useSelector(state=>state.newArticleReducer.desc)
    const imgUrl = useSelector(state=>state.newArticleReducer.imgUrl)
    const pstate = useSelector(state=>state.newArticleReducer.pstate)
    const defaultTags = useSelector(state=>state.newArticleReducer.tags)
    const category = useSelector(state=>state.newArticleReducer.category)
    const content = useSelector(state=>state.newArticleReducer.content)

    //获取标签
    const [selectTags,setSelectTags] = useState([])


    const defaultState = ["草稿","发布"]


    const handleTitleChange = (e)=>{
        dispatch(update_title(e.target.value))
    }

    const handleAuthorChange = (e)=>{
        dispatch(update_author(e.target.value))
    }

    const handleDescChange = (e)=>{
        dispatch(update_desc(e.target.value))
    }

    const handleImgUrlChange = (e)=>{
        dispatch(update_imgUrl(e.target.value))
    }

    const handleTypeChange = (value)=>{
        console.log(value)
        dispatch(update_pstate(value))
    }

    // const handleTagChange = (value)=>{
    //     const opValue = value.join()
    //     setSelectTags(opValue)
    // }
    const handleCatChange = (value)=>{
        console.log(value);
        dispatch(update_category(value))
    }

    const handleTagChange = (value)=>{
        const opValue = value.join()
        console.log(opValue)
        dispatch(update_tags(value))

    }

    const handleSubmit = ()=>{
        const params = {
            title,
            author,
            desc,
            img_url:imgUrl,
            state:pstate,
            category,
            tags:defaultTags,
            content
        }
        dispatch(save_article(params))
        // console.log("内容",smde.value())
        // console.log("标题",title)
        // console.log("作者",auth)
        // console.log("描述",desc)
        // console.log("封面",imgUrl)
        // console.log("发布状态",pstate)
        // console.log("分类",category)
        // console.log("标签",selectTags)
    }


    useEffect(()=>{
        dispatch(get_all_tags())
        dispatch(get_all_cats())
        console.log(selectTags)
    },[dispatch,selectTags])

    //富文本编译器
  
    const handleMDEChange = (value) => {
      console.log(value)
      dispatch(update_content(value))
    };
    const Options = useMemo(() => {
        return {
          autofocus: true,
          spellChecker: false,
          previewRender(plainText){
              return marked(plainText, {
                  renderer: new marked.Renderer(),
                  gfm: true,
                  pedantic: false,
                  sanitize: false,
                  tables: true,
                  breaks: true,
                  smartLists: true,
                  smartypants: true,
                  highlight:function(code) {
                      return hljs.highlightAuto(code).value;
                  },
              });
          }
        }
      }, []);

    return (
        <div className="addArticle">
            <Input
                addonBefore="标题"
                size="large"
                placeholder="标题"
                name="title"
                value={title}
                style={{marginBottom:20}}
                onChange={handleTitleChange}
            />
            <Input
                addonBefore="作者"
                size="large"
                placeholder="作者"
                name="author"
                value={author}
                style={{marginBottom:20}}
                onChange={handleAuthorChange}
            />
            <Input
                addonBefore="描述"
                size="large"
                placeholder="描述"
                name="desc"
                value={desc}
                style={{marginBottom:20}}
                onChange={handleDescChange}
            />
            <Input
                addonBefore="封面链接"
                size="large"
                placeholder="封面链接"
                name="img_url"
                value={imgUrl}
                style={{marginBottom:20}}
                onChange={handleImgUrlChange}
            />
            <Row gutter={6}>
                <Col>
                    <Select
                        style={{width:200,marginBottom:20}}
                        placeholder="选择发布状态"
                        value={defaultState[pstate]}
                        onChange={handleTypeChange}
                    >
                        <Select.Option value={0}>草稿</Select.Option>
                        <Select.Option value={1}>发布</Select.Option>
                    </Select>
                </Col>
                <Col>
                    <Select
                        style={{width:200,marginBottom:20}}
                        placeholder="选择分类"
                        value={category}
                        onChange={handleCatChange}
                    >
                        {
                            cats.map((item)=>{
                                return (
                                    <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Col>
                <Col>
                    <Select
                        style={{width:400,marginBottom:20}}
                        mode="multiple"
                        allowClear
                        value={defaultTags}
                        placeholder="选择标签"
                        onChange={handleTagChange}
                    >
                        {children}
                    </Select>
                </Col>
            </Row>
            <Button onClick={handleSubmit} style={{marginBottom:20}} type="primary">发布</Button>
            <SimpleMdeReact
                options={Options}
                value={content}
                onChange={handleMDEChange}
            />

        </div>
    )
}
