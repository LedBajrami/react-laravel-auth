import { Button, Form, Input } from "antd"
import { Link } from "react-router-dom"



function Login() {
  const handleSubmit = async (values) => {}

  return (
    <Form name="login_form" layout="vertical" onFinish={handleSubmit}>
      
      <Form.Item label="Email" name='email' rules={[{required: true, message: "Please enter your email address"}]}>
        <Input type="email" />
      </Form.Item>

      <Form.Item label="Password" name='password' rules={[{required: true, message: "Please enter your password"}]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
         Login
        </Button>
      </Form.Item>
  

      <div style={{textAlign: "center", paddingTop: "10px"}}>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    </Form>
  )
}

export default Login