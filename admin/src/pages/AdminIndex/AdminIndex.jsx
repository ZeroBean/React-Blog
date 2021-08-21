import './adminIndex.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { Route, Switch,Link, useRouteMatch } from 'react-router-dom';

import { useState } from 'react';
import AddArticle from '../addArticle/AddArticle';
import ArticleTag from '../tag/Tag';
import Cat from '../category/Cat'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/reducers/rootReducer';
import ArticleList from '../ArticleList/ArticleList';
const {user_auth} = actions

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex() {
    const [collapsed,setCollapsed] = useState(false)
    const {path,url} = useRouteMatch()
    console.log(path,url)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(user_auth())
    },[dispatch])

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={()=>{setCollapsed(!collapsed)}}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              工作台
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="文章">
              <Menu.Item key="2">
                <Link to={`${url}/addArticle`}>编辑文章</Link>
              </Menu.Item>
              <Menu.Item key="3">
              <Link to={`${url}/ArticleList`}>文章列表</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="标签">
              <Menu.Item key="4">
                <Link to={`${url}/tag`}>编辑标签</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="分类">
              <Menu.Item key="5">
                <Link to={`${url}/cat`}>编辑分类</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route path={`${path}/addArticle`} component={AddArticle}/>
                <Route path={`${path}/editArticle`} component={AddArticle}/>
                <Route path={`${path}/ArticleList`} component={ArticleList}/>
                <Route path={`${path}/Tag`} component={ArticleTag}/>
                <Route path={`${path}/Cat`} component={Cat}/> 
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
}
