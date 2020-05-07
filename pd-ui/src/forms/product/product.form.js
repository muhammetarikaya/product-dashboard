import {Button, Checkbox, Form, Input, Spin} from 'antd';
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

class ProductForm extends React.Component {
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
                            available: data.available,
                            name: data.name,
                            price: data.price,
                            description: data.description,
                        }}
                    onFinish={this.props.onFinished}
                    onFinishFailed={this.props.onFinishFailed}
                >

                    <Form.Item
                        label="Key"
                        name="key"
                        style={{display: 'none'}}
                        rules={[{required: true, message: 'Please input product name!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input product name!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{required: true, message: 'Please input product price!'}]}
                    >
                        <Input type={"number"}/>
                    </Form.Item>

                    <Form.Item
                        label="Currently Available"
                        name="available"
                        rules={[{required: true, message: 'Please input product availabilty!'}]}
                    >
                        <Checkbox checked={data.available}/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{required: true, message: 'Please input product name!'}]}
                    >
                        <TextArea maxLength={1499} rows={20}/>
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

ProductForm.propTypes = {
    onFinished: PropTypes.func,
    onFinishFailed: PropTypes.func,
    data: PropTypes.object.isRequired
};

export default ProductForm;