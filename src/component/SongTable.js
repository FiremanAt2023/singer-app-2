import { Button, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
const { Search } = Input;

export default function SongTable(props) {
  let temporaryData = props.data;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "歌名",
      dataIndex: "name",
    },
    {
      title: "作者",
      dataIndex: "author",
    },

    {
      title: "出版日期",
      dataIndex: "date",
    },
    {
      title: "操作",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Popconfirm
            title="删除框"
            description="是否确定删除该项 "
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete(item.id)}
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDelete = async (id) => {
    setData(data.filter((el) => el.id !== id));
  };
  const onSearch = (value) => {
    if (value?.trim() === "") {
      setData(temporaryData);
    } else {
      setData(
        data.filter((el) => {
          return el.name.includes(value);
        })
      );
    }
  };
  return (
    <div>
      <Search
        addonBefore="歌名"
        allowClear
        onSearch={onSearch}
        style={{
          width: 304,
          marginBottom: "10px",
        }}
      />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: "7",
        }}
        rowKey={(item) => item.id}
      />
    </div>
  );
}
