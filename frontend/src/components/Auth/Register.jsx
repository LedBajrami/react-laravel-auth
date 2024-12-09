import { Button, Form, Input } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../../services/redux/slices/auth/authThunks"
import { useState } from "react"

function Register() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.status)
  const errorMessage = useSelector((state) => state.auth.error)
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

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

        <Form.Item label="Name" name="name" rules={[{required: true, message: "Please enter your name!"}]}>
          <Input type="text"></Input>
        </Form.Item>

        <Form.Item label="Email" name="email"
         rules={[{required: true, message: "Please enter your email!"}]}>
          <Input type="email"></Input>
        </Form.Item>

        <Form.Item label="Password" name="password" 
         rules={[
          {required: true, message: "Please enter your password!"},
          {min: 6, message: "Password should be at least 6 characters"}
         ]}>
          <Input.Password type="password"></Input.Password>
        </Form.Item>

        <Form.Item label="Confirm Password" name="password_confirmation"
        dependencies={['password']}
         rules={[
          {required: true, message: "Please confirm your password!"},
          {min: 6, message: "Password should be at least 6 characters"}
          ]}>
          <Input.Password type="password"></Input.Password>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={status === 'loading'}>
            {status === 'loading'? 'Registering your account': 'Register'}
          </Button>
        </Form.Item>

          <p style={{textAlign: 'center', color: "red"}}>{errorMessage}</p>
          <p style={{textAlign: 'center', color: "red"}}>{message}</p>
        <div style={{textAlign: "center", paddingTop: "10px"}}>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>

      </Form>
  )
}

export default Register