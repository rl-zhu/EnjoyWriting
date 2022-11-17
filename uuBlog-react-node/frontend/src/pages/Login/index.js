import { Card } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import  {useNavigate} from 'react-router-dom'
import './index.scss'
import {useStore} from '@/store/index'
import { observer } from 'mobx-react-lite'
// import { useNavigate } from 'react-router-dom';
// import LoginStore from '@/store/login.Store';
function Login() {
    //get the input infos
    const {loginStore} = useStore()
    const navigate = useNavigate()
 
    const onFinish = async(values) => {
        console.log(values)
        const functionto = 'login'
        // loginStore.getToken(values)
        await loginStore.getToken({
            username: values.username,
            password: values.password,
            functionto
        })
    //    //not able to do destructure
    //     // var {phone, passw} = values
    //     const phone = values.username
    //     const passw = values.password
    //     console.log(phone, passw)
        
    //     loginStore.getToken({phone, passw})
        console.log(loginStore.token)
        console.log('navi')
        navigate('/my',{replace:true})

      }
    const onFinishFailed = (errinfo)=>{
        console.log(errinfo)
    }

    return (
        <div className="login">
            
        
            <Card className="login-container">
                {/* <img ></img> */}
                <h1> Login</h1>
                <Form 
                    validateTrigger={['onBlur', 'onChange']}
                    onFinish = {onFinish}
                    onFinishFailed = {onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the phone numbers'
                            },
                            {
                                pattern: /^\w{3,20}$/,
                                message:'Please input more than 3-20 numbers without special characters ',
                                validateTrigger:'onBlur',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Please input the username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the password'
                            },
                            {
                                min: 6,
                                message:'Please input the password with more than 6 numbers',
                            },
                        ]}>
                        <Input size="large" placeholder="Please input the password" />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className="login-checkbox-label">
                        New users will be automatically registered
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        
                        <Button type="primary" htmlType="submit" size="large" block>
                            Submit
                        </Button>
                    </Form.Item>
                    <Button href='/register'>Register</Button>
                </Form>
            </Card>

        </div>
    )
}

export default observer(Login) 