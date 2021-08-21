import React, { useEffect, useState } from 'react'
import {Spin,Card,Input,Button,message} from 'antd'
import {UserOutlined,KeyOutlined} from '@ant-design/icons'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import {actions} from '../../store/reducers/rootReducer'
import { useHistory } from 'react-router-dom'
function Login(props) {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const {user,msg,isFetching} = useSelector(state=>state.rootReducer)
    const {get_login} = actions

    const info = (msg) => {
        message.info(msg);
      };
    const handleClick = ()=>{
        dispatch(get_login(username,password))
    }

    useEffect(()=>{
        if(msg.type===0){
            info(msg.content)
        }else if(msg.type===1){
            info(msg.content)
            // console.log(history)
            history.push('/index')
        }
    },[msg,history])

    return (
        <div className="login">
            <Spin tip="Loading" spinning={isFetching}>
                <Card title="Admin" bordered={true} style={{width:400}}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={
                            <UserOutlined/>
                        }
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        style={{color:"rgba(0,0,0,.25)"}}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={
                            <KeyOutlined/>
                        }
                        value={password}
                        onChange = {(e)=>setPassword(e.target.value)}
                        style={{color:"rgba(0,0,0,.25)"}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={handleClick}>Log in</Button>
                </Card>
            </Spin>
        </div>
    )
}


export default Login