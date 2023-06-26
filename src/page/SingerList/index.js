import React, { useEffect, useRef, useState } from "react";
import api from "../../api/http";
import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import SingerForm from "../../component/SingerForm";

function Singers() {
  const [singers, setSingers] = useState([]);
  const nameRef = useRef(null);
  const nationalityRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentSinger, setCurrentSinger] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    api.get("/singers").then((res) => {
      setSingers(res.data);
    });
  }, []);
  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "歌手姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "歌手国籍",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setCurrentSinger(item.id);
                showEditModal(item);
              }}
            >
              修改
            </Button>
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
        );
      },
    },
  ];
  const handleSearch = async () => {
    const name = nameRef.current.input?.value.trim();
    const nationality = nationalityRef.current.input?.value.trim();
    await api
      .get(`/singers?name_like=${name}&nationality_like=${nationality}`)
      .then((res) => {
        setSingers(res.data);
      });
  };
  const handleDelete = async (id) => {
    await api.delete(`/singers/${id}`).then((res) => {
      setSingers(singers.filter((el) => el.id !== id));
    });
  };
  const showEditModal = (item) => {
    setOpen(true);
    form.setFieldValue("name", item.name);
    form.setFieldValue("nationality", item.nationality);
  };
  const handleModal = () => {
    if (!currentSinger) {
      handleAdd();
    } else {
      handleEdit();
    }
  };
  const handleAdd = async () => {
    await form
      .validateFields()
      .then((values) => {
        api
          .post(`/singers`, {
            ...values,
          })
          .then((res) => {
            setOpen(false);
            setSingers([...singers, res.data]);
            form.resetFields();
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleEdit = async () => {
    await form
      .validateFields()
      .then((values) => {
        api
          .patch(`/singers/${currentSinger}`, {
            ...values,
          })
          .then((res) => {
            setOpen(false);
            setSingers(
              singers.map((el) => {
                if (el.id === currentSinger) {
                  return { ...el, ...values };
                }
                return el;
              })
            );
          });
        form.resetFields();
      })

      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <div>
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Input addonBefore="歌手名称" ref={nameRef} />
          <Input addonBefore="国籍" ref={nationalityRef} />
          <Button onClick={handleSearch}>搜索</Button>
        </Space>
        <Button
          onClick={() => {
            setOpen(true);
            setCurrentSinger(null);
          }}
        >
          添加歌手
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={singers}
        // rowSelection
        rowKey={(item) => item.id}
        pagination={{
          defaultPageSize: "7",
        }}
      />
      <Modal
        title="歌手信息"
        open={open}
        onOk={handleModal}
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
      >
        <SingerForm form={form} />
      </Modal>
    </div>
  );
}

export default Singers;
