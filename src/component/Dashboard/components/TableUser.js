import { Table, Tag, Space, Typography, notification, Button } from "antd";
import API from "../../../api/fetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
const { Text } = Typography;

const TableUser = (param) => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDataUser = () => {
    API.get(`admin/stats/top-user-by-order`)
      .then((result) => {
        console.log(result.data.data);
        const v = result.data.data;
        setData(v);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const columns = [
    {
      title: "Full Name",
      key: "name",
      render: (u) => {
        return (
          <text>
            {u.user?.first_name} {u.user?.last_name}
          </text>
        );
      },
    },
    {
      title: "Phone Number",
      key: "phone",
      render: (u) => {
        return u.user?.phone;
      },
    },
    {
      title: "Order Number",
      key: "order",
      render: (u) => {
        return <Tag color="red">{u.count}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (u) => (
        <Space size="middle">
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
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default TableUser;
