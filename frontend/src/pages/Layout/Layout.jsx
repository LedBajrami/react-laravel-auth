import { Link, Outlet } from "react-router-dom"
import { Layout, Menu } from 'antd'
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import '../../assets/styles/styles.css'



const { Header, Content } = Layout
function AppLayout() {
  const isAuthenticated = useSelector((state => state.auth.isAuthenticated))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const { i18n, t } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="en" onClick={() => changeLanguage("en")}>
        🇺🇸 English
      </Menu.Item>
      <Menu.Item key="al" onClick={() => changeLanguage("al")}>
        🇦🇱 Albanian
      </Menu.Item>
    </Menu>
  );

  const menuItems = 
    isAuthenticated ?
    [
      {key: "/user", label: <Link to='/user'>User</Link>},
      {key: "/posts", label: <Link to='/posts'>{t('user.posts')}</Link>},
      {key: "/comments", label: <Link to='/posts'>{t('user.comments')}</Link>},
    ]:
    [
      {key: "/login", label: <Link to='/login'>Login</Link>},
      {key: "/register", label: <Link to='/register'>{t('register.title')}</Link>}
    ]
  
  
    return (
      <Layout>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="menu"
          />
          <Space align="center" className="rightside">
            <Dropdown overlay={languageMenu} placement="bottomRight" arrow>
              <Button type="text" style={{ color: "white" }}>
                Language <DownOutlined />
              </Button>
            </Dropdown>
  
            {isAuthenticated && (
              <Button
                type="primary"
                onClick={async () => {
                  await dispatch(logoutUser());
                  navigate("/login");
                }}
              >
                {t('login.logout')}
              </Button>
            )}
          </Space>
        </Header>
        <Content>
          <div className="container">
            <Outlet />
          </div>
        </Content>
      </Layout>
    );
}

export default AppLayout