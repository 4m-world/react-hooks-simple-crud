import React, { useState } from 'react';
import { Layout, Row, Col, Divider } from 'antd';

import { Records, RecordForm, RecordEditForm } from './components/Records';

// dummy data for testing
const initialState = [
  { key: '1', name: 'Person One', email: 'person.one@domain.com', prefix: '972', mobile: '590000000' },
  { key: '2', name: 'Person Two', email: 'person.two@domain.com', prefix: '972', mobile: '590000000' },
  { key: '3', name: 'Person Three', email: 'person.three@domain.com', prefix: '970', mobile: '590000000' }
];

const initialFormState = { name: '', email: '', prefix: '', mobile: '' };

const App = () => {
  const [records, setRecords] = useState(initialState);

  // by default we run in insert mode
  const [editing, setEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(initialFormState);

  const addRecord = record => {
    record.key = (records.length + 1).toString();

    setRecords([...records, record]);
  };

  const editRecord = record => {
    setEditing(true);
    setCurrentRecord(record);
  }

  const deleteRecord = id => {
    !editing && setRecords(records.filter(record => record.key !== id));
  }

  const cancelEdit = () => {
    setEditing(false);
    setCurrentRecord(initialFormState);
  }

  const updateRecord = (key, updatedRecord) => {
    setRecords(records.map(record => (record.key === key ? updatedRecord : record)));
    setEditing(false);
  }

  return (
    <Layout>
      <Layout.Header>
        <h1>React Hooks - Simple CRUD application</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: 24, margin: 0, minHeight: 280, backgroundColor: '#fff' }}>
        <Row>
          <Col span={8} style={{ padding: 10 }}>
            {editing
              ? <RecordEditForm currentRecord={currentRecord} cancelAction={cancelEdit} updateAction={updateRecord} />
              : <RecordForm addAction={addRecord} />
            }
          </Col>
          <Divider type="vertical" />
          <Col span={14}>
            <h2>Records:</h2>
            <Records data={records} deleteAction={deleteRecord} editAction={editRecord} />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default App;
