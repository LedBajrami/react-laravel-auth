import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../services/redux/slices/auth/authThunks"
import { fetchUser } from "../../services/redux/slices/user/userThunks"


function Login() {
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
      
      <Form.Item label="Email" name='email' rules={[{required: true, message: "Please enter your email address"}]}>
        <Input type="email" />
      </Form.Item>

      <Form.Item label="Password" name='password' rules={[{required: true, message: "Please enter your password"}]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block disabled={status === 'loading'}>
          {status === 'loading'? 'Redirecting to your account': 'Login'}
        </Button>
      </Form.Item>
  
      <p style={{textAlign: 'center', color: "red"}}>{errorMessage}</p>

      <div style={{textAlign: "center", paddingTop: "10px"}}>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    </Form>
  )
}

export default Login