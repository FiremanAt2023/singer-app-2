import { Input, Form } from "antd";
import React from "react";

export default function SingerForm({ form }) {
  return (
    <div>
      <Form form={form} layout="vertical" >
        <Form.Item
          name="name"
          label="歌手名称"
          rules={[
            {
              required: true,
              message: "必填项",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nationality"
          label="国籍"
          rules={[
            {
              required: true,
              message: "必填项",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
