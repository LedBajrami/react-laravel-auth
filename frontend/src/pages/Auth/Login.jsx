import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../services/redux/slices/auth/authThunks"
import { fetchUser } from "../../services/redux/slices/user/userThunks"
import { CostumInput } from "../../components/CostumInput"
import { CostumButton } from "../../components/CostumButton"
import { useTranslation } from "react-i18next"
import '../../assets/styles/styles.css'


function Login() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector((state) => state.auth.status)
  const errorMessage = useSelector((state) => state.auth.error)

  
  const handleSubmit = async (values) => {
    try {
      const data = await dispatch(loginUser(values)).unwrap();
      dispatch(fetchUser(data.user));
      navigate('/user');
    } catch (error) {
      console.error('Login or fetch user failed:', error);
    }
  }

  return (
    <Form name="login_form" layout="vertical" onFinish={handleSubmit}>
      
    <CostumInput label={t('login.email')} name="email" type="email" rules={[{required: true, message: "Please enter your email address"}]}  />

    <CostumInput label={t('login.password')} name='password' type="password" rules={[{required: true, message: "Please enter your password"}]} />

    <CostumButton htmlType="submit" loading={status === 'loading'}>
        Login
    </CostumButton>

    <p className="error-message">{errorMessage}</p>

    <div style={{textAlign: "center", paddingTop: "10px"}}>
        <p>{t('login.not_registred')} <Link to='/register'>{t('register.title')}</Link></p>
      </div>
  </Form>
  )
}

export default Login