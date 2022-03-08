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
} from "antd";
import { useEffect, useState } from "react";
import API from "../../api/fetch";
const { Title } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Full Name",
    key: "name",
    render: (u) => {
      return (
        <text>
          {u.user.first_name} {u.user.last_name}
        </text>
      );
    },
  },
  {
    title: "Phone Number",
    key: "phone",
    render: (u) => {
      return u.user.phone;
    },
  },
  {
    title: "Status",
    key: "status",
    render: (u) => {
      return u.user.status ? (
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
        <Button type="primary">Detail</Button>
        {u.user.status ? (
          <Button type="primary" danger>
            Deactive
          </Button>
        ) : (
          <Button type="primary" danger>
            Active
          </Button>
        )}
        <Button type="primary">
          Push Notìication
        </Button>
      </Space>
    ),
  },
];

const SubUserManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    API.get("admin/user-device-token")
      .then((result) => {
        console.log(result.data.data);
        setData(result.data.data);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>User Management</Title>
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

export default SubUserManager;
