import { Button, Form, Input } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../../services/redux/slices/auth/authThunks"
import { useState } from "react"
import { CostumInput } from "../../components/CostumInput"
import { CostumButton } from "../../components/CostumButton"
import { useTranslation } from "react-i18next"
import '../../assets/styles/styles.css'

function Register() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.status)
  const errorMessage = useSelector((state) => state.auth.error)
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const { t } = useTranslation()


  const handleSubmit = async (values) => {
    const {name, email, password, password_confirmation} = values
    
    if (password !== password_confirmation) {
      setMessage('Passwords do not match')
      return
    }
    
    try {
      await dispatch(registerUser(values))
      
        navigate('/')
      
    } catch (error) {
      setMessage(error)
    }
  }


  return (
        <Form name="register_form" layout="vertical" onFinish={handleSubmit}>

        <CostumInput label={t("register.title")} name="name" rules={[{required: true, message: "Please enter your name!"}]} />
      
        <CostumInput label={t("register.email")} name="email" rules={[{required: true, message: "Please enter your email!"}]} />
        
        <CostumInput label={t("register.password")} name="password" type="password"
        rules={[
          {required: true, message: "Please enter your password!"},
          {min: 6, message: "Password should be at least 6 characters"}
        ]} />

        <CostumInput label={t("register.confirm_password")} name="password_confirmation" type="password"
        dependencies={['password']}
        rules={[
          {required: true, message: "Please confirm your password!"},
          {min: 6, message: "Password should be at least 6 characters"}
          ]} />

          <CostumButton htmlType="submit" loading={status === 'loading'}>
            {t('register.title')}
          </CostumButton>

          <p className="error-message">{errorMessage}</p>
          <p className="error-message">{message}</p>
        <div style={{textAlign: "center", paddingTop: "10px"}}>
          <p>{t("register.already_registred")} <Link to='/login'>Login</Link></p>
        </div>

      </Form>
  )
}

export default Register