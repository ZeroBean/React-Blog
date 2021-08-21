import { useRef, useState } from 'react'
import { Tag, Input, Tooltip,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import './cat.css'
import {actions} from '../../store/reducers/catReducer'
const {get_all_cats,add_cat,delete_cat} = actions

export default function Cat() {
    const dispatch = useDispatch()
    const cats = useSelector(state=>state.catReducer)
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
        // const newTags = [...tags]
        // newTags[editInputIndex] = editInputValue
        // setTags(newTags)
        dispatch(add_cat(editInputValue))
        setEditInputIndex(-1)
        setEditInputValue('')
    }

    const handleClose = (removeId)=>{
        // console.log(removeId)

        dispatch(delete_cat(removeId))
        // const newTags = tags.filter((tag)=>tag!==removeTag)
        // console.log(newTags)
        // setTags(newTags)
    }

    const handleInputChange = (e)=>{
        setInputValue(e.target.value)
    }

    const handleInputConfirm = ()=>{

        //输入不为空，且与前面的不重复
        if(inputValue && cats.indexOf(inputValue)===-1){
            // setTags([...tags,inputValue])
            dispatch(add_cat(inputValue))
        }
        setInputVisible(false)
        setInputValue('')
    }

    const showInput = (e)=>{
        // console.log(e.target)
        setInputVisible(true)
        // e.target.focus()
    }

    useEffect(()=>{
        dispatch(get_all_cats())
    },[dispatch])

    const info = (msg) => {
        message.info(msg);
      };

    useEffect(()=>{
        if(msg.type===0){
            info(msg.content)
        }else if(msg.type===1){
            info(msg.content)

        }
    },[msg])
    return (
        <div className="Cat">
            {
                cats.map((cat,index)=>{
                    if(editInputIndex===index){
                        return (
                            <Input
                                ref={saveEditInputRef}
                                key={cat._id}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        )
                    }

                    const isLongTag = cat.length>20
                    const catElem = (
                        <Tag
                            className="edit-tag"
                            key={cat._id}
                            closable={index!==-1}
                            onClose={()=>{handleClose(cat._id)}}
                        >
                            <span
                                onDoubleClick={e=>{
                                    if(index!==0){
                                        setEditInputIndex(index)
                                        setEditInputValue(cat.name)
                                        // editInput.focus()
                                    }
                                    e.preventDefault()
                                }}
                            >
                                {isLongTag ? `${cat.name.slice(0,20)}...` : cat.name}
                            </span>
                        </Tag>
                    )

                    return isLongTag ? (
                        <Tooltip title={cat.name} key={cat._id}>
                            {catElem}
                        </Tooltip>
                    ): (
                        catElem
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
                    <PlusOutlined/> New Category
                </Tag>
            )}
        </div>
    )
}
