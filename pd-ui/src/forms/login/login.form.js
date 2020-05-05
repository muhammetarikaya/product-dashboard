import {Button, Form, Input} from 'antd';
import React from "react";
import PropTypes from 'prop-types';


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class LoginForm extends React.Component {
    render() {
        return (
            <Form
                {...layout}
                name="loginForm"
                initialValues={{email: "m.arikayaw@gmail.com",
                    password: "password",
                    remember: true}}
                onFinish={this.props.onFinished}
                onFinishFailed={this.props.onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your e-mail!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item

                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

LoginForm.propTypes = {
    onFinished: PropTypes.func,
    onFinishFailed: PropTypes.func
};

export default LoginForm;
