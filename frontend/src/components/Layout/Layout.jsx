import { Link, Outlet } from "react-router-dom"
import { Layout, Menu } from 'antd'
import { useSelector } from "react-redux"


const { Header, Content } = Layout
function AppLayout() {
  const isAuthenticated = useSelector((state => state.auth.isAuthenticated))

  const menuItems = 
    isAuthenticated ?
    [
      {key: "/user", label: <Link to='/user'>User</Link>},
      {key: "/posts", label: <Link to='/posts'>Posts</Link>},
      {key: "/comments", label: <Link to='/posts'>Comments</Link>},
    ]:
    [
      {key: "/login", label: <Link to='/login'>Login</Link>},
      {key: "/register", label: <Link to='/register'>Register</Link>}
    ]
  
  
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" items={menuItems}></Menu>
      </Header>
      <Content>
        <div style={{height: '100vh', width: "300px", margin: "auto", paddingTop: "100px"}}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}

export default AppLayout