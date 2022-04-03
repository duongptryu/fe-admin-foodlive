import { Table, Tag, Space, Typography, notification, Button } from "antd";
import API from "../../../api/fetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
const { Text } = Typography;

const TableRst = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDataRst = () => {
    setLoading(true);
    API.get(`admin/restaurant?order_by=rating_desc&limit=5`)
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
    setLoading(false);
  };

  useEffect(() => {
    fetchDataRst();
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
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
        return <Text type="secondary">{r.city?.title}</Text>;
      },
    },
    {
      title: "Rating",
      key: "rating",
      render: (u) => {
        return (
          <Tag color="geekblue" key={u.rating}>
            {u.rating} <StarOutlined />
          </Tag>
        );
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

export default TableRst;
