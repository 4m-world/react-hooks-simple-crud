import React from 'react';
import { Fragment, useState } from 'react';
import T from 'prop-types';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';

const initialFormState = { name: '', prefix: '972', mobile: '', email: '' };

const RecordForm = ({addAction, form, ...props}) => {
    const { getFieldDecorator, resetFields } = form;
    const [record, setRecord] = useState(initialFormState);

    const prefixSelector = getFieldDecorator('prefix', {
        initialValue: record.prefix || '972'
    })(
        <Select style={{ width: 70 }}>
            <Select.Option value="970">+970</Select.Option>
            <Select.Option value="972">+972</Select.Option>
        </Select>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.addRecord(values);
                setRecord(initialFormState);
                resetFields();
            }
        });
    };

    return (
        <Fragment>
            <h2>Add Form</h2>
            <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} onSubmit={handleSubmit}>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please enter a person name!' }]
                    })(
                        <Input placeholder="Contact name" />
                    )}
                </Form.Item>
                <Form.Item label="Mobile">
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: 'Please enter the mobile number!' }]
                    })(
                        <Input placeholder="Contact mobile number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        rules: [
                            { type: 'email', message: 'You need to enter a valid email address.' },
                            { required: true, message: 'Please enter an email address!' }
                        ]
                    })(
                        <Input placeholder="Contact e-mail address" />
                    )
                    }
                </Form.Item>
                <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 8, offset: 16 } }} >
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

RecordForm.propTypes = {
    addAction: T.func.isRequired
};

RecordForm.defaultProps = {
    addAction: (record) => {}
};

export default Form.create({ name: 'record-form' })(RecordForm);
