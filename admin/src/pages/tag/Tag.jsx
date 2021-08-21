import { useRef, useState } from 'react'
import { Tag, Input, Tooltip,message} from 'antd';
import './tag.css'
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import {actions} from '../../store/reducers/tagReducer'
const {get_all_tags,add_tag,delete_tag} = actions

export default function ArticleTag() {
    const dispatch = useDispatch()
    const tags = useSelector(state=>state.tagReducer)
    const {msg} = useSelector(state=>state.rootReducer)
    const [inputVisible,setInputVisible] = useState(false)
    const [inputValue,setInputValue] = useState('')
    const [editInputIndex,setEditInputIndex] = useState(-1)
    const [editInputValue,setEditInputValue] = useState('')

    const saveEditInputRef = useRef()
    const editInput = useRef()
    

    const handleEditInputChange = (e)=>{
        setEditInputValue(e.target.value)
    }

    const handleEditInputConfirm = ()=>{

        dispatch(add_tag(editInputValue))
        info(msg)
        setEditInputIndex(-1)
        setEditInputValue('')
    }

    const handleClose = (removeId)=>{
        dispatch(delete_tag(removeId))
    }

    const handleInputChange = (e)=>{
        setInputValue(e.target.value)
    }

    const handleInputConfirm = ()=>{

        //输入不为空，且与前面的不重复
        if(inputValue && tags.indexOf(inputValue)===-1){
            dispatch(add_tag(inputValue))
        }
        setInputVisible(false)
        setInputValue('')
    }

    const showInput = (e)=>{
        console.log(e.target)
        setInputVisible(true)
        // e.target.focus()
    }

    
    const info = (msg) => {
        message.info(msg);
      };

    useEffect(()=>{
        dispatch(get_all_tags())
    },[dispatch])

    useEffect(()=>{
        if(msg.type===0){
            info(msg.content)
        }else if(msg.type===1){
            info(msg.content)

        }
    },[msg])

    return (
        <div className="Tag">
            {
                tags.map((tag,index)=>{
                    if(editInputIndex===index){
                        return (
                            <Input
                                ref={saveEditInputRef}
                                key={tag._id}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        )
                    }

                    const isLongTag = tag.length>20
                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag._id}
                            closable={index!==-1}
                            onClose={()=>{handleClose(tag._id)}}
                        >
                            <span
                                onDoubleClick={e=>{
                                    if(index!==0){
                                        setEditInputIndex(index)
                                        setEditInputValue(tag.name)
                                        // editInput.focus()
                                    }
                                    e.preventDefault()
                                }}
                            >
                                {isLongTag ? `${tag.name.slice(0,20)}...` : tag.name}
                            </span>
                        </Tag>
                    )

                    return isLongTag ? (
                        <Tooltip title={tag.name} key={tag._id}>
                            {tagElem}
                        </Tooltip>
                    ): (
                        tagElem
                    )
                })
            }
            {inputVisible && (
                <Input
                    ref={editInput}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined/> New Tag
                </Tag>
            )}
        </div>
    )
}
