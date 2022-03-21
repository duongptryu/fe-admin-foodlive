import { useNavigate } from "react-router-dom";
import {
  Table,
  Space,
  Tag,
  Row,
  Col,
  Typography,
  Input,
  notification,
  Spin,
  Button,
  Select,
  DatePicker,
  Drawer,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import API from "../../api/fetch";
const { Title, Text } = Typography;
const { Search } = Input;

const SubRstManager = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleUpdateStatusRst = (id, status) => {
    setLoading(true);
    API.put(`admin/restaurant/${id}`, {
      status: status,
    })
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Update status restaurant successful",
        });
        fetchData();
      })
      .catch((err) => {
        console.log(err.response);
        notification["error"]({
          message: "Errorr",
          description: err.response.data.message,
        });
      });
    setLoading(false);
  };

  const fetchData = () => {
    setLoading(true);
    API.get("admin/restaurant")
      .then((result) => {
        console.log(result);
        setData(result.data.data);
      })
      .catch((e) => {
        console.log(e);
        notification["error"]({
          message: "Error server",
          description: e.response.data.message,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      key: "phone",
      dataIndex: "address",
    },
    {
      title: "City",
      key: "city",
      render: (r) => {
        return <Text type="secondary">{r.city.title}</Text>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (u) => {
        return u.status ? (
          <Tag color="#108ee9">Active</Tag>
        ) : (
          <Tag color="red">Deactive</Tag>
        );
      },
    },
    {
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (u) => (
        <Space size="middle">
          {u.status ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusRst(u.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusRst(u.id, true);
              }}
            >
              Active
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => {
              navigate(`/rst/${u.id}`);
            }}
          >
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>Restaurant Management</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Search
              placeholder="Search user"
              enterButton="Search"
              size="large"
              loading={false}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </Spin>
    </>
  );
};

export default SubRstManager;
