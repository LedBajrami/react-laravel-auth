import { Form, Input } from "antd"

export const CostumInput = ({label, name, rules, type}) => {
    return (
     <Form.Item label={label} name={name} rules={rules}>
        {type === 'password'?
         <Input.Password />: name == 'contnent' ? <Input.TextArea />: <Input type={type}  />}
     </Form.Item>
    )
}   