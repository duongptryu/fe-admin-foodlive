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
  Image,
  Drawer,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import API from "../../api/fetch";
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const SubCategoryManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cate, setCate] = useState({
    name:"",
    icon:{
      url:"",
    },
    description:"",
    status: false,
    
  });

  useEffect(() => {
    fetchData();
  }, []);

  const showDrawer = (cate) => {
    setCate(cate);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const fetchData = () => {
    setLoading(true);
    API.get("admin/category")
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

  const handleUpdateStatusCate = (id, status) => {
    setLoading(true);
    API.put(`admin/category/${id}`, {
      status: status,
    })
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Update status category successful",
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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Icon",
      key: "icon",
      render: (c) => {
        return <Image width={100} src={c.icon.url} />;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
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
          <Button type="primary" onClick={showDrawer}>
            Detail
          </Button>
          {u.status ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusCate(u.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleUpdateStatusCate(u.id, true);
              }}
            >
              Active
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>Category Management</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Search
              placeholder="Search category"
              enterButton="Search"
              size="large"
              loading={false}
            />
          </Col>
        </Row>

        <Drawer
          title="Category detail"
          width={736}
          placement="right"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={handleUpdateStatusCate}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Divider orientation="left" plain>
            Icon
            <Row>
              <Col>
                <Image width={180} src={cate.icon.url} />
              </Col>
            </Row>
          </Divider>
          <Divider orientation="left" plain>
            Information
          </Divider>
          <Row>
            <Col span={8}>
              <Text strong>Name: </Text>
            </Col>
            <Col span={12}>
              {/* <Paragraph editable={{ onChange: setEditableStr }}>
                {editableStr}
              </Paragraph> */}
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Text strong>Description: </Text>
            </Col>
            <Col span={12}>
              {/* <Paragraph editable={{ onChange: setEditableStr }}>
                {editableStr}
              </Paragraph> */}
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Text strong>Created At: </Text>
            </Col>
            <Col span={12}>
              {/* <Paragraph editable={{ onChange: setEditableStr }}>
                {editableStr}
              </Paragraph> */}
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Text strong>Updated At: </Text>
            </Col>
            <Col span={12}>
              {/* <Paragraph editable={{ onChange: setEditableStr }}>
                {editableStr}
              </Paragraph> */}
            </Col>
          </Row>
        </Drawer>

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

export default SubCategoryManager;
