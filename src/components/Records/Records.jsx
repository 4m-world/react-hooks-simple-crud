import React from 'react';
import { Table, Divider, Button } from 'antd';

const Records = ({ data, deleteAction, editAction, ...reset }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            render: (text, record) => (<span>
                +{record.prefix}-{text}
            </span>)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: text => <a href={"mailto:" + text}>{text}</a>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <React.Fragment>
                    <Button icon="edit" onClick={()=> editAction(record)}>Edit</Button>
                    <Divider type="vertical" />
                    <Button type="danger" icon="delete" onClick={() => deleteAction(record.key)}>Delete</Button>
                </React.Fragment>
            )
        }
    ];

    return (
        <Table rowKey="key" columns={columns} dataSource={data} />
    );
}

export default Records;