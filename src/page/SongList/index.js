import { Button, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import "../../mock/Mock";
import api from "../../api/http";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

export default function SongList() {
    const [data, setData] = useState([]);
    //   const navigate = useNavigate();
    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            key: "id",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "歌单名",
            dataIndex: "name",
            render: (text, item) => (
                <Button
                    type="link"
                    onClick={() => {
                        alert('interesting')
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: "创造日期",
            dataIndex: "date",
        },
        {
            title: "收藏人数",
            dataIndex: "sum",
        },
        {
            title: "操作",
            key: "action",
            render: (item) => (
                <Space size="middle">
                    {item.isCollect ? (
                        <Button
                            onClick={() => {
                                item.sum++;
                                item.isCollect = !item.isCollect;
                                setData([...data]);
                            }}
                            type="primary"
                        >
                            收藏
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                item.sum--;
                                item.isCollect = !item.isCollect;
                                setData([...data]);
                            }}
                        >
                            取消收藏
                        </Button>
                    )}
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
    useEffect(() => {
        api.get("http://getMock/songList").then((res) => {
            setData(res.data.list);
        });
    }, []);

    const onSearch = (value) => {
        if (value?.trim() === "") {
            api.get("http://getMock/songList").then((res) => {
                setData(res.data.list);
            });
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
                addonBefore="歌单名"
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
                    defaultPageSize: "6",
                }}
                rowKey={(item) => item.id}
            />
        </div>
    );
}
