import React from 'react';
import { Button, Form, Input, Radio } from 'antd';

export default ({buildNode}) => {
  
  const [form] = Form.useForm();

  const formItemLayout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        };

  const buttonItemLayout ={
          wrapperCol: { span: 14, offset: 4 },
        };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onSubmitCapture={buildNode}
    >
      <Form.Item label="Label">
        <Input placeholder="Enter node label" />
      </Form.Item>
      <Form.Item label="Value">
        <Input placeholder="Enter value for this node" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};
