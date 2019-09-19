import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import T from 'prop-types';
import {
    Form,
    Input,
    Button,
    Select,
    Divider
} from 'antd';


const RecordEditForm = ({ currentRecord, updateAction, cancelAction, ...props }) => {
    const { getFieldDecorator } = props.form;
    const [record, setRecord] = useState(currentRecord);

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
                updateAction(record.key, { key: record.key, ...values });
            }
        });
    };

    // watch currentRecord for changes
    useEffect(() => {
        setRecord(currentRecord);
    }, [currentRecord]);

    return (
        <Fragment>
            <h2>Edit Form</h2>
            <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} onSubmit={handleSubmit}>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        initialValue: record.name,
                        value: record.name,
                        rules: [{ required: true, message: 'Please enter a person name!' }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Mobile">
                    {getFieldDecorator('mobile', {
                        initialValue: record.mobile,
                        rules: [{ required: true, message: 'Please enter the mobile number!' }]
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        initialValue: record.email,
                        rules: [
                            { type: 'email', message: 'You need to enter a valid email address.' },
                            { required: true, message: 'Please enter an email address!' }
                        ]
                    })(
                        <Input />
                    )
                    }
                </Form.Item>
                <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 12 } }} >
                    <Button htmlType="reset" onClick={() => cancelAction()}>Cancel</Button>
                    <Divider type="vertical" />
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

RecordEditForm.propTypes = {
    currentRecord: T.shape({
        key: T.string.isRequired,
        name: T.string.isRequired,
        email: T.string.isRequired,
        mobile: T.string.isRequired,
        prefix: T.string.isRequired
    }).isRequired,
    updateAction: T.func.isRequired,
    cancelAction: T.func.isRequired
};

RecordEditForm.defaultProps = {
    updateAction: (key, record) => { },
    cancelAction: () => { }
};

export default Form.create({ name: 'record-edit-form' })(RecordEditForm);
