import { Layout, Menu, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    SettingOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'



const { Header, Sider } = Layout

const GeekLayout = () => {
    const location = useLocation()
    const curKey = location.pathname
    const { userStore, loginStore } = useStore()
    useEffect(() => {
        userStore.getUserInfo()
    }, [userStore])
    const navigate = useNavigate()
    const onConfirm = () => {
        loginStore.loginOut()
        navigate('/')
    }
    const Token = loginStore.token
    console.log("Token .........", Token)

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      
    const items = [
        { label: <Link to='profile'>Profile</Link>, key: '/my/profile', icon: <HomeOutlined />, },
        { label: <Link to='article'>Article</Link>, key: '/my/article', icon: <DiffOutlined /> },
        {
            label: <Link to='publish'>Publish</Link>, key: '/my/publish', icon: <EditOutlined />,
            children: [{ label: 'drafs', key: 'my/new' },{ label: 'New article', key: 'my/new' } ],
        },
        { label: <Link to='#'>Settings</Link>, key: '/my/settings', icon: <SettingOutlined /> },
    ];

    return (
        <Layout>
            <Header className="header"
                style={{ height: '60px', borderRight: 0, background: 'pink' }}
            >
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.username}</span>
                    <span className="user-logout">
                        <Popconfirm
                            onConfirm={onConfirm}
                            title="login out" okText="confirm" cancelText="cancel">
                            Login Out
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">

                    <Menu defaultSelectedKeys={curKey} items={items} />

                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    my home page
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)