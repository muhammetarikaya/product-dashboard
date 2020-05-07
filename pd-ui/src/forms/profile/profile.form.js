import {Button, Form, Input, Spin} from 'antd';
import React from "react";
import PropTypes from 'prop-types';
import TextArea from "antd/es/input/TextArea";


const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 12},
};
const tailLayout = {
    wrapperCol: {offset: 2, span: 12},
};

class ProfileForm extends React.Component {

    render() {
        const {data} = this.props;

        return (
            <div>
                {data &&
                <Form
                    {...layout}
                    name="productForm"
                    initialValues={
                        {
                            key: data.key,
                            fullName: data.fullName,
                            title: data.title,
                            email: data.email,
                        }}
                    onFinish={this.props.onFinished}
                    onFinishFailed={this.props.onFinishFailed}
                >

                    <Form.Item
                        label="Key"
                        name="key"
                        style={{display: 'none'}}
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{required: true, message: 'Please input full name'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="E-Mail"
                        name="email"
                        rules={[{required: true, message: 'Please input email!'}]}
                    >
                        <Input type={"email"}/>
                    </Form.Item>


                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{required: true, message: 'Please input title!'}]}
                    >
                        <Input type/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
                }{!data &&
            <Spin spinning={true}/>
            }
            </div>
        );
    }

}

ProfileForm.propTypes = {
    onFinished: PropTypes.func,
    onFinishFailed: PropTypes.func,
    data: PropTypes.object.isRequired
};

export default ProfileForm;